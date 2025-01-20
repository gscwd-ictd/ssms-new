import { TicketSummary } from "@ssms/components/features/ticketDetails/TicketSummary";
import { TicketTimeline } from "@ssms/components/features/ticketTimeline/TicketTimeline";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tickets",
};

export default function TicketDetails() {
  return (
    <div className="grid grid-cols-12 gap-10">
      <div className="col-span-8">
        <TicketSummary />
      </div>
      <div className="col-span-4">
        <TicketTimeline />
      </div>
    </div>
  );
}
