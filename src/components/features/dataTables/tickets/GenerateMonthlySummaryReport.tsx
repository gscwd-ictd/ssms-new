"use client";

import { useDateFilter } from "@ssms/components/stores/useDateFilter";
import { useUserSession } from "@ssms/components/stores/useUserSession";
import { Button } from "@ssms/components/ui/button";
import { PrinterCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";

export const GenerateMonthlySummaryReport: FunctionComponent = () => {
  const userSession = useUserSession((state) => state.userSession);

  const router = useRouter();

  const { dateRange } = useDateFilter();

  if (userSession?.user.role === "support") {
    return (
      <Button
        variant="secondary"
        onClick={() => {
          router.push(`/tickets/reports/${userSession.user.id}?from=${dateRange?.from}&to=${dateRange?.to}`);
        }}
      >
        <PrinterCheck className="text-indigo-500" />
        <span>Print Report</span>
      </Button>
    );
  }
};
