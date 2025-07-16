
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { Check } from "lucide-react";
import Link from "next/link";

function ApplePayIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 100 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M78.633 32.114C78.633 22.258 87.23 16.32 87.23 16.32C77.425 10.96 68.498 11.513 65.98 11.513C58.31 11.513 52.053 15.694 48.975 15.694C45.897 15.694 40.542 11.513 33.613 11.513C26.173 11.513 18.246 16.377 14.332 23.473C6.348 37.333 11.498 57.886 19.37 63.226C23.08 65.84 27.52 66.52 31.803 66.36C36.085 66.2 38.35 63.633 45.157 63.633C51.963 63.633 53.86 66.36 58.623 66.36C63.386 66.36 67.243 64.093 70.477 61.36C74.08 58.373 75.386 54.193 75.643 53.88C75.386 53.823 66.56 50.48 66.56 42.16C66.56 34.626 74.343 31.28 74.657 31.12C72.8 28.393 70.063 27.2 66.985 27.2C64.65 27.2 62.063 28.026 60.1 29.546C58.65 30.6 57.043 31.88 54.817 31.88C52.59 31.88 51.197 30.653 49.746 29.546C46.88 27.466 42.966 25.133 38.35 25.133C33.68 25.133 28.68 28.44 26.68 31.426C26.423 31.826 26.28 32.226 26.173 32.626C26.33 32.68 26.744 32.893 27.424 33.253C28.784 34 30.864 35.093 30.864 37.426C30.864 40.6 27.58 41.88 26.33 42.48C18.67 45.413 16.814 52.453 22.384 58.733C25.464 62.333 29.697 63.786 33.243 63.786C35.52 63.786 38.05 62.906 41.54 60.48C46.1 57.493 49.33 53.053 51.383 53.053C53.437 53.053 54.463 55.44 58.053 55.44C61.643 55.44 63.777 53.053 65.82 53.053C68.237 53.053 71.37 55.08 73.54 57.32C69.307 60.613 65.267 62.586 61.227 62.586C58.36 62.586 56.56 61.36 53.16 61.36C49.76 61.36 47.76 62.586 45.05 62.586C42.34 62.586 39.86 61.36 37.68 60.026C36.853 59.48 35.88 58.826 34.624 58.28C34.367 58.12 33.68 57.773 33.68 57.773C35.534 56.426 36.46 54.346 36.46 52.16C36.46 47.98 33.477 45.413 30.494 43.906C29.667 43.466 28.52 42.866 27.53 42.533C29.384 40 32.25 38.373 35.387 38.373C37.337 38.373 39.42 39.053 41.22 40.226C42.827 41.253 44.433 42.426 46.85 42.426C49.267 42.426 50.774 41.2 52.323 40.226C55.023 38.373 58.57 36.32 63.497 36.32C66.52 36.32 69.546 37.426 71.453 39.56C71.346 39.613 71.24 39.666 71.133 39.72C69.223 40.84 67.72 42.426 67.72 44.6C67.72 47.786 70.853 49.373 72.8 50.253C73.114 50.413 73.483 50.573 73.907 50.786C78.633 46.28 79.503 39.186 78.633 32.114Z" fill="currentColor"></path>
            <path d="M68.55 9.893C72.197 5.76 71.37 0 66.37 0C63.243 0 60.377 1.76 58.47 3.466C56.62 5.173 54.444 6.826 51.857 6.826C53.964 8.773 56.62 10.12 59.54 10.12C62.824 10.12 65.85 8.586 68.55 9.893Z" fill="currentColor"></path>
        </svg>
    )
}

function VisaIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 38 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M37.6 11.25H34.46L31.1 0.75H34.24L37.6 11.25Z" fill="#142688"></path>
            <path d="M25.323 0.75L21.083 11.25H17.883L22.123 0.75H25.323Z" fill="#142688"></path>
            <path d="M16.94 0.93L19.22 8.79L19.46 8.01L17.3 2.13C17.12 1.59 16.58 1.17 16 1.05C15.06 0.84 14.07 0.75 13.11 0.75H5.82C5.07 0.75 4.38 1.2 4.14 1.89L0 11.25H3.34L4.85 7.68H10.58L9.04 11.25H12.2L16.94 0.93Z" fill="#142688"></path>
            <path d="M29.9 2.19C29.9 1.35 30.77 0.75 31.7 0.75H37.42L37.58 1.02L32.74 1.02C32.12 1.02 31.57 1.41 31.42 1.95L30.13 6.33L29.9 2.19Z" fill="#142688"></path>
            <path d="M12.912 4.62C12.912 3.12 11.662 2.76 10.282 2.76H7.172L7.612 4.62H9.682C10.432 4.62 10.742 4.95 10.632 5.58L10.022 8.43H13.252L12.912 4.62Z" fill="#F6A600"></path>
        </svg>
    )
}

function MastercardIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <circle cx="12" cy="12" r="12" fill="#EA001B"></circle>
            <circle cx="26" cy="12" r="12" fill="#F79E1B" fillOpacity="0.8"></circle>
        </svg>
    )
}

function AmexIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 38 24" fill="#016FD0" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M29.81 18.06h2.24l-2.02-4.22h-3.96l-2.04 4.22h2.24l.58-1.28h2.38l.58 1.28Zm-2.76-2.48h1.9l-.95-2.08-.95 2.08Z"></path>
            <path d="M15.42 13.84h3.94l-2.78-4.22h3.94l-2.78-4.22h3.94V3.94H11.2v1.46h4.82l-2.78 4.22H9.3l-2.78-4.22h3.94V3.94H0v1.46h4.82l2.78 4.22H3.66v1.46h11.76v-1.24Z"></path>
            <path d="m20.24 3.94-2.3 14.12h1.6l2.3-14.12h-1.6Z"></path>
            <path d="M30.76 3.94v1.46h4.48l-.34 1.84h-4.14v1.46h3.8l-.34 1.84h-3.46v1.46h3.12l-.34 1.84h-2.78v1.48h5.36l2.42-13.14h-7.22Z"></path>
        </svg>
    )
}

function PayPalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M3.325 6.642c0-1.842.076-2.618.51-3.235.435-.617 1.218-.9 2.39-.9H17.77c4.254 0 4.254 0 4.254 4.21v5.305c0 1.842-.077 2.618-.51 3.235-.436.617-1.218-.9-2.39.9H6.226c-4.254 0-4.254 0-4.254-4.21V6.642Z" fill="#003087"></path>
        <path d="M4.693 7.234c0-.92.038-1.31.255-1.618.218-.308.61-.45 1.196-.45h11.71c.587 0 .978.142 1.195.45.217.309.255.698.255 1.618v.53c-.022 1.545-1.02 2.724-2.583 2.793-.1.004-.2.006-.3.006h-2.138c-.37 0-.714-.067-1.023-.2-.308-.133-.578-.335-.803-.598-.226-.263-.404-.58-.528-.94-.037-.107-.068-.216-.092-.326l-.422-2.26H8.28l-.893 4.803-.178.96c-.34 1.808.956 2.583 2.63 2.583h.977c.39 0 .753-.08 1.08-.238.325-.158.604-.383.824-.666.22-.283.376-.62.46-1.002l.147-.655c.023-.1.05-.2.08-.3h.334c.03-.017.06-.03.088-.042 1.564-.316 2.63-1.577 2.772-3.257V7.234c0-1.842-.076-2.618-.51-3.235C19.22 3.382 18.438 3.08 17.265 3.08H6.226c-1.173 0-1.955.298-2.39.915-.436.617-.512 1.393-.512 3.235v4.576l.334-.022c1.78-.116 3.102-1.468 3.32-3.25.04-.326.064-.657.07-1.02h.335l.335 1.79Z" fill="#fff"></path>
        <path d="M8.28 10.536l.498-2.673h2.388l-.497 2.673H8.28Zm1.967 4.295c-.173.666-.63 1.05-1.292 1.05h-.488c-.624 0-1.02-.32-1.19-.9l.782-4.192h2.388l-.208 4.032Z" fill="#009cde"></path>
    </svg>
  );
}


export default function PricingPage() {
  const { translations } = useLanguage();

  const tiers = [
    {
      name: translations.pricing.tiers.free.name,
      price: translations.pricing.tiers.free.price,
      description: translations.pricing.tiers.free.description,
      features: translations.pricing.tiers.free.features,
      cta: translations.pricing.tiers.free.cta,
      href: "/dashboard",
      variant: "outline"
    },
    {
      name: translations.pricing.tiers.pro.name,
      price: translations.pricing.tiers.pro.price,
      description: translations.pricing.tiers.pro.description,
      features: translations.pricing.tiers.pro.features,
      cta: translations.pricing.tiers.pro.cta,
      href: "/settings/payments",
      variant: "default"
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
            <Card key={tier.name} className={`flex flex-col ${tier.name === 'Pro' ? 'border-primary' : ''}`}>
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
                    <Button className="w-full" variant={tier.variant as "default" | "outline"}>
                        {tier.cta}
                    </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center pt-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">
                {translations.pricing.paymentMethods.title}
            </h3>
            <div className="flex justify-center items-center gap-4 flex-wrap">
                <VisaIcon className="h-8 text-gray-700" />
                <MastercardIcon className="h-8 text-gray-700" />
                <AmexIcon className="h-8 text-gray-700" />
                <ApplePayIcon className="h-10 text-gray-800 dark:text-gray-200" />
                <PayPalIcon className="h-10 text-blue-900" />
            </div>
        </div>

      </div>
    </main>
  );
}
