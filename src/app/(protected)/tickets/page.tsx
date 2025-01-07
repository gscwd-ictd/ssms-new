"use client";

import { columns } from "@ssms/components/ui/data-table/columns";
import { DataTable } from "@ssms/components/ui/data-table/data-table";
import tasks from "@ssms/components/ui/data-table/data/tasks.json";
import { $tickets } from "@ssms/lib/rpcClient";

import { useQuery } from "@tanstack/react-query";

export default function Tickets() {
  const { data } = useQuery({
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

  console.log("rendered", data);

  return (
    <div>
      <DataTable data={tasks} columns={columns} />
    </div>
  );
}
