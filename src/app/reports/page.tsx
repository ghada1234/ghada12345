
"use client";

import { useState, useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { useLanguage } from "@/context/language-context";
import { useMealLog } from "@/context/meal-log-context";
import { subDays, format, eachDayOfInterval, isSameDay } from "date-fns";

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

export default function ReportsPage() {
    const { translations } = useLanguage();
    const { loggedMeals } = useMealLog();

    const streakDays = useMemo(() => {
        if (loggedMeals.length === 0) return 0;

        const uniqueLogDays = [...new Set(loggedMeals.map(meal => meal.date.split('T')[0]))].sort().reverse();
        
        let streak = 0;
        let today = new Date();
        
        // If there's a log today, start streak from today. Otherwise, start from yesterday.
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
                day: format(day, 'E'), // e.g., 'Mon'
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
        const message = translations.reports.share.message.replace("{streak}", streakDays.toString());
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

      </div>
    </main>
  );
}
