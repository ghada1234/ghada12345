
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
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function PaymentsPage() {
    const { translations } = useLanguage();
    const { toast } = useToast();
    const paymentTranslations = translations.settings.payments;

    const handleBankTransferSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: paymentTranslations.bankTransfer.toast.title,
            description: paymentTranslations.bankTransfer.toast.description
        });
    }

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
                <CardTitle>{paymentTranslations.paypal.title}</CardTitle>
                <CardDescription>{paymentTranslations.paypal.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
                <div id="paypal-hosted-button-container"></div>
            </CardContent>
        </Card>
        
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="bank-transfer">
                <AccordionTrigger className="text-lg font-semibold">{paymentTranslations.bankTransfer.title}</AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-4">
                        <p className="text-muted-foreground">{paymentTranslations.bankTransfer.instructions}</p>
                        <div className="p-4 bg-muted rounded-md space-y-2 text-sm">
                            <p><strong>{paymentTranslations.bankTransfer.bankName.label}:</strong> {paymentTranslations.bankTransfer.bankName.value}</p>
                            <p><strong>{paymentTranslations.bankTransfer.accountHolder.label}:</strong> {paymentTranslations.bankTransfer.accountHolder.value}</p>
                            <p><strong>{paymentTranslations.bankTransfer.iban.label}:</strong> {paymentTranslations.bankTransfer.iban.value}</p>
                            <p><strong>{paymentTranslations.bankTransfer.swift.label}:</strong> {paymentTranslations.bankTransfer.swift.value}</p>
                        </div>
                        <form onSubmit={handleBankTransferSubmit} className="space-y-4">
                            <p className="font-semibold text-sm">{paymentTranslations.bankTransfer.form.title}</p>
                            <div className="space-y-2">
                                <Label htmlFor="fullName">{paymentTranslations.bankTransfer.form.nameLabel}</Label>
                                <Input id="fullName" placeholder={paymentTranslations.bankTransfer.form.namePlaceholder} required />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="reference">{paymentTranslations.bankTransfer.form.referenceLabel}</Label>
                                <Input id="reference" placeholder={paymentTranslations.bankTransfer.form.referencePlaceholder} required />
                            </div>
                            <Button type="submit" className="w-full">{paymentTranslations.bankTransfer.form.submitButton}</Button>
                        </form>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

      </div>
    </main>
  );
}
