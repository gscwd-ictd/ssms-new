"use client";

import { $users } from "@ssms/lib/rpcClient";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";
import { useUserDataTableColumns } from "./useUserDataTableColumns";
import { DataTable } from "@ssms/components/ui/data-table/data-table";

export const UsersDataTable: FunctionComponent = () => {
  const { data: users, isPending } = useQuery({
    queryKey: ["get-all-users"],
    queryFn: async () => {
      const res = await $users.index.$get();

      const users = await res.json();

      if (!res.ok) {
        throw users;
      }

      return users;
    },
  });

  const usersColumns = useUserDataTableColumns(users);

  return <DataTable data={users ?? []} columns={usersColumns} loading={isPending} />;
};
