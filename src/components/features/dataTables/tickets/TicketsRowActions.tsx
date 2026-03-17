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
import Link from "next/link";

type TicketsRowActionsProps = {
  ticketId: string;
};

export const TicketsRowActions: FunctionComponent<TicketsRowActionsProps> = ({ ticketId }) => {
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
          <Link href={`/tickets/${ticketId}`} target="_blank">
            View Details
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem>Assign Ticket</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
