
"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { useLanguage } from "@/context/language-context";

const chartConfig = {
  value: {
    label: "Progress",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

function ProgressChart({ data, dataKey, categoryKey }: { data: any[], dataKey: string, categoryKey: string }) {
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
                    domain={[0, 100]}
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
    const streakDays = 0;

    const weeklyData = [
        { day: translations.reports.days.mon, value: 85 },
        { day: translations.reports.days.tue, value: 92 },
        { day: translations.reports.days.wed, value: 78 },
        { day: translations.reports.days.thu, value: 88 },
        { day: translations.reports.days.fri, value: 95 },
        { day: translations.reports.days.sat, value: 100 },
        { day: translations.reports.days.sun, value: 60 },
    ];

    const monthlyData = [
        { week: translations.reports.weeks.w1, value: 80 },
        { week: translations.reports.weeks.w2, value: 85 },
        { week: translations.reports.weeks.w3, value: 90 },
        { week: translations.reports.weeks.w4, value: 75 },
    ];

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
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="daily">{translations.reports.consistency.daily}</TabsTrigger>
                        <TabsTrigger value="weekly">{translations.reports.consistency.weekly}</TabsTrigger>
                        <TabsTrigger value="monthly">{translations.reports.consistency.monthly}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="daily" className="flex flex-col items-center justify-center text-center text-muted-foreground py-12">
                         <ProgressChart data={weeklyData} dataKey="value" categoryKey="day" />
                    </TabsContent>
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
