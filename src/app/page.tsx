
"use client";

import Link from 'next/link';
import {
  ArrowRight,
  Camera,
  ScanBarcode,
  Sparkles,
  Heart,
  Users,
  Languages,
  Leaf,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/context/language-context';

export default function LandingPage() {
    const { translations } = useLanguage();

  return (
    <>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted/20">
          <div className="container px-4 md:px-6 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                {translations.home.hero.title}
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                {translations.home.hero.subtitle}
              </p>
            </div>
            <div className="mt-6 flex justify-center gap-4 max-w-xs mx-auto">
              <Link href="/dashboard" className="flex-1">
                <Button className="w-full">
                  {translations.home.hero.getStarted}
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link href="#how-it-works" className="flex-1">
                <Button variant="outline" className="w-full">
                  {translations.home.hero.howItWorks}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  {translations.home.howItWorksSection.title}
                </h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Camera />
                </div>
                <h3 className="text-lg font-bold">{translations.home.howItWorksSection.step1.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {translations.home.howItWorksSection.step1.description}
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Sparkles />
                </div>
                <h3 className="text-lg font-bold">{translations.home.howItWorksSection.step2.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {translations.home.howItWorksSection.step2.description}
                </p>
              </div>
              <div className="grid gap-1 text-center">
                 <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <CheckCircle />
                </div>
                <h3 className="text-lg font-bold">{translations.home.howItWorksSection.step3.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {translations.home.howItWorksSection.step3.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{translations.home.features.title}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {translations.home.features.subtitle}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3 mt-12">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold flex items-center gap-2"><Leaf className="text-primary"/>{translations.home.features.mealPlans.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {translations.home.features.mealPlans.description}
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold flex items-center gap-2"><Sparkles className="text-primary"/>{translations.home.features.progressTracking.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {translations.home.features.progressTracking.description}
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold flex items-center gap-2"><ScanBarcode className="text-primary"/>{translations.home.features.barcodeScanner.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {translations.home.features.barcodeScanner.description}
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold flex items-center gap-2"><Sparkles className="text-primary"/>{translations.home.features.foodDatabase.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {translations.home.features.foodDatabase.description}
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold flex items-center gap-2"><Users className="text-primary"/>{translations.home.features.community.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {translations.home.features.community.description}
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold flex items-center gap-2"><Languages className="text-primary"/>{translations.home.features.multiLanguage.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {translations.home.features.multiLanguage.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">{translations.home.testimonials.title}</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {translations.home.testimonials.subtitle}
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 pt-12 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                    <p className="text-lg font-semibold">“{translations.home.testimonials.testimonial1.quote}”</p>
                </CardContent>
                <CardFooter className="flex items-center gap-4 p-6 pt-0">
                  <Avatar>
                    <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="woman" alt="ghada rabee" />
                    <AvatarFallback>GR</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{translations.home.testimonials.testimonial1.author}</div>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p>“{translations.home.testimonials.testimonial2.quote}”</p>
                </CardContent>
                <CardFooter className="flex items-center gap-4 p-6 pt-0">
                  <Avatar>
                    <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="woman" alt="Sarah K." />
                    <AvatarFallback>SK</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{translations.home.testimonials.testimonial2.author}</div>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p>“{translations.home.testimonials.testimonial3.quote}”</p>
                </CardContent>
                <CardFooter className="flex items-center gap-4 p-6 pt-0">
                  <Avatar>
                    <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="man" alt="Ahmed M." />
                    <AvatarFallback>AM</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{translations.home.testimonials.testimonial3.author}</div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start justify-center space-y-4 text-left">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{translations.home.faq.title}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {translations.home.faq.subtitle}
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl w-full pt-12">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">{translations.home.faq.q1.question}</AccordionTrigger>
                  <AccordionContent className="text-left">
                    {translations.home.faq.q1.answer}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">{translations.home.faq.q2.question}</AccordionTrigger>
                  <AccordionContent className="text-left">
                    {translations.home.faq.q2.answer}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">{translations.home.faq.q3.question}</AccordionTrigger>
                  <AccordionContent className="text-left">
                    {translations.home.faq.q3.answer}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">{translations.home.faq.q4.question}</AccordionTrigger>
                  <AccordionContent className="text-left">
                    {translations.home.faq.q4.answer}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        <footer className="bg-muted/60 py-8 mt-12">
          <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-2">
                  <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
                      <Leaf className="h-6 w-6 text-primary" />
                      <span className="font-bold text-lg">{translations.appName}</span>
                  </Link>
                  <p className="text-sm text-muted-foreground">{translations.home.footer.tagline}</p>
              </div>
              <div>
                  <h4 className="font-semibold mb-2">{translations.home.footer.product.title}</h4>
                  <ul className="space-y-1">
                      <li><Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">{translations.home.footer.product.features}</Link></li>
                      <li><Link href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground">{translations.home.footer.product.testimonials}</Link></li>
                      <li><Link href="#faq" className="text-sm text-muted-foreground hover:text-foreground">{translations.home.footer.product.faq}</Link></li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-semibold mb-2">{translations.home.footer.company.title}</h4>
                  <ul className="space-y-1">
                      <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">{translations.home.footer.company.about}</Link></li>
                      <li><Link href="/feedback" className="text-sm text-muted-foreground hover:text-foreground">{translations.home.footer.company.feedback}</Link></li>
                  </ul>
              </div>
          </div>
          <div className="container mx-auto px-4 md:px-6 mt-8 text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} {translations.appName}. {translations.home.footer.rights}
          </div>
        </footer>
      </main>
    </>
  );
}
