
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
import { Upload } from "lucide-react";

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
    const [weight, setWeight] = useState(70);
    const [height, setHeight] = useState(175);
    const [bmi, setBmi] = useState<string>("N/A");

    const calculateBmi = (w: number, h: number) => {
        if(w > 0 && h > 0) {
            const heightInMeters = h / 100;
            const bmiValue = w / (heightInMeters * heightInMeters);
            setBmi(bmiValue.toFixed(2));
        } else {
            setBmi("N/A");
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


  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Customize your daily nutritional goals and profile.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Choose a username" />
              </div>
                <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                     <Input id="weight" type="number" defaultValue={weight} onChange={handleWeightChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input id="height" type="number" defaultValue={height} onChange={handleHeightChange}/>
                </div>
                <div className="space-y-2">
                    <Label>Body Mass Index (BMI)</Label>
                    <p className="p-2 border rounded-md bg-muted text-muted-foreground">{bmi}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-2">
                    <Label>Gender</Label>
                    <RadioGroup defaultValue="male" className="flex gap-4 pt-2">
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                        </div>
                    </RadioGroup>
                </div>
                <div className="space-y-2">
                    <Label>Choose your Avatar</Label>
                    <Button variant="outline" className="w-full"><Upload className="mr-2"/> Upload a Photo</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label htmlFor="dietary-preference">Dietary Preference</Label>
                    <Input id="dietary-preference" placeholder="e.g. Vegetarian, Low-Carb, Gluten-Free" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="allergies">Allergies</Label>
                    <Input id="allergies" placeholder="e.g. Peanuts, Shellfish, Dairy" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="likes">Likes</Label>
                    <Input id="likes" placeholder="e.g. Spicy food, Salmon, Avocado" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="dislikes">Dislikes</Label>
                    <Input id="dislikes" placeholder="e.g. Cilantro, Olives, Tofu" />
                </div>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Macronutrient Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <SettingInput label="Calories" id="calories" unit="kcal" defaultValue="2000" />
                <SettingInput label="Protein" id="protein" unit="g" defaultValue="120" />
                <SettingInput label="Carbs" id="carbs" unit="g" defaultValue="250" />
                <SettingInput label="Fats" id="fats" unit="g" defaultValue="70" />
                <SettingInput label="Fiber" id="fiber" unit="g" defaultValue="30" />
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Micronutrient Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <SettingInput label="Sugar" id="sugar" unit="g" defaultValue="50" />
                <SettingInput label="Sodium" id="sodium" unit="mg" defaultValue="2300" />
                <SettingInput label="Potassium" id="potassium" unit="mg" defaultValue="3500" />
                <SettingInput label="Calcium" id="calcium" unit="mg" defaultValue="1000" />
                <SettingInput label="Iron" id="iron" unit="mg" defaultValue="18" />
                <SettingInput label="Vitamin C" id="vitaminc" unit="mg"defaultValue="90" />
            </CardContent>
        </Card>
        
        <div className="flex justify-end">
            <Button size="lg">Save Changes</Button>
        </div>
      </div>
    </main>
  );
}
