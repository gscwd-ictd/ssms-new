"use client";

import { Badge } from "@ssms/components/ui/badge";
import { $teams } from "@ssms/lib/rpcClient";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";

type AssignedCategoriesProps = {
  teamId: string;
};

export const AssignedCategories: FunctionComponent<AssignedCategoriesProps> = ({ teamId }) => {
  const { data: assignedCategories } = useQuery({
    queryKey: ["get-assigned-categories"],
    queryFn: async () => {
      const res = await $teams["assigned-categories"][":id"].$get({
        param: {
          id: teamId,
        },
      });

      const assignedCategories = await res.json();

      if (!res.ok) {
        throw assignedCategories;
      }

      return assignedCategories;
    },
    enabled: !!teamId,
  });

  return assignedCategories?.map((category, index) => (
    <Badge key={index} variant="outline" className="mr-1">
      {category.name}
    </Badge>
  ));
};
