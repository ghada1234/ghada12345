
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { Check } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const { translations } = useLanguage();

  const tiers = [
    {
      name: translations.pricing.tiers.free.name,
      price: translations.pricing.tiers.free.price,
      description: translations.pricing.tiers.free.description,
      features: translations.pricing.tiers.free.features,
      cta: translations.pricing.tiers.free.cta,
      href: "/dashboard"
    },
    {
      name: translations.pricing.tiers.pro.name,
      price: translations.pricing.tiers.pro.price,
      description: translations.pricing.tiers.pro.description,
      features: translations.pricing.tiers.pro.features,
      cta: translations.pricing.tiers.pro.cta,
      href: "#" // This would eventually link to a checkout page
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tiers.map((tier) => (
            <Card key={tier.name} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-6">
                <div className="text-4xl font-bold">{tier.price}</div>
                <ul className="space-y-4">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href={tier.href} className="w-full">
                    <Button className="w-full" variant={tier.name === "Pro" ? "default" : "outline"}>
                        {tier.cta}
                    </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
