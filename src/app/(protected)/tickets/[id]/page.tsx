"use client";

import { TicketSummary } from "@ssms/components/features/ticketDetails/TicketSummary";
import { $tickets } from "@ssms/lib/rpcClient";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Ticket, TicketTimeline } from "@ssms/components/features/ticketTimeline/TicketTimeline";

export default function TicketDetails() {
  const param = useParams<{ id: string }>();

  const { data: ticket } = useQuery<Ticket>({
    queryKey: ["get-ticket-details", param.id],
    queryFn: async () => {
      const res = await $tickets[":id"].$get({
        param: {
          id: param.id,
        },
      });

      const ticketDetails = await res.json();

      if (!res.ok) {
        throw ticketDetails;
      }

      return ticketDetails;
    },
  });

  return (
    <div className="grid grid-cols-12 gap-20">
      <div className="col-span-8">
        <TicketSummary />
      </div>
      <div className="col-span-4">{ticket && <TicketTimeline ticket={ticket} />}</div>
    </div>
  );
}
