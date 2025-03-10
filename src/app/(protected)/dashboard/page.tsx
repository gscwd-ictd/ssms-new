import { DashboardDateRangeFilter } from "@ssms/components/features/dashboardCards/DashboardDateRangeFilter";
import { MonthlyTicketLoad } from "@ssms/components/features/dashboardCards/MonthlyTicketLoad";
import { StatusCard } from "@ssms/components/features/dashboardCards/StatusCard";
import { TicketAssignment } from "@ssms/components/features/dashboardCards/TicketAssignment";
import TicketCategoryChart from "@ssms/components/features/dashboardCards/TicketCategoryChart";
import { WeeklyTicketVolume } from "@ssms/components/features/dashboardCards/TicketVolume";
import { auth } from "@ssms/lib/auth";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user.role !== "support") {
    redirect("/tickets");
  }

  return (
    <div className="space-y-4 pb-7">
      <div className="pb-4 w-full flex items-center justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">Dashboard</h1>
        <DashboardDateRangeFilter />
      </div>
      <StatusCard />

      <TicketCategoryChart />

      <div className="grid grid-cols-2 gap-4">
        <WeeklyTicketVolume />
        <TicketAssignment />
      </div>

      <MonthlyTicketLoad />
    </div>
  );
}
