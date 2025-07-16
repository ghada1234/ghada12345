
"use client";

import { useState } from "react";
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

function SettingInput({
  label,
  id,
  unit,
  defaultValue,
  placeholder,
  type = "number",
}: {
  label: string;
  id: string;
  unit: string;
  defaultValue: string;
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
          defaultValue={defaultValue}
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
    const [weight, setWeight] = useState(70);
    const [height, setHeight] = useState(175);
    const [bmi, setBmi] = useState<string>("N/A");
    const [avatarSrc, setAvatarSrc] = useState("https://placehold.co/100x100.png");

    const calculateBmi = (w: number, h: number) => {
        if(w > 0 && h > 0) {
            const heightInMeters = h / 100;
            const bmiValue = w / (heightInMeters * heightInMeters);
            setBmi(bmiValue.toFixed(2));
        } else {
            setBmi(translations.settings.profile.notApplicable);
        }
    }

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newWeight = Number(e.target.value);
        setWeight(newWeight);
        calculateBmi(newWeight, height);
    }
    
    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newHeight = Number(e.target.value);
        setHeight(newHeight);
        calculateBmi(weight, newHeight);
    }
    
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                if (loadEvent.target && typeof loadEvent.target.result === 'string') {
                    setAvatarSrc(loadEvent.target.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };


    // Set initial BMI on mount
    useState(() => {
        calculateBmi(weight, height);
    });

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">{translations.settings.title}</h1>
          <p className="text-muted-foreground mt-2">
            {translations.settings.subtitle}
          </p>
        </div>
        
        <Card>
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
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{translations.settings.profile.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                    <AvatarImage src={avatarSrc} data-ai-hint="profile picture" />
                    <AvatarFallback>U</AvatarFallback>
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
                <Input id="name" placeholder={translations.settings.profile.namePlaceholder} />
              </div>
                <div className="space-y-2">
                    <Label htmlFor="weight">{translations.settings.profile.weight}</Label>
                     <Input id="weight" type="number" defaultValue={weight} onChange={handleWeightChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="height">{translations.settings.profile.height}</Label>
                    <Input id="height" type="number" defaultValue={height} onChange={handleHeightChange}/>
                </div>
                <div className="space-y-2">
                    <Label>{translations.settings.profile.bmi}</Label>
                    <p className="p-2 border rounded-md bg-muted text-muted-foreground">{bmi}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-2">
                    <Label>{translations.settings.profile.gender.title}</Label>
                    <RadioGroup defaultValue="male" className="flex gap-4 pt-2">
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">{translations.settings.profile.gender.male}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">{translations.settings.profile.gender.female}</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label htmlFor="dietary-preference">{translations.settings.profile.dietaryPreference}</Label>
                    <Input id="dietary-preference" placeholder={translations.settings.profile.dietaryPreferencePlaceholder} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="allergies">{translations.settings.profile.allergies}</Label>
                    <Input id="allergies" placeholder={translations.settings.profile.allergiesPlaceholder} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="likes">{translations.settings.profile.likes}</Label>
                    <Input id="likes" placeholder={translations.settings.profile.likesPlaceholder} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="dislikes">{translations.settings.profile.dislikes}</Label>
                    <Input id="dislikes" placeholder={translations.settings.profile.dislikesPlaceholder} />
                </div>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>{translations.settings.macros.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <SettingInput label={translations.settings.macros.calories.label} id="calories" unit={translations.settings.macros.calories.unit} defaultValue="2000" />
                <SettingInput label={translations.settings.macros.protein.label} id="protein" unit={translations.settings.macros.protein.unit} defaultValue="120" />
                <SettingInput label={translations.settings.macros.carbs.label} id="carbs" unit={translations.settings.macros.carbs.unit} defaultValue="250" />
                <SettingInput label={translations.settings.macros.fats.label} id="fats" unit={translations.settings.macros.fats.unit} defaultValue="70" />
                <SettingInput label={translations.settings.macros.fiber.label} id="fiber" unit={translations.settings.macros.fiber.unit} defaultValue="30" />
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>{translations.settings.micros.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <SettingInput label={translations.settings.micros.sugar.label} id="sugar" unit={translations.settings.micros.sugar.unit} defaultValue="50" />
                <SettingInput label={translations.settings.micros.sodium.label} id="sodium" unit={translations.settings.micros.sodium.unit} defaultValue="2300" />
                <SettingInput label={translations.settings.micros.potassium.label} id="potassium" unit={translations.settings.micros.potassium.unit} defaultValue="3500" />
                <SettingInput label={translations.settings.micros.calcium.label} id="calcium" unit={translations.settings.micros.calcium.unit} defaultValue="1000" />
                <SettingInput label={translations.settings.micros.iron.label} id="iron" unit={translations.settings.micros.iron.unit} defaultValue="18" />
                <SettingInput label={translations.settings.micros.vitaminC.label} id="vitaminc" unit={translations.settings.micros.vitaminC.unit} defaultValue="90" />
            </CardContent>
        </Card>
        
        <div className="flex justify-end">
            <Button size="lg">{translations.settings.saveButton}</Button>
        </div>
      </div>
    </main>
  );
}
