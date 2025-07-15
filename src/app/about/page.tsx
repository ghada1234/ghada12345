
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
            Your AI-powered companion for smart and simple nutrition tracking.
          </p>
        </div>

        <Card>
          <CardContent className="p-6 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                At NutriSnap, our mission is to empower people to take control of their health through technology. We believe that understanding your diet should be simple, intuitive, and accessible to everyone. By leveraging the power of AI, we turn the complex task of nutritional analysis into a seamless experience.
              </p>
              <p className="text-muted-foreground">
                Whether you're aiming for a specific fitness goal, managing dietary restrictions, or simply want to be more mindful of what you eat, NutriSnap is here to support you on your wellness journey.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden">
                <Image 
                    src="https://placehold.co/600x400.png"
                    data-ai-hint="healthy food"
                    alt="Healthy food" 
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
            <h3 className="text-xl font-semibold mb-2">Innovative Technology</h3>
            <p className="text-muted-foreground">
              We use cutting-edge AI to provide instant, accurate nutritional analysis from a simple photo or description.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <Users className="mx-auto h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">User-Centric Design</h3>
            <p className="text-muted-foreground">
              Our app is designed with you in mind. We prioritize a clean, easy-to-use interface to make tracking a breeze.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <Leaf className="mx-auto h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Holistic Wellness</h3>
            <p className="text-muted-foreground">
              Beyond just counting calories, we provide personalized insights and meal plans to support your overall health goals.
            </p>
          </div>
        </div>

         <Card className="text-center">
            <CardHeader>
                <CardTitle>Join Our Community</CardTitle>
                <CardDescription>
                    Have feedback or an idea? We'd love to hear from you.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">
                    NutriSnap is constantly evolving, and your input is invaluable. Share your thoughts and help us build the future of nutrition.
                </p>
                <Link href="/feedback">
                    <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-md font-semibold">
                        Give Feedback
                    </button>
                </Link>
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
