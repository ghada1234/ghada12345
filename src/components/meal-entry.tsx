"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { PlusCircle } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export function MealEntry() {
  const { translations } = useLanguage();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" /> {translations.dashboard.todaysLog.addMeal}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{translations.dashboard.mealEntry.title}</SheetTitle>
          <SheetDescription>
            {translations.dashboard.mealEntry.description}
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              {translations.dashboard.mealEntry.meal}
            </Label>
            <Input id="name" placeholder="e.g., Chicken Salad" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="calories" className="text-right">
              {translations.dashboard.mealEntry.calories}
            </Label>
            <Input id="calories" type="number" placeholder="kcal" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="protein" className="text-right">
              {translations.dashboard.mealEntry.protein}
            </Label>
            <Input id="protein" type="number" placeholder="grams" className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="carbs" className="text-right">
              {translations.dashboard.mealEntry.carbs}
            </Label>
            <Input id="carbs" type="number" placeholder="grams" className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fats" className="text-right">
              {translations.dashboard.mealEntry.fats}
            </Label>
            <Input id="fats" type="number" placeholder="grams" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">{translations.dashboard.mealEntry.save}</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
