
"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, Upload } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { useUserAccount } from "@/context/user-account-context";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SignupPage() {
    const { translations } = useLanguage();
    const t = translations.signup;
    const { signup } = useUserAccount();
    const router = useRouter();
    const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would have API call here
        signup(); // Simulate signup and start the trial
        router.push('/dashboard');
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

    return (
        <main className="flex-1 flex items-center justify-center p-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    {avatarSrc ? (
                        <Avatar className="mx-auto h-20 w-20">
                            <AvatarImage src={avatarSrc} alt="User avatar" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                    ) : (
                        <Leaf className="mx-auto h-12 w-12 text-primary" />
                    )}
                    <CardTitle className="mt-4 text-2xl font-bold">{t.title}</CardTitle>
                    <CardDescription>{t.description.replace('{appName}', translations.appName)}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">{t.nameLabel}</Label>
                            <Input id="name" type="text" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">{t.emailLabel}</Label>
                            <Input id="email" type="email" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">{t.passwordLabel}</Label>
                            <Input id="password" type="password" required />
                        </div>
                        <div className="space-y-2">
                            <Label>{t.avatarLabel}</Label>
                            <Button variant="outline" className="w-full flex items-center gap-2" asChild>
                                <label htmlFor="avatar-upload" className="cursor-pointer">
                                    <Upload className="h-4 w-4" />
                                    <span>{t.avatarButton}</span>
                                </label>
                            </Button>
                            <Input id="avatar-upload" type="file" className="hidden" accept="image/*" onChange={handleAvatarChange}/>
                        </div>
                        <Button type="submit" className="w-full">
                            {t.createButton}
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        {t.loginPrompt}{" "}
                        <Link href="/login" className="underline">
                            {t.loginLink}
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
