"use client";

import { Button } from "@ssms/components/ui/button";
import { PrinterCheck } from "lucide-react";
import Link from "next/link";
import { FunctionComponent } from "react";

type PrintTicketProps = {
  ticketId: string;
};

export const PrintTicket: FunctionComponent<PrintTicketProps> = ({ ticketId }) => {
  return (
    <Link href={`/tickets/reports/slip/${ticketId}`} target="_blank">
      <Button variant="secondary">
        <PrinterCheck />
        <span>Print Ticket</span>
      </Button>
    </Link>
  );
};
