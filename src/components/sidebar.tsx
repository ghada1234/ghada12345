import Link from "next/link";
import {
  Leaf,
  Home,
  LayoutGrid,
  PlusCircle,
  Calendar,
  BarChart,
  Settings,
  MessageSquare,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const NavLink = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <Link href={href}>
    <Button variant="ghost" className="w-full justify-start gap-2">
      {icon}
      {label}
    </Button>
  </Link>
);

export function Sidebar() {
  return (
    <div className="hidden border-r bg-muted/40 md:block w-64">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="">NutriSnap</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <NavLink href="/" icon={<Home className="h-4 w-4" />} label="Home" />
            <NavLink
              href="/dashboard"
              icon={<LayoutGrid className="h-4 w-4" />}
              label="Dashboard"
            />
            <NavLink
              href="/add-food"
              icon={<PlusCircle className="h-4 w-4" />}
              label="Add Food"
            />
            <NavLink
              href="/meal-planner"
              icon={<Calendar className="h-4 w-4" />}
              label="Meal Planner"
            />
            <NavLink
              href="/reports"
              icon={<BarChart className="h-4 w-4" />}
              label="Reports"
            />
            <NavLink
              href="#"
              icon={<Settings className="h-4 w-4" />}
              label="Settings"
            />
          </nav>
        </div>
        <div className="mt-auto p-4">
           <nav className="grid items-start text-sm font-medium">
             <NavLink
              href="#"
              icon={<MessageSquare className="h-4 w-4" />}
              label="Feedback"
            />
             <NavLink
              href="#"
              icon={<Info className="h-4 w-4" />}
              label="About"
            />
           </nav>
        </div>
      </div>
    </div>
  );
}
