
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, CreditCard } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSettings, type Settings } from "@/context/settings-context";
import { useToast } from "@/hooks/use-toast";


function SettingInput({
  label,
  id,
  unit,
  value,
  onChange,
  placeholder,
  type = "number",
}: {
  label: string;
  id: string;
  unit: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={id} className="text-muted-foreground">
        {label}
      </Label>
      <div className="flex items-center gap-2 w-1/2">
        <Input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className="w-full"
          placeholder={placeholder}
        />
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
    </div>
  );
}

export default function SettingsPage() {
    const { translations } = useLanguage();
    const { settings, updateSettings } = useSettings();
    const { toast } = useToast();
    const [bmi, setBmi] = useState<string>("N/A");

    const calculateBmi = (w: number, h: number) => {
        if(w > 0 && h > 0) {
            const heightInMeters = h / 100;
            const bmiValue = w / (heightInMeters * heightInMeters);
            setBmi(bmiValue.toFixed(2));
        } else {
            setBmi(translations.settings.profile.notApplicable);
        }
    }

    useEffect(() => {
        const weight = parseFloat(settings.profile.weight) || 0;
        const height = parseFloat(settings.profile.height) || 0;
        calculateBmi(weight, height);
    }, [settings.profile.weight, settings.profile.height, translations.settings.profile.notApplicable]);
    
    
    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        updateSettings({ profile: { ...settings.profile, [id]: value } });
    }

    const handleGoalChange = (category: 'macros' | 'micros') => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        updateSettings({ 
            goals: { 
                ...settings.goals,
                [category]: {
                    ...settings.goals[category],
                    [id]: value
                } 
            }
        });
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                if (loadEvent.target && typeof loadEvent.target.result === 'string') {
                    updateSettings({ profile: { ...settings.profile, avatar: loadEvent.target.result } });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenderChange = (value: string) => {
        updateSettings({ profile: { ...settings.profile, gender: value as 'male' | 'female' }});
    }

    const handleSave = () => {
        // The context already saves on change, but we can provide user feedback here.
        toast({
            title: translations.settings.toast.success.title,
            description: translations.settings.toast.success.description,
        });
    }

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">{translations.settings.title}</h1>
          <p className="text-muted-foreground mt-2">
            {translations.settings.subtitle}
          </p>
        </div>
        
        {/* <Card>
          <CardHeader>
            <CardTitle>{translations.settings.account.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/settings/payments">
              <Button variant="outline">
                <CreditCard className="mr-2 h-4 w-4" />
                {translations.settings.account.managePayments}
              </Button>
            </Link>
          </CardContent>
        </Card> */}

        <Card>
          <CardHeader>
            <CardTitle>{translations.settings.profile.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                    <AvatarImage src={settings.profile.avatar || ''} data-ai-hint="profile picture" />
                    <AvatarFallback>{getInitials(settings.profile.name)}</AvatarFallback>
                </Avatar>
                 <div className="w-full space-y-2">
                    <Label>{translations.settings.profile.avatar}</Label>
                    <Button variant="outline" className="w-full" asChild>
                      <label htmlFor="avatar-upload" className="cursor-pointer">
                        <Upload className="mr-2"/> {translations.settings.profile.uploadButton}
                      </label>
                    </Button>
                    <Input id="avatar-upload" type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                </div>
            </div>

             <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">{translations.settings.profile.name}</Label>
                <Input id="name" value={settings.profile.name} onChange={handleProfileChange} placeholder={translations.settings.profile.namePlaceholder} />
              </div>
                <div className="space-y-2">
                    <Label htmlFor="weight">{translations.settings.profile.weight}</Label>
                     <Input id="weight" type="number" value={settings.profile.weight} onChange={handleProfileChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="height">{translations.settings.profile.height}</Label>
                    <Input id="height" type="number" value={settings.profile.height} onChange={handleProfileChange}/>
                </div>
                <div className="space-y-2">
                    <Label>{translations.settings.profile.bmi}</Label>
                    <p className="p-2 border rounded-md bg-muted text-muted-foreground">{bmi}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-2">
                    <Label>{translations.settings.profile.gender.title}</Label>
                    <RadioGroup value={settings.profile.gender} onValueChange={handleGenderChange} className="flex gap-4 pt-2">
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="r-male" />
                        <Label htmlFor="r-male">{translations.settings.profile.gender.male}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="r-female" />
                        <Label htmlFor="r-female">{translations.settings.profile.gender.female}</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label htmlFor="dietaryPreference">{translations.settings.profile.dietaryPreference}</Label>
                    <Input id="dietaryPreference" value={settings.profile.dietaryPreference} onChange={handleProfileChange} placeholder={translations.settings.profile.dietaryPreferencePlaceholder} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="allergies">{translations.settings.profile.allergies}</Label>
                    <Input id="allergies" value={settings.profile.allergies} onChange={handleProfileChange} placeholder={translations.settings.profile.allergiesPlaceholder} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="likes">{translations.settings.profile.likes}</Label>
                    <Input id="likes" value={settings.profile.likes} onChange={handleProfileChange} placeholder={translations.settings.profile.likesPlaceholder} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="dislikes">{translations.settings.profile.dislikes}</Label>
                    <Input id="dislikes" value={settings.profile.dislikes} onChange={handleProfileChange} placeholder={translations.settings.profile.dislikesPlaceholder} />
                </div>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>{translations.settings.macros.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <SettingInput label={translations.settings.macros.calories.label} id="calories" unit={translations.settings.macros.calories.unit} value={settings.goals.macros.calories} onChange={handleGoalChange('macros')} />
                <SettingInput label={translations.settings.macros.protein.label} id="protein" unit={translations.settings.macros.protein.unit} value={settings.goals.macros.protein} onChange={handleGoalChange('macros')} />
                <SettingInput label={translations.settings.macros.carbs.label} id="carbs" unit={translations.settings.macros.carbs.unit} value={settings.goals.macros.carbs} onChange={handleGoalChange('macros')} />
                <SettingInput label={translations.settings.macros.fats.label} id="fats" unit={translations.settings.macros.fats.unit} value={settings.goals.macros.fats} onChange={handleGoalChange('macros')} />
                <SettingInput label={translations.settings.macros.fiber.label} id="fiber" unit={translations.settings.macros.fiber.unit} value={settings.goals.macros.fiber} onChange={handleGoalChange('macros')} />
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>{translations.settings.micros.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <SettingInput label={translations.settings.micros.sugar.label} id="sugar" unit={translations.settings.micros.sugar.unit} value={settings.goals.micros.sugar} onChange={handleGoalChange('micros')} />
                <SettingInput label={translations.settings.micros.sodium.label} id="sodium" unit={translations.settings.micros.sodium.unit} value={settings.goals.micros.sodium} onChange={handleGoalChange('micros')} />
                <SettingInput label={translations.settings.micros.potassium.label} id="potassium" unit={translations.settings.micros.potassium.unit} value={settings.goals.micros.potassium} onChange={handleGoalChange('micros')} />
                <SettingInput label={translations.settings.micros.calcium.label} id="calcium" unit={translations.settings.micros.calcium.unit} value={settings.goals.micros.calcium} onChange={handleGoalChange('micros')} />
                <SettingInput label={translations.settings.micros.iron.label} id="iron" unit={translations.settings.micros.iron.unit} value={settings.goals.micros.iron} onChange={handleGoalChange('micros')} />
                <SettingInput label={translations.settings.micros.vitaminC.label} id="vitaminC" unit={translations.settings.micros.vitaminC.unit} value={settings.goals.micros.vitaminC} onChange={handleGoalChange('micros')} />
            </CardContent>
        </Card>
        
        <div className="flex justify-end">
            <Button size="lg" onClick={handleSave}>{translations.settings.saveButton}</Button>
        </div>
      </div>
    </main>
  );
}
