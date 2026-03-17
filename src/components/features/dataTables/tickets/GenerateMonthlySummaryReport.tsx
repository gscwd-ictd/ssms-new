"use client";

import { useDateFilter } from "@ssms/components/stores/useDateFilter";
import { useUserSession } from "@ssms/components/stores/useUserSession";
import { Button } from "@ssms/components/ui/button";
import { PrinterCheck } from "lucide-react";
import Link from "next/link";
import { FunctionComponent } from "react";

export const GenerateMonthlySummaryReport: FunctionComponent = () => {
  const userSession = useUserSession((state) => state.userSession);

  const { dateRange } = useDateFilter();

  if (userSession?.user.role === "support") {
    return (
      <Link
        href={`/tickets/reports/${userSession.user.id}?from=${dateRange?.from}&to=${dateRange?.to}`}
        target="_blank"
      >
        <Button variant="secondary">
          <PrinterCheck className="text-indigo-500" />
          <span>Print Report</span>
        </Button>
      </Link>
    );
  }
};
