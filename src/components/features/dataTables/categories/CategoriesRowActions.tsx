"use client";

import { FunctionComponent } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@ssms/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@ssms/components/ui/button";

type CategoriesRowActionsProps = {
  categoryId: string;
};

export const CategoriesRowActions: FunctionComponent<CategoriesRowActionsProps> = ({ categoryId }) => {
  console.log(`selected category: ${categoryId}`);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Update</DropdownMenuItem>
        {/* <DropdownMenuItem>Favorite</DropdownMenuItem> */}
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
