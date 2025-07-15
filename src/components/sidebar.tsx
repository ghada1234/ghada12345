
"use client";

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
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

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

export function Sidebar({ isSheet = false }: { isSheet?: boolean }) {
  const { translations } = useLanguage();

  return (
    <div className={cn("border-r bg-muted/40 w-64 flex-col h-full", isSheet ? "flex" : "hidden md:flex")}>
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="">NutriSnap</span>
        </Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          <NavLink href="/" icon={<Home className="h-4 w-4" />} label={translations.sidebar.home} />
          <NavLink
            href="/dashboard"
            icon={<LayoutGrid className="h-4 w-4" />}
            label={translations.sidebar.dashboard}
          />
          <NavLink
            href="/add-food"
            icon={<PlusCircle className="h-4 w-4" />}
            label={translations.sidebar.add_food}
          />
          <NavLink
            href="/meal-planner"
            icon={<Calendar className="h-4 w-4" />}
            label={translations.sidebar.meal_planner}
          />
          <NavLink
            href="/reports"
            icon={<BarChart className="h-4 w-4" />}
            label={translations.sidebar.reports}
          />
          <NavLink
            href="/settings"
            icon={<Settings className="h-4 w-4" />}
            label={translations.sidebar.settings}
          />
          <NavLink
            href="/feedback"
            icon={<MessageSquare className="h-4 w-4" />}
            label={translations.sidebar.feedback}
          />
          <NavLink
            href="/about"
            icon={<Info className="h-4 w-4" />}
            label={translations.sidebar.about}
          />
        </nav>
      </div>
    </div>
  );
}
