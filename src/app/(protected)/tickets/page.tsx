"use client";

import { AddTicketDialog } from "@ssms/components/features/addTicket/AddTicketDialog";
import { TicketsDataTable } from "@ssms/components/features/dataTables/tickets/TicketsDataTable";

export default function Tickets() {
  return (
    <div className="flex flex-col gap-2">
      <header className="py-7 flex items-center justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">Tickets</h1>
        <AddTicketDialog />
      </header>

      <main>
        <TicketsDataTable />
      </main>
    </div>
  );
}
