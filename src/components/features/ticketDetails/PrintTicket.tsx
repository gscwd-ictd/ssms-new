"use client";

import { Button } from "@ssms/components/ui/button";
import { PrinterCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";

type PrintTicketProps = {
  ticketId: string;
};

export const PrintTicket: FunctionComponent<PrintTicketProps> = ({ ticketId }) => {
  const router = useRouter();

  return (
    <Button variant="secondary" onClick={() => router.push(`/tickets/reports/slip/${ticketId}`)}>
      <PrinterCheck />
      <span>Print Ticket</span>
    </Button>
  );
};
