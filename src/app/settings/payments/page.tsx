
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
                    // To set up a subscription, you need a Plan ID.
                    // 1. Go to your PayPal Developer Dashboard: https://developer.paypal.com/
                    // 2. Go to "My Apps & Credentials" and select your app.
                    // 3. Under "Subscriptions", create a new plan (e.g., $4.99/month).
                    // 4. Copy the generated Plan ID and paste it below.
                    createSubscription: function(data: any, actions: any) {
                        return actions.subscription.create({
                            'plan_id': 'YOUR_PLAN_ID_HERE' 
                        });
                    },
                    // Finalize the transaction after payer approval
                    onApprove: function(data: any, actions: any) {
                        // This function is called when the transaction is approved by the user.
                        // data.subscriptionID contains the ID of the new subscription.
                        console.log('Subscription approved:', data.subscriptionID);
                        
                        // You can now save this subscriptionID to your backend for management.

                        // Upgrade user to Pro in the frontend state
                        upgradeToPro();
                        
                        // Redirect to settings page or a thank you page
                        router.push('/settings');
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
