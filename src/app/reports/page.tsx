
"use client";

import { useState, useMemo, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Flame, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { useLanguage } from "@/context/language-context";
import { useMealLog } from "@/context/meal-log-context";
import { subDays, format, eachDayOfInterval, isSameDay } from "date-fns";
import { useUserAccount } from "@/context/user-account-context";
import Link from "next/link";
import { useSettings } from "@/context/settings-context";

const chartConfig = {
  value: {
    label: "Progress",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

function ProgressChart({ data, dataKey, categoryKey }: { data: any[], dataKey: string, categoryKey: string }) {
    const maxY = Math.max(...data.map(item => item[dataKey]), 0);
    const domainMax = maxY > 0 ? Math.ceil(maxY / 10) * 10 : 10;

    return (
        <ChartContainer config={chartConfig} className="h-64 w-full">
            <BarChart data={data} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey={categoryKey}
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                />
                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    width={30}
                    domain={[0, domainMax]}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey={dataKey} fill="var(--color-value)" radius={8} />
            </BarChart>
        </ChartContainer>
    );
}

const UpgradePrompt = () => {
    const { translations } = useLanguage();
    return (
    <Card className="w-full">
        <CardHeader className="text-center">
            <Lock className="mx-auto h-12 w-12 text-primary"/>
            <CardTitle>{translations.reports.upgrade.title}</CardTitle>
            <CardDescription>{translations.reports.upgrade.description}</CardDescription>
        </CardHeader>
        <CardContent>
            <Link href="/pricing" className="w-full">
                <Button className="w-full">{translations.reports.upgrade.button}</Button>
            </Link>
        </CardContent>
    </Card>
  )
}

export default function ReportsPage() {
    const { translations } = useLanguage();
    const { getMealsForDate, loggedMeals } = useMealLog();
    const { settings } = useSettings();
    const { isPro, isTrialActive, startTrial } = useUserAccount();
    const isFeatureAllowed = isPro || isTrialActive;

    useEffect(() => {
        if (!isPro) {
            startTrial();
        }
    }, [isPro, startTrial]);

    const todaysMeals = getMealsForDate(new Date());

    const totals = useMemo(() => {
        return todaysMeals.reduce((acc, meal) => {
            acc.calories += meal.calories;
            acc.protein += meal.protein;
            acc.carbs += meal.carbs;
            acc.fats += meal.fats;
            acc.sugar += meal.sugar;
            acc.sodium += meal.sodium;
            acc.potassium += meal.potassium;
            acc.calcium += meal.calcium;
            acc.iron += meal.iron;
            acc.vitaminC += meal.vitaminC;
            return acc;
        }, { calories: 0, protein: 0, carbs: 0, fats: 0, sugar: 0, sodium: 0, potassium: 0, calcium: 0, iron: 0, vitaminC: 0 });
      }, [todaysMeals]);
      
      const goals = useMemo(() => ({
        calories: parseFloat(settings.goals.macros.calories) || 2000,
        protein: parseFloat(settings.goals.macros.protein) || 120,
        carbs: parseFloat(settings.goals.macros.carbs) || 250,
        fats: parseFloat(settings.goals.macros.fats) || 70,
      }), [settings.goals.macros]);
    
      const microGoals = useMemo(() => ({
        sugar: parseFloat(settings.goals.micros.sugar) || 50,
        sodium: parseFloat(settings.goals.micros.sodium) || 2300,
        potassium: parseFloat(settings.goals.micros.potassium) || 3500,
        calcium: parseFloat(settings.goals.micros.calcium) || 1000,
        iron: parseFloat(settings.goals.micros.iron) || 18,
        vitaminC: parseFloat(settings.goals.micros.vitaminC) || 90,
      }), [settings.goals.micros]);

    const streakDays = useMemo(() => {
        if (loggedMeals.length === 0) return 0;

        const uniqueLogDays = [...new Set(loggedMeals.map(meal => meal.date.split('T')[0]))].sort().reverse();
        
        let streak = 0;
        let today = new Date();
        
        const hasLogToday = uniqueLogDays.some(d => isSameDay(new Date(d), today));
        if (!hasLogToday) {
            today = subDays(today, 1);
        }

        for (let i = 0; i < uniqueLogDays.length; i++) {
            const logDate = new Date(uniqueLogDays[i]);
            const expectedDate = subDays(today, streak);
            if (isSameDay(logDate, expectedDate)) {
                streak++;
            } else {
                break;
            }
        }
        return streak;
    }, [loggedMeals]);

    const weeklyData = useMemo(() => {
        const today = new Date();
        const last7Days = eachDayOfInterval({ start: subDays(today, 6), end: today });
        return last7Days.map(day => {
            const mealsOnDay = loggedMeals.filter(meal => isSameDay(new Date(meal.date), day));
            const totalCalories = mealsOnDay.reduce((sum, meal) => sum + meal.calories, 0);
            return {
                day: format(day, 'E'), 
                value: totalCalories
            }
        });
    }, [loggedMeals]);

     const monthlyData = useMemo(() => {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const weeks = [];
        let currentDay = startOfMonth;

        while(currentDay.getMonth() === today.getMonth()) {
            const weekEnd = new Date(currentDay);
            weekEnd.setDate(currentDay.getDate() + 6);
            const weekNumber = Math.ceil(currentDay.getDate() / 7);

            const mealsInWeek = loggedMeals.filter(meal => {
                const mealDate = new Date(meal.date);
                return mealDate >= currentDay && mealDate <= weekEnd;
            });
            const totalCalories = mealsInWeek.reduce((sum, meal) => sum + meal.calories, 0);
            
            weeks.push({
                week: `${translations.reports.weeks.w}${weekNumber}`,
                value: totalCalories,
            });

            currentDay.setDate(currentDay.getDate() + 7);
        }
        return weeks;
    }, [loggedMeals, translations]);

    const handleShare = () => {
        const macrosTitle = translations.dashboard.macros.title.toUpperCase();
        const microsTitle = translations.dashboard.micros.title.toUpperCase();

        const message = `📊 *My Daily Nutrition Summary*

*${macrosTitle}*
🔥 ${translations.dashboard.macros.calories}: ${totals.calories.toFixed(0)} / ${goals.calories} kcal
💪 ${translations.dashboard.macros.protein}: ${totals.protein.toFixed(0)} / ${goals.protein}g
🍞 ${translations.dashboard.macros.carbs}: ${totals.carbs.toFixed(0)} / ${goals.carbs}g
🥑 ${translations.dashboard.macros.fats}: ${totals.fats.toFixed(0)} / ${goals.fats}g

*${microsTitle}*
🍯 ${translations.dashboard.micros.sugar}: ${totals.sugar.toFixed(1)} / ${microGoals.sugar}g
🧂 ${translations.dashboard.micros.sodium}: ${totals.sodium.toFixed(0)} / ${microGoals.sodium}mg
🍌 ${translations.dashboard.micros.potassium}: ${totals.potassium.toFixed(0)} / ${microGoals.potassium}mg
🦴 ${translations.dashboard.micros.calcium}: ${totals.calcium.toFixed(0)} / ${microGoals.calcium}mg
⚡ ${translations.dashboard.micros.iron}: ${totals.iron.toFixed(1)} / ${microGoals.iron}mg
🍊 ${translations.dashboard.micros.vitaminC}: ${totals.vitaminC.toFixed(1)} / ${microGoals.vitaminC}mg

📱 Tracked with ${translations.appName} - Your AI nutrition companion! 🤖✨`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">{translations.reports.title}</h1>
          <p className="text-muted-foreground mt-2">
            {translations.reports.subtitle}
          </p>
        </div>
        
        {!isFeatureAllowed ? <UpgradePrompt /> : (
            <>
                <Card className="w-full max-w-sm mx-auto">
                    <CardHeader className="text-center">
                        <CardTitle>{translations.reports.streak.title}</CardTitle>
                        <CardDescription>{translations.reports.streak.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center gap-2">
                         <Flame className="h-16 w-16 text-primary" />
                         <p className="text-6xl font-bold">{streakDays}</p>
                         <p className="text-muted-foreground">{translations.reports.streak.unit}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>{translations.reports.consistency.title}</CardTitle>
                        <CardDescription>{translations.reports.consistency.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="weekly" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="weekly">{translations.reports.consistency.weekly}</TabsTrigger>
                                <TabsTrigger value="monthly">{translations.reports.consistency.monthly}</TabsTrigger>
                            </TabsList>
                            <TabsContent value="weekly">
                                <ProgressChart data={weeklyData} dataKey="value" categoryKey="day" />
                            </TabsContent>
                            <TabsContent value="monthly">
                                 <ProgressChart data={monthlyData} dataKey="value" categoryKey="week" />
                            </TabsContent>
                        </Tabs>
                         <div className="mt-6 flex justify-center">
                            <Button variant="outline" onClick={handleShare}>{translations.reports.share.button}</Button>
                        </div>
                    </CardContent>
                </Card>
            </>
        )}


      </div>
    </main>
  );
}
