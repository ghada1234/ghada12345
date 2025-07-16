
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { CreditCard } from "lucide-react";
import Link from "next/link";

export default function PaymentsPage() {
    const { translations } = useLanguage();
    const paymentTranslations = translations.settings.payments;

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">{paymentTranslations.title}</h1>
          <p className="text-muted-foreground mt-2">
            {paymentTranslations.subtitle}
          </p>
        </div>

        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <CreditCard className="h-6 w-6 text-primary" />
                    <CardTitle>{paymentTranslations.completePayment.title}</CardTitle>
                </div>
                <CardDescription>{paymentTranslations.completePayment.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4 pt-6">
                <Link href="https://paypal.me/gabdulaziz303?country.x=AE&locale.x=en_US" target="_blank" rel="noopener noreferrer" className="w-full max-w-xs">
                    <Button variant="outline" className="w-full h-12 bg-[#ffc439] hover:bg-[#ffc439]/90 text-[#003087]">
                        {paymentTranslations.payWithPayPal}
                    </Button>
                </Link>
                 <p className="text-sm text-muted-foreground text-center max-w-xs">
                    {paymentTranslations.completePayment.noAccountNeeded}
                </p>
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
