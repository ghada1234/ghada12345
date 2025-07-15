import { DashboardHeader } from "@/components/dashboard-header";
import { UserProfileCard } from "@/components/user-profile-card";
import { DailyMacros } from "@/components/daily-macros";
import { WeeklyProgressChart } from "@/components/weekly-progress-chart";
import { RecipeSuggester } from "@/components/recipe-suggester";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background">
      <DashboardHeader />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <UserProfileCard />
            <DailyMacros />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <RecipeSuggester />
            <WeeklyProgressChart />
          </div>
        </div>
      </main>
    </div>
  );
}
