"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@ssms/components/ui/avatar";
import { Badge } from "@ssms/components/ui/badge";
import { DataTableColumnHeader } from "@ssms/components/ui/data-table/data-table-column-header";
import { $users } from "@ssms/lib/rpcClient";
import { ColumnDef } from "@tanstack/react-table";
import { InferResponseType } from "hono";
import { useEffect, useState } from "react";

type MutatedUsers = InferResponseType<typeof $users.index.$get>;

export const useUserDataTableColumns = (data: InferResponseType<typeof $users.index.$get> | undefined) => {
  const [usersColumns, setUsersColumns] = useState<ColumnDef<MutatedUsers[number]>[]>([]);

  useEffect(() => {
    const cols: ColumnDef<MutatedUsers[number]>[] = [
      {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Full name" />,
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar className="h-7 w-7">
              <AvatarImage src={row.original.image!} className="object-cover" />
              <AvatarFallback className="font-semibold text-lg">{row.original.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-semibold">{row.original.name}</span>
          </div>
        ),
        enableHiding: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "role",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
        cell: ({ row }) => <Badge variant="outline">{row.original.role}</Badge>,
        enableHiding: false,
      },
      {
        accessorKey: "office",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Office" />,
        cell: ({ row }) => row.original.office,
        enableHiding: true,
      },
      {
        accessorKey: "department",
        accessorFn: (row) => (row.department === null ? "None" : row.department),
        header: ({ column }) => <DataTableColumnHeader column={column} title="Department" />,
        cell: ({ row }) =>
          row.original.department ? (
            <>{row.original.department}</>
          ) : (
            <span className="text-muted-foreground">None</span>
          ),
        enableHiding: true,
      },
      {
        accessorKey: "division",
        accessorFn: (row) => (row.division === null ? "None" : row.division),
        header: ({ column }) => <DataTableColumnHeader column={column} title="Division" />,
        cell: ({ row }) =>
          row.original.division ? (
            <>{row.original.division}</>
          ) : (
            <span className="text-muted-foreground">None</span>
          ),
        enableHiding: true,
      },
    ];

    setUsersColumns(cols);
  }, [data]);

  return usersColumns;
};
