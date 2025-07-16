
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/context/language-context";
import { CreditCard, Banknote } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

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

        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Banknote className="h-6 w-6 text-primary" />
                    <CardTitle>{paymentTranslations.bankTransfer.title}</CardTitle>
                </div>
                 <CardDescription>{paymentTranslations.bankTransfer.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{paymentTranslations.bankTransfer.instructions}</p>
                 <div className="space-y-3 rounded-md border p-4">
                    <div className="flex justify-between">
                        <span className="font-semibold text-muted-foreground">{paymentTranslations.bankTransfer.iban}</span>
                        <span className="font-mono">YOUR_IBAN_HERE</span>
                    </div>
                     <Separator />
                    <div className="flex justify-between">
                        <span className="font-semibold text-muted-foreground">{paymentTranslations.bankTransfer.swift}</span>
                        <span className="font-mono">YOUR_SWIFT_BIC_HERE</span>
                    </div>
                     <Separator />
                    <div className="flex justify-between">
                        <span className="font-semibold text-muted-foreground">{paymentTranslations.bankTransfer.bankName}</span>
                        <span className="font-mono">YOUR_BANK_NAME_HERE</span>
                    </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">{paymentTranslations.bankTransfer.referenceNote}</p>
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
