"use client";

import { FunctionComponent } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@ssms/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ssms/components/ui/dropdown-menu";
import { AddMemberDialog } from "../../teams/AddMemberDialog";
import { AddTeamCategoryDialog } from "../../teams/AddTeamCategoryDialog";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

type TeamsRowActionsProps = {
  teamId: string;
};

export const TeamsRowActions: FunctionComponent<TeamsRowActionsProps> = ({ teamId }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem asChild>
          <AddMemberDialog teamId={teamId} />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <AddTeamCategoryDialog teamId={teamId} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
