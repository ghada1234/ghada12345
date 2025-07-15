import Link from 'next/link';
import {
  ArrowRight,
  Camera,
  ScanBarcode,
  Sparkles,
  Heart,
  Users,
  Languages,
  Leaf,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { DashboardHeader } from '@/components/dashboard-header';

export default function LandingPage() {
  return (
    <>
      <DashboardHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted/20">
          <div className="container px-4 md:px-6 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                Instant Nutritional Analysis at Your Fingertips
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                The smart way to track your nutrition. Snap a photo or describe your meal to get an instant, AI-powered
                nutritional analysis. Take control of your health today.
              </p>
            </div>
            <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/dashboard">
                <Button size="lg">
                  Get Started Free
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                How It Works
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Achieve your health goals in three simple steps.
                </h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Camera />
                </div>
                <h3 className="text-lg font-bold">1. Snap or Describe</h3>
                <p className="text-sm text-muted-foreground">
                  Take a picture of your meal, scan a barcode, or simply type in what you ate.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Sparkles />
                </div>
                <h3 className="text-lg font-bold">2. AI Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Our advanced AI instantly analyzes the food and provides a detailed nutritional breakdown.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                 <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <CheckCircle />
                </div>
                <h3 className="text-lg font-bold">3. Track & Improve</h3>
                <p className="text-sm text-muted-foreground">
                  Log your meals, track your progress against your goals, and get smart suggestions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">All-In-One Wellness Tracker</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to understand and improve your diet.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3 mt-12">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold flex items-center gap-2"><Leaf className="text-primary"/>Personalized Meal Plans</h3>
                <p className="text-sm text-muted-foreground">
                  Get AI-generated meal plans tailored to your goals, preferences, and allergies.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold flex items-center gap-2"><Sparkles className="text-primary"/>Track Your Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Visualize your nutritional intake with daily, weekly, and monthly reports.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold flex items-center gap-2"><ScanBarcode className="text-primary"/>Barcode Scanner</h3>
                <p className="text-sm text-muted-foreground">
                  Quickly log packaged foods by scanning the barcode with your phone's camera.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold flex items-center gap-2"><Sparkles className="text-primary"/>Extensive Food Database</h3>
                <p className="text-sm text-muted-foreground">
                  Access nutritional info for millions of food items, including international cuisines.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold flex items-center gap-2"><Users className="text-primary"/>Community & Support</h3>
                <p className="text-sm text-muted-foreground">
                  Share your progress and get motivated with our community features.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold flex items-center gap-2"><Languages className="text-primary"/>Multi-language Support</h3>
                <p className="text-sm text-muted-foreground">
                  Available in both English and Arabic, with culturally-aware food analysis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Loved by Users Worldwide</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Don't just take our word for it. Here's what our users have to say.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 pt-12 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                    <p className="text-lg font-semibold">“excellent app”</p>
                </CardContent>
                <CardFooter className="flex items-center gap-4 p-6 pt-0">
                  <Avatar>
                    <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="woman" alt="ghada rabee" />
                    <AvatarFallback>GR</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">ghada rabee</div>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p>“NutriSnap has revolutionized how I track my meals. The photo analysis is incredibly accurate and saves me so much time!”</p>
                </CardContent>
                <CardFooter className="flex items-center gap-4 p-6 pt-0">
                  <Avatar>
                    <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="woman" alt="Sarah K." />
                    <AvatarFallback>SK</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">Sarah K.</div>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p>“As someone with specific dietary goals, the personalized meal suggestions are a game-changer. The Iraqi dish recognition is a huge plus!”</p>
                </CardContent>
                <CardFooter className="flex items-center gap-4 p-6 pt-0">
                  <Avatar>
                    <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="man" alt="Ahmed M." />
                    <AvatarFallback>AM</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">Ahmed M.</div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have questions? We have answers. If you can't find what you're looking for, feel free to contact us.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl w-full pt-12">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is NutriSnap free to use?</AccordionTrigger>
                  <AccordionContent>
                    Yes, NutriSnap offers a free version with core features like meal logging and basic nutritional analysis. We also have a premium subscription with advanced features like personalized meal plans, detailed reports, and priority support.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How accurate is the nutritional analysis?</AccordionTrigger>
                  <AccordionContent>
                    Our AI is trained on a massive database of food items and provides highly accurate estimates. While it's a powerful tool for guidance, for medical purposes, you should always consult with a registered dietitian or doctor.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I use NutriSnap for special diets like keto or vegan?</AccordionTrigger>
                  <AccordionContent>
                    Absolutely! You can set your dietary preferences, including keto, vegan, vegetarian, gluten-free, and more. The app will tailor its analysis and suggestions to fit your specific needs.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Does the app work for non-Western cuisines?</AccordionTrigger>
                  <AccordionContent>
                    Yes. We've put a special emphasis on supporting a wide range of international cuisines, including culturally-aware analysis for Middle Eastern, Asian, and other global foods.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        <footer className="bg-muted/60 py-8 mt-12">
          <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-2">
                  <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
                      <Leaf className="h-6 w-6 text-primary" />
                      <span className="font-bold text-lg">NutriSnap</span>
                  </Link>
                  <p className="text-sm text-muted-foreground">Your AI-powered companion for smart and simple nutrition tracking.</p>
              </div>
              <div>
                  <h4 className="font-semibold mb-2">Product</h4>
                  <ul className="space-y-1">
                      <li><Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">Features</Link></li>
                      <li><Link href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground">Testimonials</Link></li>
                      <li><Link href="#faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</Link></li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-semibold mb-2">Company</h4>
                  <ul className="space-y-1">
                      <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">About</Link></li>
                      <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Feedback</Link></li>
                  </ul>
              </div>
          </div>
          <div className="container mx-auto px-4 md:px-6 mt-8 text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} NutriSnap. All rights reserved.
          </div>
        </footer>
      </main>
    </>
  );
}
