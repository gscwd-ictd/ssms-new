"use client";

import { FunctionComponent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ssms/components/ui/dialog";
import { Button } from "../../ui/button";
import { AddTicketForm } from "./AddTicketForm";
import { AddTicketFormUser } from "./AddTicketFormUser";
import { FilePlus2 } from "lucide-react";

type AddTicketDialogProps = {
  role: "user" | "support" | null | undefined;
};

export const AddTicketDialog: FunctionComponent<AddTicketDialogProps> = ({ role }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          <FilePlus2 className="text-green-500" />
          <span>Add Ticket</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add ticket</DialogTitle>
          <DialogDescription>Create a ticket for any IT related issues</DialogDescription>
        </DialogHeader>
        {role === "support" && <AddTicketForm setDialogOpen={setOpen} />}
        {role === "user" && <AddTicketFormUser setDialogOpen={setOpen} />}
      </DialogContent>
    </Dialog>
  );
};
