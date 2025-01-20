"use client";

import { DataTable } from "@ssms/components/ui/data-table/data-table";
import { FunctionComponent } from "react";
import { MutatedSubCategory, useSubCategoriesColumns } from "./subCategoriesColumns";
import { useQuery } from "@tanstack/react-query";
import { $subCategories } from "@ssms/lib/rpcClient";

export const SubCategoriesTable: FunctionComponent = () => {
  const { data: subCategories, isPending } = useQuery<MutatedSubCategory[]>({
    queryKey: ["get-all-sub-categories"],
    queryFn: async () => {
      const res = await $subCategories.misc["with-category-name"].$get();

      const subCategories = await res.json();

      if (!res.ok) {
        throw subCategories;
      }

      return subCategories;
    },
  });

  const subCategoriesColumns = useSubCategoriesColumns(subCategories);

  return <DataTable data={subCategories ?? []} columns={subCategoriesColumns} loading={isPending} />;
};
