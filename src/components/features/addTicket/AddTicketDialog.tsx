"use client";

import { FunctionComponent } from "react";
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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Add Ticket</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add ticket</DialogTitle>
          <DialogDescription>Request support for any IT related issues</DialogDescription>
        </DialogHeader>
        <div>
          <AddTicketForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};
