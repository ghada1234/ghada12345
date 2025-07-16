
"use client";

import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
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
    // const paymentTranslations = translations.settings.payments;

    // useEffect(() => {
    //     if (window.paypal && document.getElementById("paypal-container-ZG2S8WZTCVN4Q")) {
    //         try {
    //             window.paypal.HostedButtons({
    //                 hostedButtonId: "ZG2S8WZTCVN4Q",
    //             }).render("#paypal-container-ZG2S8WZTCVN4Q");
    //         } catch (error) {
    //             console.error("Failed to render PayPal button:", error);
    //         }
    //     }
    // }, []);

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 flex items-center justify-center bg-muted/40">
      
    </main>
  );
}
