"use client";

import { DataTableColumnHeader } from "@ssms/components/ui/data-table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { format, formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { AssignedUsers } from "./AssignedUsers";

type TeamsColumn = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string | null;
};

export const useTeamsColumns = (data: TeamsColumn[] | undefined) => {
  const [teamsColumns, setTeamsColumns] = useState<ColumnDef<TeamsColumn>[]>([]);

  useEffect(() => {
    const cols: ColumnDef<TeamsColumn>[] = [
      {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Team Name" />,
        cell: ({ row }) => row.original.name,
        enableHiding: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "id",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Assigned Users" />,
        cell: ({ row }) => <AssignedUsers teamId={row.original.id} />,
        enableHiding: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "createdAt",
        accessorFn: (row) => <>{format(row.createdAt, "EEEE, MMMM d, yyyy")}</>,
        header: ({ column }) => <DataTableColumnHeader column={column} title="Date Created" />,
        cell: ({ row }) => <div>{row.getValue("createdAt")}</div>,
        enableHiding: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "updatedAt",
        accessorFn: (row) => (
          <>{row.updatedAt ? formatDistanceToNow(row.updatedAt, { addSuffix: true }) : ""}</>
        ),
        header: ({ column }) => <DataTableColumnHeader column={column} title="Last Update" />,
        cell: ({ row }) => <div>{row.getValue("updatedAt")}</div>,
        sortingFn: "datetime",
        enableSorting: true,
        enableHiding: false,
        enableColumnFilter: false,
      },
    ];

    setTeamsColumns(cols);
  }, [data]);

  return teamsColumns;
};
