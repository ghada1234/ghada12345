
"use client";

import { useState, useEffect, useCallback } from "react";
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
import { useSettings } from "@/context/settings-context";
import { useToast } from "@/hooks/use-toast";
import { useUserAccount } from "@/context/user-account-context";


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

export default function ProfilePage() {
    const { translations } = useLanguage();
    const t = translations.profilePage;
    const { settings, updateSettings } = useSettings();
    const { isPro } = useUserAccount();
    const { toast } = useToast();
    const [bmi, setBmi] = useState<string>("N/A");

    const calculateAndSetGoals = useCallback(() => {
        const weight = parseFloat(settings.profile.weight) || 0;
        const height = parseFloat(settings.profile.height) || 0;
        const gender = settings.profile.gender;
        const age = 30; // Assuming a default age as it's not in the profile

        if(w > 0 && h > 0) {
            const heightInMeters = height / 100;
            const bmiValue = weight / (heightInMeters * heightInMeters);
            setBmi(bmiValue.toFixed(2));

            // Mifflin-St Jeor Equation for BMR
            let bmr;
            if (gender === 'male') {
                bmr = 10 * weight + 6.25 * height - 5 * age + 5;
            } else {
                bmr = 10 * weight + 6.25 * height - 5 * age - 161;
            }
            
            const tdee = bmr * 1.375; // Assuming lightly active
            const calories = Math.round(tdee).toString();

            updateSettings(draft => {
                draft.goals.macros.calories = calories;
                draft.goals.macros.protein = Math.round(weight * 1.6).toString(); // 1.6g per kg
                draft.goals.macros.carbs = Math.round((tdee * 0.45) / 4).toString(); // 45% of calories
                draft.goals.macros.fats = Math.round((tdee * 0.30) / 9).toString(); // 30% of calories
                draft.goals.macros.fiber = "30";
                
                // Keep micro goals as they are less dependent on BMI
            })

        } else {
            setBmi(t.profile.notApplicable);
        }
    }, [settings.profile.weight, settings.profile.height, settings.profile.gender, updateSettings, t.profile.notApplicable]);

    useEffect(() => {
        calculateAndSetGoals();
    }, [calculateAndSetGoals]);
    
    
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
            title: t.toast.success.title,
            description: t.toast.success.description,
        });
    }

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
          <p className="text-muted-foreground mt-2">
            {t.subtitle}
          </p>
        </div>
        
        {isPro && (
          <Card>
            <CardHeader>
              <CardTitle>{t.account.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href="/profile/payments">
                <Button variant="outline">
                  <CreditCard className="mr-2 h-4 w-4" />
                  {t.account.managePayments}
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>{t.profile.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                    <AvatarImage src={settings.profile.avatar || ''} data-ai-hint="profile picture" />
                    <AvatarFallback>{getInitials(settings.profile.name)}</AvatarFallback>
                </Avatar>
                 <div className="w-full space-y-2">
                    <Label>{t.profile.avatar}</Label>
                    <Button variant="outline" className="w-full" asChild>
                      <label htmlFor="avatar-upload" className="cursor-pointer">
                        <Upload className="mr-2"/> {t.profile.uploadButton}
                      </label>
                    </Button>
                    <Input id="avatar-upload" type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                </div>
            </div>

             <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">{t.profile.name}</Label>
                <Input id="name" value={settings.profile.name} onChange={handleProfileChange} placeholder={t.profile.namePlaceholder} />
              </div>
                <div className="space-y-2">
                    <Label htmlFor="weight">{t.profile.weight}</Label>
                     <Input id="weight" type="number" value={settings.profile.weight} onChange={handleProfileChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="height">{t.profile.height}</Label>
                    <Input id="height" type="number" value={settings.profile.height} onChange={handleProfileChange}/>
                </div>
                <div className="space-y-2">
                    <Label>{t.profile.bmi}</Label>
                    <p className="p-2 border rounded-md bg-muted text-muted-foreground">{bmi}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-2">
                    <Label>{t.profile.gender.title}</Label>
                    <RadioGroup value={settings.profile.gender} onValueChange={handleGenderChange} className="flex gap-4 pt-2">
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="r-male" />
                        <Label htmlFor="r-male">{t.profile.gender.male}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="r-female" />
                        <Label htmlFor="r-female">{t.profile.gender.female}</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label htmlFor="dietaryPreference">{t.profile.dietaryPreference}</Label>
                    <Input id="dietaryPreference" value={settings.profile.dietaryPreference} onChange={handleProfileChange} placeholder={t.profile.dietaryPreferencePlaceholder} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="allergies">{t.profile.allergies}</Label>
                    <Input id="allergies" value={settings.profile.allergies} onChange={handleProfileChange} placeholder={t.profile.allergiesPlaceholder} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="likes">{t.profile.likes}</Label>
                    <Input id="likes" value={settings.profile.likes} onChange={handleProfileChange} placeholder={t.profile.likesPlaceholder} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="dislikes">{t.profile.dislikes}</Label>
                    <Input id="dislikes" value={settings.profile.dislikes} onChange={handleProfileChange} placeholder={t.profile.dislikesPlaceholder} />
                </div>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>{t.macros.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <SettingInput label={t.macros.calories.label} id="calories" unit={t.macros.calories.unit} value={settings.goals.macros.calories} onChange={handleGoalChange('macros')} />
                <SettingInput label={t.macros.protein.label} id="protein" unit={t.macros.protein.unit} value={settings.goals.macros.protein} onChange={handleGoalChange('macros')} />
                <SettingInput label={t.macros.carbs.label} id="carbs" unit={t.macros.carbs.unit} value={settings.goals.macros.carbs} onChange={handleGoalChange('macros')} />
                <SettingInput label={t.macros.fats.label} id="fats" unit={t.macros.fats.unit} value={settings.goals.macros.fats} onChange={handleGoalChange('macros')} />
                <SettingInput label={t.macros.fiber.label} id="fiber" unit={t.macros.fiber.unit} value={settings.goals.macros.fiber} onChange={handleGoalChange('macros')} />
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>{t.micros.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <SettingInput label={t.micros.sugar.label} id="sugar" unit={t.micros.sugar.unit} value={settings.goals.micros.sugar} onChange={handleGoalChange('micros')} />
                <SettingInput label={t.micros.sodium.label} id="sodium" unit={t.micros.sodium.unit} value={settings.goals.micros.sodium} onChange={handleGoalChange('micros')} />
                <SettingInput label={t.micros.potassium.label} id="potassium" unit={t.micros.potassium.unit} value={settings.goals.micros.potassium} onChange={handleGoalChange('micros')} />
                <SettingInput label={t.micros.calcium.label} id="calcium" unit={t.micros.calcium.unit} value={settings.goals.micros.calcium} onChange={handleGoalChange('micros')} />
                <SettingInput label={t.micros.iron.label} id="iron" unit={t.micros.iron.unit} value={settings.goals.micros.iron} onChange={handleGoalChange('micros')} />
                <SettingInput label={t.micros.vitaminC.label} id="vitaminC" unit={t.micros.vitaminC.unit} value={settings.goals.micros.vitaminC} onChange={handleGoalChange('micros')} />
            </CardContent>
        </Card>
        
        <div className="flex justify-end">
            <Button size="lg" onClick={handleSave}>{t.saveButton}</Button>
        </div>
      </div>
    </main>
  );
}
