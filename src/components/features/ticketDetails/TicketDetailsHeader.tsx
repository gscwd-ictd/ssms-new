"use client";

import { $tickets } from "@ssms/lib/rpcClient";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { FunctionComponent } from "react";

export const TicketDetailsHeader: FunctionComponent = () => {
  const param = useParams<{ id: string }>();

  const { data: ticket } = useQuery({
    queryKey: ["get-ticket-details"],
    queryFn: async () => {
      const res = await $tickets[":id"].$get({
        param: {
          id: param.id,
        },
      });

      const ticket = await res.json();

      if (!res.ok) {
        throw ticket;
      }

      return ticket;
    },
  });

  if (typeof ticket === "object") {
    return (
      <div>
        <header>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight mb-2">{ticket.details}</h1>
        </header>
      </div>
    );
  }
};
