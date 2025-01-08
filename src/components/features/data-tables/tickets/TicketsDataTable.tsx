"use client";

import { DataTable } from "@ssms/components/ui/data-table/data-table";
import { $tickets } from "@ssms/lib/rpcClient";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";
import { ticketsColumns } from "./columns";

export const TicketsDataTable: FunctionComponent = () => {
  const { data: tickets } = useQuery({
    queryKey: ["get-all-tickets"],
    queryFn: async () => {
      const res = await $tickets.index.$get();

      const tickets = await res.json();

      if (!res.ok) {
        throw tickets;
      }

      console.log(tickets);

      return tickets;
    },
  });

  if (tickets) {
    return <DataTable data={tickets} columns={ticketsColumns} />;
  }
};
