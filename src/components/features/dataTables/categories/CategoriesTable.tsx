"use client";

import { DataTable } from "@ssms/components/ui/data-table/data-table";
import { FunctionComponent } from "react";
import { categoriesColumns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { $categories } from "@ssms/lib/rpcClient";

export const CategoriesTable: FunctionComponent = () => {
  const { data: categories } = useQuery({
    queryKey: ["get-all-categories"],
    queryFn: async () => {
      const res = await $categories.misc.pair.$get();

      const categories = await res.json();

      if (!res.ok) {
        throw categories;
      }

      return categories;
    },
  });

  if (categories) {
    return <DataTable data={categories} columns={categoriesColumns} />;
  }
};
