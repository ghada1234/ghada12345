
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Leaf, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <Leaf className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight">About NutriSnap</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A celebration of global cuisine and a commitment to personalized nutrition.
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-center">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                NutriSnap was founded by Ghada Al-Ani, a talented software engineer from Baghdad, Iraq. Growing up with the rich flavors of Iraqi cuisine, she developed a deep appreciation for how food connects us to our heritage.
              </p>
              <p className="text-muted-foreground mb-4">
                While living abroad, she noticed a critical flaw in popular health and wellness apps: they struggled to accurately analyze diverse, international dishes. As an engineer, she saw a technical challenge and an opportunity.
              </p>
              <p className="text-muted-foreground">
                Driven to solve this problem, Ghada leveraged her engineering expertise to create a tool that was both technologically advanced and culturally intelligent. NutriSnap is a celebration of global cuisine and a commitment to making personalized nutrition accessible to everyone, one snap at a time.
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </main>
  );
}
