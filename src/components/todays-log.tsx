import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { MealEntry } from "./meal-entry";

export function TodaysLog() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Log</CardTitle>
      </CardHeader>
      <CardContent className="text-center text-muted-foreground space-y-4 py-12">
        <p>No food logged yet</p>
        <p>Let's log your first meal to get started!</p>
        <MealEntry />
      </CardContent>
    </Card>
  );
}
