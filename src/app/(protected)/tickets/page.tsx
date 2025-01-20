import { AddTicketDialog } from "@ssms/components/features/addTicket/AddTicketDialog";
import { TicketsDataTable } from "@ssms/components/features/dataTables/tickets/TicketsDataTable";
import { DateRangeFilter } from "@ssms/components/features/ticketDetails/DateRangeFilter";
import { Button } from "@ssms/components/ui/button";
import { PrinterCheck } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tickets",
};

export default function Tickets() {
  return (
    <div className="flex flex-col">
      <header className="pb-4 flex items-center justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">Tickets</h1>
        <div className="flex items-center gap-2">
          <DateRangeFilter />
          <AddTicketDialog />
          <Button variant="secondary">
            <PrinterCheck className="text-indigo-500" />
            <span>Print Report</span>
          </Button>
        </div>
      </header>

      <main>
        <TicketsDataTable />
      </main>
    </div>
  );
}
