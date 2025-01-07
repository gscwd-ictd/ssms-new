"use client";

import { DataTable } from "@ssms/components/ui/data-table/data-table";
import { FunctionComponent } from "react";
import { supportTypesColumns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { $supportTypes } from "@ssms/lib/rpcClient";

export const SupportTypesTable: FunctionComponent = () => {
  const { data: supportTypes } = useQuery({
    queryKey: ["get-all-support-types"],
    queryFn: async () => {
      const res = await $supportTypes.index.$get();

      const supportTypes = await res.json();

      if (!res.ok) {
        throw supportTypes;
      }

      return supportTypes;
    },
  });

  if (supportTypes) {
    return <DataTable data={supportTypes} columns={supportTypesColumns} />;
  }
};
