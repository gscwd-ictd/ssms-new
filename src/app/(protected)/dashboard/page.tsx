"use client";

import SupportDashboard from "@ssms/components/features/dashboardCards/DashboardCard";
import { StatusTrendCard } from "@ssms/components/features/dashboardCards/StatusTrendCard";
import { TicketsProvider } from "@ssms/components/features/dashboardCards/TicketsContext";

export default function Dashboard() {
  return (
    <TicketsProvider>
      <SupportDashboard />
      <StatusTrendCard />
    </TicketsProvider>
  );
}
