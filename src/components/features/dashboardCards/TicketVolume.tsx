"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ssms/components/ui/card";
import { $dashboard } from "@ssms/lib/rpcClient";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Line, LineChart } from "recharts";

export const WeeklyTicketVolume: FunctionComponent = () => {
  const { data: dailyTickets } = useQuery({
    queryKey: ["get-weekly-ticket-volume"],
    queryFn: async () => {
      const res = await $dashboard["weekly-ticket-volume"].$get();

      const weeklyVolume = await res.json();

      if (!res.ok) {
        throw weeklyVolume;
      }

      return weeklyVolume;
    },
  });

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Ticket Volume</CardTitle>
        <CardDescription>Daily tickets created vs resolved (current week)</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyTickets}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="date" className="text-sm" />
              <YAxis className="text-sm" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#4f46e5"
                strokeWidth={2}
                name="Created"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="resolved"
                stroke="#16a34a"
                strokeWidth={2}
                name="Resolved"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
