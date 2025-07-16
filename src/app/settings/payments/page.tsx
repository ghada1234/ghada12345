
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


const ApplePayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="20" viewBox="0 0 48 20">
        <path d="M10.151 6.818c-.042.02-.07.03-.11.05-.12.04-.24.09-.36.14a4.15 4.15 0 0 0-1.45 1.129c-.5.62-.92 1.4-1.12 2.228-.02.08-.04.16-.05.25h3.35c.01-.08.02-.15.03-.23.1-.73.4-1.35.8-1.8.4-.44.9-.66 1.5-.66.59 0 1.09.22 1.5.66.39.43.59.97.59 1.62 0 .6-.18 1.1-.55 1.52-.37.42-.85.63-1.45.63-.4 0-.76-.09-1.09-.27-.32-.18-.54-.42-.65-.72h-3.3c.13 1.15.58 2.15 1.34 3.01.76.86 1.74 1.29 2.94 1.29.98 0 1.83-.29 2.55-.87.72-.58 1.2-1.39 1.44-2.42.04-.18.06-.36.06-.54 0-.6-.1-1.16-.3-1.68-.2-.52-.5-1.03-.88-1.5-.39-.47-.84-.85-1.38-1.12a4.12 4.12 0 0 0-1.8-.6c-.08 0-.15-.01-.23-.01s-.16.01-.24.01" fill="#fff" />
        <path d="M17.443 14.867h3.208V9.153c0-.98.22-1.78.66-2.4.44-.62.99-.93 1.65-.93.63 0 1.17.3 1.62.91.45.6.67 1.4.67 2.4v5.734h3.209V8.89c0-1.28-.35-2.37-.92-3.14-.64-.85-1.5-1.28-2.6-1.28-1.08 0-1.93.4-2.56 1.2-.63-.8-1.48-1.2-2.54-1.2-1.03 0-1.84.4-2.44 1.2-.6.8-." fill="#fff" />
        <path d="M33.473 14.867h3.208V9.153c0-.98.22-1.78.66-2.4.44-.62 1-.93 1.65-.93.63 0 1.17.3 1.62.91.45.6.67 1.4.67 2.4v5.734h3.209V8.89c0-1.28-.35-2.37-.92-3.14-.64-.85-1.5-1.28-2.6-1.28-1.08 0-1.93.4-2.56 1.2-.63-.8-1.48-1.2-2.54-1.2-1.03 0-1.84.4-2.44 1.2-.6.8-.9 1.8-.9 3.01v6.133z" fill="#fff" />
        <path d="M14.61 3.111a2.43 2.43 0 0 1 1.21-1.01c.49-.28 1.03-.42 1.6-.42.2 0 .4.02.58.05.09.02.18.03.26.05l.3-.15c-.1-.02-.2-.04-.3-.06a2.6 2.6 0 0 0-1.7-.6c-.63 0-1.2.16-1.7.48-.5.32-.88.75-1.12 1.28-.24-.42-.55-.78-.92-1.07a3.14 3.14 0 0 0-1.2-.67 3.9 3.9 0 0 0-3.83 2.5c-.26.68-.4 1.4-.4 2.15 0 .9.17 1.74.52 2.5.35.77.82 1.4 1.42 1.9.6.5 1.25.74 1.95.74.1 0 .2 0 .3-.02a.85.85 0 0 0 .34-.11c.1-.05.18-.1.25-.15l-.2-.3c-.04.03-.08.06-.13.08-.09.05-.18.09-.27.12-.5.18-1.01.1-1.5-.24-.5-.35-.85-.8-1.04-1.38-.2-.57-.3-1.18-.3-1.82 0-.6.12-1.2.37-1.76.25-.56.6-1.02 1.05-1.37.45-.35.97-.53 1.55-.53.18 0 .35.03.5.08.15.06.3.13.42.22l.36-.22a2.43 2.43 0 0 1-1.2-1.01" fill="#fff" />
    </svg>
);


export default function PaymentsPage() {
    const { translations } = useLanguage();
    const { toast } = useToast();
    const paymentTranslations = translations.settings.payments;

    const handleApplePay = () => {
        toast({
            title: "Apple Pay",
            description: "Apple Pay integration is not yet implemented.",
        });
    }

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
                <CardTitle>{paymentTranslations.completePayment.title}</CardTitle>
                <CardDescription>{paymentTranslations.completePayment.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4 pt-6">
                <Button 
                    onClick={handleApplePay} 
                    className="w-full max-w-xs h-12 bg-black hover:bg-black/80 text-white rounded-lg flex items-center justify-center gap-2"
                >
                    <ApplePayIcon />
                </Button>
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

