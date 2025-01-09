import { Avatar, AvatarFallback, AvatarImage } from "@ssms/components/ui/avatar";
import { Badge } from "@ssms/components/ui/badge";
import { DataTableColumnHeader } from "@ssms/components/ui/data-table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { AcceptTicketBadge } from "./AcceptTicketBadge";
import { ArrowUp } from "lucide-react";
import { TicketsRowActions } from "./TicketsRowActions";

type MutatedTickets = {
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
    accessorKey: "details",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Details" />,
    cell: ({ row }) => <div>{row.getValue("details")}</div>,
    enableHiding: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "assignedTo",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Assigned to" />,
    cell: ({ row }) => (
      <div>
        {!row.getValue("assignedTo") ? (
          <div className="space-x-1">
            <AcceptTicketBadge ticketId={row.original.id} />
            <Badge
              role="button"
              variant="outline"
              className="text-xs space-x-1"
              onClick={() => alert("assigned to someone else!")}
            >
              <ArrowUp className="h-3 w-3" />
              <span className="font-bold">Assign</span>
            </Badge>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Avatar className="h-7 w-7">
              <AvatarImage src={row.original.assignedToAvatar!} className="object-cover" />
              <AvatarFallback className="font-semibold text-lg">
                {row.original.assignedTo?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="font-semibold">{row.original.assignedTo}</span>
          </div>
        )}
      </div>
    ),
    enableHiding: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <span className="capitalize">{row.getValue("status")}</span>,
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    accessorFn: (row) => <>{row.createdAt ? formatDistanceToNow(row.createdAt, { addSuffix: true }) : ""}</>,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Requested at" />,
    cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("createdAt")}</div>,
    sortingFn: "datetime",
    enableSorting: true,
    enableHiding: false,
    enableColumnFilter: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <TicketsRowActions ticketId={row.original.id} />,
  },
];
