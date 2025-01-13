"use client";

import { AddTicketDialog } from "@ssms/components/features/addTicket/AddTicketDialog";
import { TicketsDataTable } from "@ssms/components/features/dataTables/tickets/TicketsDataTable";
import { useUserSession } from "@ssms/components/stores/useUserSession";

export default function Tickets() {
  const userSession = useUserSession((state) => state.userSession);

  return (
    <div className="flex flex-col gap-2">
      <header className="py-7 flex items-center justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">Tickets</h1>
        <AddTicketDialog role={userSession?.user.role} />
      </header>

      <main>
        <TicketsDataTable />
      </main>
    </div>
  );
}
