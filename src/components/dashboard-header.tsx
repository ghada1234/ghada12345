
"use client";

import { Leaf, Menu, Globe, LogOut, User, Settings } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Sidebar } from "./sidebar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/context/language-context";
import { useUserAccount } from "@/context/user-account-context";
import { useRouter } from "next/navigation";
import { useSettings } from "@/context/settings-context";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function DashboardHeader() {
  const { translations, setLanguage, direction } = useLanguage();
  const { isAuthenticated, logout } = useUserAccount();
  const { settings } = useSettings();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  }
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 px-4 sm:px-6 lg:px-8 backdrop-blur">
      {isAuthenticated && (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="flex">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side={direction === 'rtl' ? 'right' : 'left'} className="p-0 w-[260px]">
            <Sidebar isSheet={true} />
          </SheetContent>
        </Sheet>
      )}
      <div className="flex items-center gap-2">
        <Leaf className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold text-foreground">{translations.appName}</h1>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Globe className="h-5 w-5" />
              <span className="sr-only">Change language</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setLanguage('en')}>
              {translations.header.english}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('ar')}>
              {translations.header.arabic}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {isAuthenticated ? (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                        <Avatar>
                            <AvatarImage src={settings.profile.avatar || ''} alt={settings.profile.name} data-ai-hint="profile picture"/>
                            <AvatarFallback>{getInitials(settings.profile.name)}</AvatarFallback>
                        </Avatar>
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                         <Link href="/profile">
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                         </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ) : (
          <>
            <Link href="/login" passHref>
              <Button variant="outline">{translations.header.login}</Button>
            </Link>
            <Link href="/signup" passHref>
              <Button>{translations.header.signup}</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
