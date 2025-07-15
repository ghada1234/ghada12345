import { DashboardHeader } from "@/components/dashboard-header";
import { DailyMacros } from "@/components/daily-macros";
import { WeeklyProgressChart } from "@/components/weekly-progress-chart";
import { RecipeSuggester } from "@/components/recipe-suggester";
import { Micronutrients } from "@/components/micronutrients";
import { TodaysLog } from "@/components/todays-log";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="space-y-4">
            <h1 className="text-2xl font-bold tracking-tight">Daily Dashboard</h1>
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
                    <span className="font-bold text-lg">NutriSnap</span>
                </Link>
                <p className="text-sm text-muted-foreground">Your AI-powered companion for smart and simple nutrition tracking.</p>
            </div>
            <div>
                <h4 className="font-semibold mb-2">Product</h4>
                <ul className="space-y-1">
                    <li><Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">Features</Link></li>
                    <li><Link href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground">Testimonials</Link></li>
                    <li><Link href="#faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</Link></li>
                </ul>
            </div>
              <div>
                <h4 className="font-semibold mb-2">Company</h4>
                <ul className="space-y-1">
                    <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">About</Link></li>
                    <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Feedback</Link></li>
                </ul>
            </div>
        </div>
        <div className="container mx-auto px-4 md:px-6 mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} NutriSnap. All rights reserved.
        </div>
      </footer>
    </>
  );
}
