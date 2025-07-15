import { DashboardHeader } from "@/components/dashboard-header";
import { UserProfileCard } from "@/components/user-profile-card";
import { DailyMacros } from "@/components/daily-macros";
import { WeeklyProgressChart } from "@/components/weekly-progress-chart";
import { RecipeSuggester } from "@/components/recipe-suggester";
import { Sidebar } from "@/components/sidebar";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1">
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
    </div>
  );
}
