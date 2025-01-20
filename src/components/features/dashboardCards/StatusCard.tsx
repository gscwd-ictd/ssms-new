"use client";

import { useDashboardDateFilter } from "@ssms/components/stores/useDateFilter";
import { Card, CardContent, CardHeader, CardTitle } from "@ssms/components/ui/card";
import { $dashboard } from "@ssms/lib/rpcClient";
import { useQuery } from "@tanstack/react-query";
import { Circle, CircleCheckBig, CircleSlash, Clock2 } from "lucide-react";
import { FunctionComponent } from "react";

export const StatusCard: FunctionComponent = () => {
  const dateRange = useDashboardDateFilter((state) => state.dateRange);

  const { data: open } = useQuery({
    queryKey: ["get-count-for-open", dateRange?.from, dateRange?.to],
    queryFn: async () => {
      const res = await $dashboard.status.$get({
        query: { status: "open", from: dateRange?.from, to: dateRange?.to },
      });

      const openTicketsCount = await res.json();

      if (!res.ok) {
        throw openTicketsCount;
      }

      return openTicketsCount;
    },
  });

  const { data: onGoing } = useQuery({
    queryKey: ["get-count-for-ongoing", dateRange?.from, dateRange?.to],
    queryFn: async () => {
      const res = await $dashboard.status.$get({
        query: { status: "ongoing", from: dateRange?.from, to: dateRange?.to },
      });

      const ongoingTicketsCount = await res.json();

      if (!res.ok) {
        throw ongoingTicketsCount;
      }

      return ongoingTicketsCount;
    },
  });

  const { data: cancelled } = useQuery({
    queryKey: ["get-count-for-cancelled", dateRange?.from, dateRange?.to],
    queryFn: async () => {
      const res = await $dashboard.status.$get({
        query: { status: "cancelled", from: dateRange?.from, to: dateRange?.to },
      });

      const cancelledTicketsCount = await res.json();

      if (!res.ok) {
        throw cancelledTicketsCount;
      }

      return cancelledTicketsCount;
    },
  });

  const { data: resolved } = useQuery({
    queryKey: ["get-count-for-resolved", dateRange?.from, dateRange?.to],
    queryFn: async () => {
      const res = await $dashboard.status.$get({
        query: { status: "resolved", from: dateRange?.from, to: dateRange?.to },
      });

      const resolvedTicketsCount = await res.json();

      if (!res.ok) {
        throw resolvedTicketsCount;
      }

      return resolvedTicketsCount;
    },
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Open</CardTitle>
          <Circle className="h-5 w-5 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{open?.count}</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <span className="ml-1">tickets need attention</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">On Going</CardTitle>
          <Clock2 className="h-5 w-5 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{onGoing?.count}</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <span className="ml-1">currently in progress</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
          <CircleSlash className="h-5 w-5 text-rose-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{cancelled?.count}</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <span className="ml-1">cancelled tickets</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Resolved</CardTitle>
          <CircleCheckBig className="h-5 w-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{resolved?.count}</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <span className="ml-1">completed tickets</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
