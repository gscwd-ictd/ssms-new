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

export const AddTicketDialog: FunctionComponent = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Add Ticket
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add ticket</DialogTitle>
          <DialogDescription>Create a ticket for any IT related issues</DialogDescription>
        </DialogHeader>
        <div>
          <AddTicketForm setDialogOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
