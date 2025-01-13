"use client";

import { DataTable } from "@ssms/components/ui/data-table/data-table";
import { $tickets } from "@ssms/lib/rpcClient";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent, useEffect, useState } from "react";
import { ticketsColumns } from "./columns";
import { authClient } from "@ssms/lib/authCient";

export const TicketsDataTable: FunctionComponent = () => {
  const [userRole, setUserRole] = useState("");

  const { data: session } = useQuery({
    queryKey: ["get-session-details"],
    queryFn: async () => {
      return (await authClient.getSession()).data;
    },
  });

  const { data: tickets } = useQuery({
    queryKey: ["get-all-tickets"],
    queryFn: async () => {
      if (userRole === "support") {
        const res = await $tickets.index.$get();

        const tickets = await res.json();

        if (!res.ok) {
          throw tickets;
        }

        return tickets;
      } else {
        if (session) {
          const res = await $tickets.user[":id"].$get({ param: { id: session.user.id } });

          const tickets = await res.json();

          if (!res.ok) {
            throw tickets;
          }

          return tickets;
        }
      }
    },
    enabled: userRole !== "",
  });

  useEffect(() => {
    if (session) {
      setUserRole(session.user.role);
    }
  }, [session]);

  if (tickets) {
    return <DataTable data={tickets} columns={ticketsColumns} />;
  }
};
