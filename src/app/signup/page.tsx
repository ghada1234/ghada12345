
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, Upload } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
    return (
        <main className="flex-1 flex items-center justify-center p-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <Leaf className="mx-auto h-12 w-12 text-primary" />
                    <CardTitle className="mt-4 text-2xl font-bold">Create an Account</CardTitle>
                    <CardDescription>Start your journey with NutriSnap today.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" type="text" placeholder="Your Name" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required />
                    </div>
                    <div className="space-y-2">
                        <Label>Profile Picture</Label>
                        <Button variant="outline" className="w-full flex items-center gap-2" asChild>
                            <label htmlFor="avatar-upload" className="cursor-pointer">
                                <Upload className="h-4 w-4" />
                                <span>Upload an Image</span>
                            </label>
                        </Button>
                        <Input id="avatar-upload" type="file" className="hidden" accept="image/*"/>
                    </div>
                    <Button type="submit" className="w-full">
                        Create Account
                    </Button>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline">
                            Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
