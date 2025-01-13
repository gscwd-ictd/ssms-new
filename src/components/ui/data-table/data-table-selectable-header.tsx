import { Table } from "@tanstack/react-table";
import { Checkbox } from "@ssms/components/ui/checkbox";

type DataTbaleSelectableHeaderProps<T> = {
  table: Table<T>;
};

export function DataTableSelectableTableHeader<T>({ table }: DataTbaleSelectableHeaderProps<T>) {
  return (
    <Checkbox
      checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  );
}
