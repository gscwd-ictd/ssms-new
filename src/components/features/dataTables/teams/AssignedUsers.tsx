"use client";

import { $teams } from "@ssms/lib/rpcClient";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";
import { StackedAvatars } from "@ssms/components/ui/stacked-avatar";

type AssignedUsersProps = {
  teamId: string;
};

export const AssignedUsers: FunctionComponent<AssignedUsersProps> = ({ teamId }) => {
  const { data: assignedUsers } = useQuery({
    queryKey: ["get-assigned-users-by-team-id", teamId],
    queryFn: async () => {
      const res = await $teams["team-assignments"][":id"].$get({ param: { id: teamId } });

      const assignedUsers = await res.json();

      if (!res.ok) {
        throw assignedUsers;
      }

      return assignedUsers;
    },
    enabled: !!teamId,
  });

  return <StackedAvatars users={assignedUsers ?? []} limit={5} />;
};
