"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ssms/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, TooltipProps } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { $dashboard } from "@ssms/lib/rpcClient";

// Define the shape of our data
interface CategoryData {
  name: string;
  value: number;
  color: string;
}

// Props for our component
interface TicketCategoryChartProps {
  //   data?: CategoryData[];
  title?: string;
  description?: string;
}

// Define props for custom components
interface CustomTooltipProps extends TooltipProps<number, string> {
  total: number;
}

interface CustomLegendProps {
  payload?: Array<{
    value: string;
    color: string;
    payload: CategoryData;
  }>;
  total: number;
}

const TicketCategoryChart: React.FC<TicketCategoryChartProps> = ({
  title = "Tickets by Category",
  description = "Distribution of support tickets across categories",
}) => {
  const { data } = useQuery({
    queryKey: ["get-tickets-by-category"],
    queryFn: async () => {
      const res = await $dashboard["ticket-categories"].$get();
      const ticketsByCategory = await res.json();

      if (!res.ok) {
        throw ticketsByCategory;
      }

      return ticketsByCategory;
    },
  });

  if (data) {
    const total = data?.reduce((sum, item) => sum + item.value, 0);

    // Custom tooltip component
    const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, total }) => {
      if (active && payload && payload.length > 0) {
        const item = payload[0];
        const itemValue = item.value as number;
        const percentage = ((itemValue / total) * 100).toFixed(1);
        return (
          <div className="p-2 bg-background border rounded-md shadow-sm">
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-muted-foreground">
              {itemValue} tickets ({percentage}%)
            </p>
          </div>
        );
      }
      return null;
    };

    // Custom legend component
    const CustomLegend: React.FC<CustomLegendProps> = ({ payload, total }) => {
      if (!payload) return null;

      return (
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          {payload.map((entry, index) => {
            const percentage = ((entry.payload.value / total) * 100).toFixed(1);
            return (
              <div key={`legend-${index}`} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
                <span className="text-sm">{entry.value}</span>
                <span className="text-sm text-muted-foreground ml-1">({percentage}%)</span>
              </div>
            );
          })}
        </div>
      );
    };

    // Find top category
    const getTopCategory = (): string => {
      if (data?.length === 0) return "None";
      return [...data].sort((a, b) => b.value - a.value)[0].name ?? "";
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip total={total} />} />
                <Legend content={<CustomLegend total={total} />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Total Tickets</div>
              <div className="text-2xl font-bold">{total}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Top Category</div>
              <div className="text-2xl font-bold">{getTopCategory()}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
};

export default TicketCategoryChart;
