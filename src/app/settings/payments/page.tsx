
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/context/language-context";
import { Banknote, CreditCard, Landmark } from "lucide-react";

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
                    <Landmark className="h-6 w-6 text-primary" />
                    <CardTitle>{paymentTranslations.bankAccount.title}</CardTitle>
                </div>
                <CardDescription>{paymentTranslations.bankAccount.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="account-holder">{paymentTranslations.bankAccount.accountHolder}</Label>
                    <Input id="account-holder" placeholder={paymentTranslations.bankAccount.accountHolderPlaceholder} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="routing-number">{paymentTranslations.bankAccount.routingNumber}</Label>
                        <Input id="routing-number" placeholder="123456789" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="account-number">{paymentTranslations.bankAccount.accountNumber}</Label>
                        <Input id="account-number" placeholder="000123456789" />
                    </div>
                </div>
                <p className="text-xs text-muted-foreground">{paymentTranslations.bankAccount.disclaimer}</p>
            </CardContent>
            <CardFooter>
                <Button>
                    <Banknote className="mr-2 h-4 w-4" />
                    {paymentTranslations.bankAccount.cta}
                </Button>
            </CardFooter>
        </Card>
      </div>
    </main>
  );
}
