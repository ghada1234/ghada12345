
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
import { useUserAccount } from "@/context/user-account-context";
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    paypal?: any;
  }
}

export default function PaymentsPage() {
    const { translations } = useLanguage();
    const { upgradeToPro } = useUserAccount();
    const router = useRouter();
    const paymentTranslations = translations.settings.payments;

    useEffect(() => {
        if (window.paypal && document.getElementById("paypal-button-container")) {
            try {
                window.paypal.Buttons({
                    // Sets up the transaction when a payment button is clicked
                    createOrder: function(data: any, actions: any) {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: '4.99' // The amount for the Pro plan
                                }
                            }]
                        });
                    },
                    // Finalize the transaction after payer approval
                    onApprove: function(data: any, actions: any) {
                        return actions.order.capture().then(function(orderData: any) {
                            // Successful capture!
                            console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
                            // Upgrade user to Pro
                            upgradeToPro();
                            // Redirect to settings page or a thank you page
                            router.push('/settings');
                        });
                    }
                }).render('#paypal-button-container');
            } catch (error) {
                console.error("Failed to render PayPal button:", error);
            }
        }
    }, []);

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 flex items-center justify-center bg-muted/40">
       <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
            <Leaf className="mx-auto h-12 w-12 text-primary" />
            <CardTitle className="mt-4 text-2xl font-bold">{paymentTranslations.title}</CardTitle>
            <CardDescription>{paymentTranslations.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="bg-primary/10 p-4 rounded-lg text-center space-y-2">
                <h3 className="font-bold text-lg text-primary">{paymentTranslations.checkout.planName}</h3>
                <p className="text-muted-foreground">{paymentTranslations.checkout.planDescription}</p>
            </div>

            <div className="mt-6">
                <div id="paypal-button-container"></div>
            </div>
             <p className="text-center text-xs text-muted-foreground mt-4">{paymentTranslations.checkout.guestCheckoutHint}</p>
        </CardContent>
       </Card>
    </main>
  );
}
