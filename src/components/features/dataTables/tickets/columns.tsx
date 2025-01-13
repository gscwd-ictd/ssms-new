"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@ssms/components/ui/avatar";
import { DataTableColumnHeader } from "@ssms/components/ui/data-table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { TicketsRowActions } from "./TicketsRowActions";
import { AssignedToColumn } from "./AssignedToColumn";
import { Circle, CircleCheckBig, CircleOff, Clock4 } from "lucide-react";

export type MutatedTickets = {
  id: string;
  requestedBy: string;
  requestedByAvatar: string | null;
  assignedTo: string | null;
  assignedToAvatar: string | null;
  details: string;
  status: string;
  createdAt: string;
  updatedAt: string | null;
};

export const ticketsColumns: ColumnDef<MutatedTickets>[] = [
  {
    accessorKey: "requestedBy",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Requested by" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-7 w-7">
          <AvatarImage src={row.original.requestedByAvatar!} className="object-cover" />
          <AvatarFallback className="font-semibold text-lg">
            {row.original.requestedBy.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <span className="font-semibold">{row.original.requestedBy}</span>
      </div>
    ),
    enableHiding: false,
  },

  {
    accessorKey: "assignedTo",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Assigned to" />,
    cell: ({ row }) => (
      <div>
        <AssignedToColumn row={row} />
      </div>
    ),
    enableHiding: false,
    enableColumnFilter: false,
  },

  {
    accessorKey: "details",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Details" />,
    cell: ({ row }) => <div className="truncate">{row.getValue("details")}</div>,
    enableHiding: true,
    enableColumnFilter: false,
  },

  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        {row.original.status === "open" && <Circle className="w-4 h-4 text-blue-500" />}
        {row.original.status === "cancelled" && <CircleOff className="w-4 h-4 text-rose-500" />}
        {row.original.status === "resolved" && <CircleCheckBig className="w-4 h-4 text-green-500" />}
        {row.original.status === "ongoing" && <Clock4 className="w-4 h-4 text-amber-500" />}
        <span className="capitalize">{row.getValue("status")}</span>
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    accessorFn: (row) => <>{row.createdAt ? formatDistanceToNow(row.createdAt, { addSuffix: true }) : ""}</>,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Requested at" />,
    cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("createdAt")}</div>,
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <TicketsRowActions ticketId={row.original.id} />,
  },
];
