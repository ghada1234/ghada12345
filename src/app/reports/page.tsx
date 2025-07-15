
"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const weeklyData = [
  { day: "Mon", value: 85 },
  { day: "Tue", value: 92 },
  { day: "Wed", value: 78 },
  { day: "Thu", value: 88 },
  { day: "Fri", value: 95 },
  { day: "Sat", value: 100 },
  { day: "Sun", value: 60 },
];

const monthlyData = [
    { week: "Week 1", value: 80 },
    { week: "Week 2", value: 85 },
    { week: "Week 3", value: 90 },
    { week: "Week 4", value: 75 },
];


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
    const handleShare = () => {
        const message = `Check out my progress on NutriSnap! I'm on a 0-day streak.`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Progress Reports</h1>
          <p className="text-muted-foreground mt-2">
            Track your nutritional journey and celebrate your progress.
          </p>
        </div>

        <Card className="w-full max-w-sm mx-auto">
            <CardHeader className="text-center">
                <CardTitle>Your Progress Streak</CardTitle>
                <CardDescription>Log your meals every day to build up your streak!</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-2">
                 <Flame className="h-16 w-16 text-primary" />
                 <p className="text-6xl font-bold">0</p>
                 <p className="text-muted-foreground">days</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Consistency Report</CardTitle>
                <CardDescription>How consistently you've logged meals.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="weekly" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="daily">Daily</TabsTrigger>
                        <TabsTrigger value="weekly">Weekly</TabsTrigger>
                        <TabsTrigger value="monthly">Monthly</TabsTrigger>
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
                    <Button variant="outline" onClick={handleShare}>Share Report on WhatsApp</Button>
                </div>
            </CardContent>
        </Card>

      </div>
    </main>
  );
}
