"use client";

import { DataTable } from "@ssms/components/ui/data-table/data-table";
import { $tickets } from "@ssms/lib/rpcClient";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent, useEffect, useState } from "react";
import { MutatedTickets, useTicketsColumns } from "./columns";
import { useDateFilter } from "@ssms/components/stores/useDateFilter";
import { useUserSession } from "@ssms/components/stores/useUserSession";

export const TicketsDataTable: FunctionComponent = () => {
  const dateFilter = useDateFilter((state) => state.dateRange);

  const session = useUserSession((state) => state.userSession);

  const [loading, setLoading] = useState(false);

  const { data: tickets, isPending: ticketsLoading } = useQuery({
    queryKey: ["get-all-tickets", dateFilter?.from, dateFilter?.to],
    queryFn: async () => {
      if (!session) return [];

      if (session.user.role === "support") {
        const res = await $tickets.range.$get({
          query: {
            from: dateFilter?.from,
            to: dateFilter?.to,
          },
        });

        const tickets = await res.json();

        if (!res.ok) {
          throw tickets;
        }

        return tickets as MutatedTickets[];
      } else {
        const res = await $tickets.user[":id"].$get({
          param: { id: session.user.id },
        });

        const tickets = await res.json();

        if (!res.ok) {
          throw tickets;
        }

        return tickets;
      }
    },
    enabled: !!session?.session,
  });

  const ticketsColumns = useTicketsColumns(tickets);

  useEffect(() => {
    if (ticketsLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [ticketsLoading]);

  // Instead of conditionally rendering different DataTable instances,
  // render a single instance with proper props
  // return <DataTable data={tickets ?? []} columns={ticketsColumns} loading={isLoading} />;
  return <DataTable data={tickets ?? []} columns={ticketsColumns} loading={loading} />;
};
