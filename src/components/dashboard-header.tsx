import { Leaf, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Sidebar } from "./sidebar";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 px-4 sm:px-6 lg:px-8 backdrop-blur">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
             <Sidebar />
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex items-center gap-2 md:hidden">
        <Leaf className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold text-foreground">NutriSnap</h1>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Link href="/login" passHref>
          <Button variant="outline">Login</Button>
        </Link>
        <Link href="/signup" passHref>
          <Button>Sign Up</Button>
        </Link>
      </div>
    </header>
  );
}
