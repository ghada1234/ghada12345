
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Leaf } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export default function AboutPage() {
  const { translations } = useLanguage();

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <Leaf className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight">{translations.about.title}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            {translations.about.subtitle}
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-center">{translations.about.missionTitle}</h2>
              <p className="text-muted-foreground mb-4">
                {translations.about.missionP1}
              </p>
              <p className="text-muted-foreground mb-4">
                {translations.about.missionP2}
              </p>
              <p className="text-muted-foreground">
                {translations.about.missionP3}
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </main>
  );
}
