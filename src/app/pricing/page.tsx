
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { useUserAccount } from "@/context/user-account-context";
import { Check } from "lucide-react";
import { useRouter } from 'next/navigation';


export default function PricingPage() {
  const { translations } = useLanguage();
  const { isPro, upgradeToPro } = useUserAccount();
  const router = useRouter();

  const handleUpgrade = () => {
    upgradeToPro();
    router.push('/settings/payments');
  }

  const tiers = [
    {
      name: translations.pricing.tiers.free.name,
      price: translations.pricing.tiers.free.price,
      description: translations.pricing.tiers.free.description,
      features: translations.pricing.tiers.free.features,
      cta: translations.pricing.tiers.free.cta,
      action: () => router.push('/dashboard'),
      variant: "outline",
      disabled: isPro
    },
    {
      name: translations.pricing.tiers.pro.name,
      price: translations.pricing.tiers.pro.price,
      description: translations.pricing.tiers.pro.description,
      features: translations.pricing.tiers.pro.features,
      cta: isPro ? translations.pricing.tiers.pro.ctaActive : translations.pricing.tiers.pro.cta,
      action: handleUpgrade,
      variant: "default",
      disabled: isPro,
    }
  ];

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      
    </main>
  );
}
