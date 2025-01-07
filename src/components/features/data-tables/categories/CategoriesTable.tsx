"use client";

import { DataTable } from "@ssms/components/ui/data-table/data-table";
import { FunctionComponent } from "react";
import { subCategoriesColumns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { $subCategories } from "@ssms/lib/rpcClient";

export const CategoriesTable: FunctionComponent = () => {
  const { data: categories } = useQuery({
    queryKey: ["get-all-categories"],
    queryFn: async () => {
      const res = await $subCategories.index.$get();

      const subCategories = await res.json();

      if (!res.ok) {
        throw subCategories;
      }

      return subCategories;
    },
  });

  if (categories) {
    return <DataTable data={categories} columns={subCategoriesColumns} />;
  }
};
