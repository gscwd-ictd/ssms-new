"use client";

import { DataTable } from "@ssms/components/ui/data-table/data-table";
import { $teams } from "@ssms/lib/rpcClient";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";
import { useTeamsColumns } from "./teamsColumns";

export const TeamsDataTable: FunctionComponent = () => {
  const { data: teams, isPending } = useQuery({
    queryKey: ["get-all-teams"],
    queryFn: async () => {
      const res = await $teams.index.$get();

      const teams = await res.json();

      if (!res.ok) {
        throw teams;
      }

      return teams;
    },
  });

  const teamsColumns = useTeamsColumns(teams);

  return <DataTable data={teams ?? []} columns={teamsColumns} loading={isPending} />;
};
