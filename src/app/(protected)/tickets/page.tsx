"use client";

import { columns } from "@ssms/components/ui/data-table/columns";
import { DataTable } from "@ssms/components/ui/data-table/data-table";
import tasks from "@ssms/components/ui/data-table/data/tasks.json";

export default function Tickets() {
  return (
    <div>
      <DataTable data={tasks} columns={columns} />
    </div>
  );
}
