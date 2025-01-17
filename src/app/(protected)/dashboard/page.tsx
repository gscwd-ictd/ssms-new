"use client";

import { TicketsProvider } from "@ssms/components/features/dashboardCards/TicketsContext";

export default function Dashboard() {
  return (
    <TicketsProvider>
      {/* <SupportDashboard />
      <StatusTrendCard /> */}
    </TicketsProvider>
  );
}
