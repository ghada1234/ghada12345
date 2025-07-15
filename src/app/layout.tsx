
"use client";

import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Sidebar } from '@/components/sidebar';
import { LanguageProvider, useLanguage } from '@/context/language-context';
import { DashboardHeader } from '@/components/dashboard-header';
import { MealLogProvider } from '@/context/meal-log-context';

function SiteBody({ children }: { children: React.ReactNode }) {
  const { language, direction, translations } = useLanguage();

  return (
    <html lang={language} dir={direction} className="light" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <title>{translations.appName}</title>
        <meta name="description" content="Track your nutrition and get AI-powered recipe suggestions." />
        <link rel="icon" href="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M12 22V2'/%3e%3cpath d='M12 2a5 5 0 0 1 5 5v0a5 5 0 0 1-5 5v0a5 5 0 0 1-5-5v0a5 5 0 0 1 5-5v0z'/%3e%3cpath d='M12 12a5 5 0 0 1 5 5v0a5 5 0 0 1-5 5v0a5 5 0 0 1-5-5v0a5 5 0 0 1 5-5v0z'/%3e%3c/svg%3e" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="flex min-h-screen w-full bg-background">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <DashboardHeader />
            {children}
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <MealLogProvider>
        <SiteBody>{children}</SiteBody>
      </MealLogProvider>
    </LanguageProvider>
  );
}
