import { Badge } from "@ssms/components/ui/badge";
import { DataTableColumnHeader } from "@ssms/components/ui/data-table/data-table-column-header";
import { categories } from "@ssms/server/db/schemas/tickets";
import { ColumnDef } from "@tanstack/react-table";
import { format, formatDistanceToNow } from "date-fns";

type MutatedCategories = Omit<typeof categories.$inferSelect, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string | null;
};

export const categoriesColumns: ColumnDef<MutatedCategories>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    accessorFn: (row) => <>{!row.description ? <Badge variant="outline">None</Badge> : row.description}</>,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "createdAt",
    accessorFn: (row) => <>{format(row.createdAt, "EEEE, MMMM d, yyyy")}</>,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date Created" />,
    cell: ({ row }) => <div>{row.getValue("createdAt")}</div>,
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "updatedAt",
    accessorFn: (row) => <>{row.updatedAt ? formatDistanceToNow(row.updatedAt, { addSuffix: true }) : ""}</>,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Update" />,
    cell: ({ row }) => <div>{row.getValue("updatedAt")}</div>,
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
  },
];
