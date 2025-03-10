"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ssms/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ssms/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { $dashboard } from "@ssms/lib/rpcClient";

interface TicketCount {
  name: string;
  count: number;
  color: string;
}

interface OrgTicketsChartProps {
  title?: string;
  description?: string;
}

const OrgTicketsChart: React.FC<OrgTicketsChartProps> = ({
  title = "Tickets by Organization",
  description = "Ticket distribution across departments, offices, and divisions",
}) => {
  const [activeTab, setActiveTab] = useState<"department" | "office" | "division">("division");

  const { data: orgData = [] } = useQuery({
    queryKey: ["get-tickets-by-org", activeTab],
    queryFn: async () => {
      const res = await $dashboard["tickets-by-org"].$get({
        query: {
          org: activeTab,
        },
      });

      const orgResult = await res.json();

      if (!res.ok) {
        throw orgResult;
      }

      return orgResult as TicketCount[];
    },
    enabled: !!activeTab,
  });

  const [sortBy, setSortBy] = useState<"alpha" | "count">("count");

  // Sort function for the data
  const sortData = (data: TicketCount[]) => {
    const sortedData = [...data];
    if (sortBy === "alpha") {
      return sortedData.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return sortedData.sort((a, b) => b.count - a.count);
    }
  };

  // Custom tooltip
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border rounded-md shadow-sm">
          <p className="font-medium">{label}</p>
          <p className="text-sm">
            <span className="text-muted-foreground">Tickets: </span>
            <span className="font-medium">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Function to truncate long names
  const shortenName = (name: string, maxLength: number = 20) => {
    if (name.length <= maxLength) return name;
    return name.substring(0, maxLength - 3) + "...";
  };

  // Custom tick formatter for Y axis
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderYAxisTick = (props: any) => {
    const { x, y, payload } = props;
    const shortenedText = shortenName(payload.value);

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={-10}
          y={0}
          dy={3}
          textAnchor="end"
          fill="#666"
          fontSize={12}
          //@ts-expect-error this is not properly typed
          title={payload.value} // Original text as tooltip
        >
          {shortenedText}
        </text>
      </g>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Tabs
              value={sortBy}
              onValueChange={(value) => setSortBy(value as "alpha" | "count")}
              className="w-[200px]"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="count">Count</TabsTrigger>
                <TabsTrigger value="alpha">Name</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "department" | "office" | "division")}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="department">Department</TabsTrigger>
            <TabsTrigger value="office">Office</TabsTrigger>
            <TabsTrigger value="division">Division</TabsTrigger>
          </TabsList>
          {["department", "office", "division"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={sortData(orgData)}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }} // Increased left margin
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={110} // Fixed width
                      tick={renderYAxisTick} // Custom tick renderer
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" name="Tickets" isAnimationActive={true} animationDuration={1000}>
                      {orgData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">
              {activeTab === "department"
                ? "Total Departments"
                : activeTab === "office"
                ? "Total Offices"
                : "Total Divisions"}
            </div>
            <div className="text-2xl font-bold">{orgData.length}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Total Tickets</div>
            <div className="text-2xl font-bold">{orgData.reduce((sum, item) => sum + item.count, 0)}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Average per {activeTab}</div>
            <div className="text-2xl font-bold">
              {orgData.length
                ? Math.round(orgData.reduce((sum, item) => sum + item.count, 0) / orgData.length)
                : 0}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrgTicketsChart;
