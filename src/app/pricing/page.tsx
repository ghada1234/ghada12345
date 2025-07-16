
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { useUserAccount, ACTIVATION_DATE } from "@/context/user-account-context";
import { Check, Info } from "lucide-react";
import { useRouter } from 'next/navigation';
import { format } from "date-fns";


export default function PricingPage() {
  const { translations } = useLanguage();
  const { isPro, upgradeToPro, paymentsActive } = useUserAccount();
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
       <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">{translations.pricing.title}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            {translations.pricing.subtitle}
          </p>
        </div>
        
        {!paymentsActive && (
             <Card className="bg-primary/10 border-primary/20">
                <CardContent className="p-4 flex items-center gap-4 text-primary">
                    <Info className="h-6 w-6"/>
                    <div>
                        <p className="font-semibold">{translations.pricing.activationNotice.title}</p>
                        <p className="text-sm">{translations.pricing.activationNotice.description.replace('{date}', format(ACTIVATION_DATE, 'PPP'))}</p>
                    </div>
                </CardContent>
             </Card>
        )}
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tiers.map((tier) => (
            <Card key={tier.name} className="flex flex-col">
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                <p className="text-4xl font-bold pt-4">{tier.price}</p>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={tier.action} 
                  variant={tier.variant as "default" | "outline"}
                  className="w-full"
                  disabled={tier.disabled || !paymentsActive}
                >
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
