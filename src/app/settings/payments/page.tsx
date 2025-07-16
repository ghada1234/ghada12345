
"use client";

import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { Leaf } from "lucide-react";

declare global {
  interface Window {
    paypal?: any;
  }
}

export default function PaymentsPage() {
    const { translations } = useLanguage();
    const paymentTranslations = translations.settings.payments;

    useEffect(() => {
        if (window.paypal && document.getElementById("paypal-container-ZG2S8WZTCVN4Q")) {
            try {
                window.paypal.HostedButtons({
                    hostedButtonId: "ZG2S8WZTCVN4Q",
                }).render("#paypal-container-ZG2S8WZTCVN4Q");
            } catch (error) {
                console.error("Failed to render PayPal button:", error);
            }
        }
    }, []);

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 flex items-center justify-center bg-muted/40">
      <div className="w-full max-w-md">
        <Card>
            <CardHeader className="text-center">
                <Leaf className="mx-auto h-12 w-12 text-primary"/>
                <CardTitle className="mt-2">{paymentTranslations.checkout.title}</CardTitle>
                <CardDescription>{paymentTranslations.checkout.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="p-4 border rounded-lg space-y-2 bg-muted/50">
                    <div className="flex justify-between font-semibold">
                        <span>{paymentTranslations.checkout.planName}</span>
                        <span>$4.99 USD</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{paymentTranslations.checkout.planDescription}</p>
                </div>
                <div id="paypal-container-ZG2S8WZTCVN4Q" className="flex justify-center"></div>
                <p className="text-xs text-center text-muted-foreground">
                    {paymentTranslations.checkout.guestCheckoutHint}
                </p>
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
