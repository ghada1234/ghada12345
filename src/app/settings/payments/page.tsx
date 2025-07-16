
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/context/language-context";
import { CreditCard, Banknote } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

function PayPalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M3.325 6.642c0-1.842.076-2.618.51-3.235.435-.617 1.218-.9 2.39-.9H17.77c4.254 0 4.254 0 4.254 4.21v5.305c0 1.842-.077 2.618-.51 3.235-.436.617-1.218-.9-2.39.9H6.226c-4.254 0-4.254 0-4.254-4.21V6.642Z" fill="#003087"></path>
        <path d="M4.693 7.234c0-.92.038-1.31.255-1.618.218-.308.61-.45 1.196-.45h11.71c.587 0 .978.142 1.195.45.217.309.255.698.255 1.618v.53c-.022 1.545-1.02 2.724-2.583 2.793-.1.004-.2.006-.3.006h-2.138c-.37 0-.714-.067-1.023-.2-.308-.133-.578-.335-.803-.598-.226-.263-.404-.58-.528-.94-.037-.107-.068-.216-.092-.326l-.422-2.26H8.28l-.893 4.803-.178.96c-.34 1.808.956 2.583 2.63 2.583h.977c.39 0 .753-.08 1.08-.238.325-.158.604-.383.824-.666.22-.283.376-.62.46-1.002l.147-.655c.023-.1.05-.2.08-.3h.334c.03-.017.06-.03.088-.042 1.564-.316 2.63-1.577 2.772-3.257V7.234c0-1.842-.076-2.618-.51-3.235C19.22 3.382 18.438 3.08 17.265 3.08H6.226c-1.173 0-1.955.298-2.39.915-.436.617-.512 1.393-.512 3.235v4.576l.334-.022c1.78-.116 3.102-1.468 3.32-3.25.04-.326.064-.657.07-1.02h.335l.335 1.79Z" fill="#fff"></path>
        <path d="M8.28 10.536l.498-2.673h2.388l-.497 2.673H8.28Zm1.967 4.295c-.173.666-.63 1.05-1.292 1.05h-.488c-.624 0-1.02-.32-1.19-.9l.782-4.192h2.388l-.208 4.032Z" fill="#009cde"></path>
    </svg>
  );
}


export default function PaymentsPage() {
    const { translations } = useLanguage();

    const paymentTranslations = translations.settings.payments;

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
                <div className="flex items-center gap-2">
                    <CreditCard className="h-6 w-6 text-primary" />
                    <CardTitle>{paymentTranslations.creditCard.title}</CardTitle>
                </div>
                <CardDescription>{paymentTranslations.creditCard.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="card-name">{paymentTranslations.creditCard.nameOnCard}</Label>
                    <Input id="card-name" placeholder={paymentTranslations.creditCard.nameOnCardPlaceholder} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="card-number">{paymentTranslations.creditCard.cardNumber}</Label>
                    <Input id="card-number" placeholder="&#9679;&#9679;&#9679;&#9679; &#9679;&#9679;&#9679;&#9679; &#9679;&#9679;&#9679;&#9679; &#9679;&#9679;&#9679;&#9679;" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="expiry-date">{paymentTranslations.creditCard.expiryDate}</Label>
                        <Input id="expiry-date" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cvc">{paymentTranslations.creditCard.cvc}</Label>
                        <Input id="cvc" placeholder="CVC" />
                    </div>
                </div>
                 <Button className="w-full">
                    <Banknote className="mr-2 h-4 w-4" />
                    {paymentTranslations.creditCard.cta}
                </Button>
            </CardContent>
            
            <div className="p-6 pt-0">
                <div className="flex items-center my-4">
                    <Separator className="flex-1" />
                    <span className="px-4 text-sm text-muted-foreground">{paymentTranslations.or}</span>
                    <Separator className="flex-1" />
                </div>

                <Link href="https://paypal.me/gabdulaziz303?country.x=AE&locale.x=en_US" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full bg-[#ffc439] hover:bg-[#ffc439]/90 text-[#003087]">
                        <PayPalIcon className="mr-2 h-6 w-6" />
                        {paymentTranslations.payWithPayPal}
                    </Button>
                </Link>
            </div>
            
        </Card>
      </div>
    </main>
  );
}
