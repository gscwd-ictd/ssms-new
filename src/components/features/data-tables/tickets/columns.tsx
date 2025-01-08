import { DataTableColumnHeader } from "@ssms/components/ui/data-table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";

type MutatedTickets = {
  requestedBy: string;
  assignedTo: string | null;
  details: string;
  status: string;
  createdAt: string;
  updatedAt: string | null;
};

export const ticketsColumns: ColumnDef<MutatedTickets>[] = [
  {
    accessorKey: "requestedBy",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Requested by" />,
    cell: ({ row }) => <div>{row.getValue("requestedBy")}</div>,
    enableHiding: false,
  },
  {
    accessorKey: "details",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Details" />,
    cell: ({ row }) => <div>{row.getValue("details")}</div>,
    enableHiding: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "assignedTo",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Assigned to" />,
    cell: ({ row }) => <div>{row.getValue("assignedTo")}</div>,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    accessorFn: (row) => <>{row.createdAt ? formatDistanceToNow(row.createdAt, { addSuffix: true }) : ""}</>,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created at" />,
    cell: ({ row }) => <div>{row.getValue("createdAt")}</div>,
    sortingFn: "datetime",
    enableSorting: true,
    enableHiding: false,
    enableColumnFilter: false,
  },
];
