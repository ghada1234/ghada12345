
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserAccount } from "@/context/user-account-context";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Leaf } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export default function LoginPage() {
    const { login } = useUserAccount();
    const router = useRouter();
    const { translations } = useLanguage();
    const t = translations.login;

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        login();
        router.push('/dashboard');
    }

    return (
        <main className="flex-1 flex items-center justify-center p-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <Leaf className="mx-auto h-12 w-12 text-primary" />
                    <CardTitle className="mt-4 text-2xl font-bold">{t.title}</CardTitle>
                    <CardDescription>{t.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">{t.emailLabel}</Label>
                            <Input id="email" type="email" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">{t.passwordLabel}</Label>
                            <Input id="password" type="password" required />
                        </div>
                        <Button type="submit" className="w-full">
                            {t.loginButton}
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        {t.signupPrompt}{" "}
                        <Link href="/signup" className="underline">
                            {t.signupLink}
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
