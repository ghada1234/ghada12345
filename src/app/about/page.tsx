
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
          <CardContent className="p-6 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
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
            <div className="rounded-lg overflow-hidden">
                <Image 
                    src="https://placehold.co/600x400.png"
                    data-ai-hint="Iraqi food"
                    alt="Iraqi food" 
                    width={600} 
                    height={400}
                    className="object-cover w-full h-full"
                />
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 border rounded-lg">
            <Sparkles className="mx-auto h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Culturally Intelligent</h3>
            <p className="text-muted-foreground">
              We use cutting-edge AI to provide accurate analysis for diverse, international dishes.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <Users className="mx-auto h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Founder-Led</h3>
            <p className="text-muted-foreground">
              Built by an engineer passionate about solving real-world problems in nutrition.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <Leaf className="mx-auto h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Holistic Wellness</h3>
            <p className="text-muted-foreground">
              Beyond just counting calories, we support your overall health goals and traditions.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
