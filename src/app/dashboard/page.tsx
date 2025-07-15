
"use client";

import { DailyMacros } from "@/components/daily-macros";
import { Micronutrients } from "@/components/micronutrients";
import { TodaysLog } from "@/components/todays-log";
import { RecipeSuggester } from "@/components/recipe-suggester";
import { Leaf } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";

export default function DashboardPage() {
    const { translations } = useLanguage();
  return (
    <>
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="space-y-4">
            <h1 className="text-2xl font-bold tracking-tight">{translations.dashboard.title}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <DailyMacros />
              <Micronutrients />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <TodaysLog />
              <RecipeSuggester />
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-muted/60 py-8 mt-auto">
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-2">
                <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
                    <Leaf className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">{translations.appName}</span>
                </Link>
                <p className="text-sm text-muted-foreground">{translations.dashboard.footer.tagline}</p>
            </div>
            <div>
                <h4 className="font-semibold mb-2">{translations.dashboard.footer.product.title}</h4>
                <ul className="space-y-1">
                    <li><Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">{translations.dashboard.footer.product.features}</Link></li>
                    <li><Link href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground">{translations.dashboard.footer.product.testimonials}</Link></li>
                    <li><Link href="#faq" className="text-sm text-muted-foreground hover:text-foreground">{translations.dashboard.footer.product.faq}</Link></li>
                </ul>
            </div>
              <div>
                <h4 className="font-semibold mb-2">{translations.dashboard.footer.company.title}</h4>
                <ul className="space-y-1">
                    <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">{translations.dashboard.footer.company.about}</Link></li>
                    <li><Link href="/feedback" className="text-sm text-muted-foreground hover:text-foreground">{translations.dashboard.footer.company.feedback}</Link></li>
                </ul>
            </div>
        </div>
        <div className="container mx-auto px-4 md:px-6 mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} {translations.appName}. {translations.dashboard.footer.rights}
        </div>
      </footer>
    </>
  );
}
