"use client";

import { $tickets } from "@ssms/lib/rpcClient";
import { tickets } from "@ssms/server/db/schemas/tickets";
import { useQuery } from "@tanstack/react-query";
import { createContext, FunctionComponent, PropsWithChildren } from "react";

export type Tickets = Array<typeof tickets.$inferSelect>;

export const TicketsContext = createContext<Tickets | undefined>(undefined);

export const TicketsProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { data: tickets } = useQuery<Tickets>({
    queryKey: ["get-all-tickets-for-dashboard"],
    queryFn: async () => {
      const res = await $tickets.index.$get();

      const tickets = await res.json();

      if (!res.ok) {
        throw tickets;
      }

      return tickets;
    },
  });

  return <TicketsContext.Provider value={tickets}>{children}</TicketsContext.Provider>;
};
