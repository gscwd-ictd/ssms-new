"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@ssms/components/ui/card";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { transformMonthlyLoadData } from "@ssms/server/utils/transformMonthlyLoadData";
import { useQuery } from "@tanstack/react-query";
import { useDashboardDateFilter } from "@ssms/components/stores/useDateFilter";
import { $dashboard } from "@ssms/lib/rpcClient";

// Define types
type InputData = {
  month: string;
  category_name: string;
  ticket_count: string;
};

type ChartData = {
  month: string;
  [key: string]: string | number;
};

// Define some colors for different categories
// const categoryColors: { [key: string]: string } = {
//   hardware: "#0ea5e9",
//   software: "#f59e0b",
//   network: "#6366f1",
//   // Add more colors as needed
// };

const BASE_COLORS = [
  "#EB5A3C", // sky-500
  "#DF9755", // blue-500
  "#E7D283", // indigo-500
  "#16C47F", // purple-500
  "#FFD65A", // fuchsia-500
  "#F93827", // green-500
  "#2E5077", // emerald-500
  "#4DA1A9", // teal-500
  "#79D7BE", // amber-500
  "#f97316", // orange-500
  "#fb923c", // orange-400
  "#64748b", // slate-500
  "#0284c7", // sky-600
  "#2563eb", // blue-600
  "#4f46e5", // indigo-600
  "#16a34a", // green-600
  "#059669", // emerald-600
  "#0d9488", // teal-600
  "#7c3aed", // violet-600
  "#9333ea", // purple-600
  "#c026d3", // fuchsia-600
  "#dc2626", // red-600
  "#e11d48", // rose-600
  "#db2777", // pink-600
  "#6b7280", // gray-500
  "#71717a", // zinc-500
];

export function MonthlyTicketLoad() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryColorMap, setCategoryColorMap] = useState<Record<string, string>>({});

  const dateRange = useDashboardDateFilter((state) => state.dateRange);

  const { data: monthlyTicketLoad } = useQuery<InputData[]>({
    queryKey: ["get-monthly-ticket-load", dateRange?.from, dateRange?.to],
    queryFn: async () => {
      const res = await $dashboard["monthly-ticket-load"].$get({
        query: {
          from: dateRange?.from,
          to: dateRange?.to,
        },
      });

      const monthlyTicketLoad = await res.json();

      if (!res.ok) {
        throw monthlyTicketLoad;
      }

      return monthlyTicketLoad;
    },
  });

  useEffect(() => {
    if (monthlyTicketLoad && monthlyTicketLoad.length > 0) {
      // Transform the data
      const transformed = transformMonthlyLoadData(monthlyTicketLoad ?? []);
      setChartData(transformed);

      // Get unique categories
      const uniqueCategories = [
        ...new Set(monthlyTicketLoad.map((item) => item.category_name.toLowerCase())),
      ];
      setCategories(uniqueCategories);

      // Assign colors to categories
      const colorMap = uniqueCategories.reduce((acc, category, index) => {
        // Use modulo to cycle through colors if we have more categories than colors
        acc[category] = BASE_COLORS[index % BASE_COLORS.length];
        return acc;
      }, {} as Record<string, string>);

      setCategoryColorMap(colorMap);
    }
  }, [monthlyTicketLoad]);

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Monthly Ticket Load</CardTitle>
        <CardDescription>Tickets distribution by category</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" className="text-sm" />
              <YAxis className="text-sm" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              {categories.map((category) => (
                <Line
                  key={category}
                  type="monotone"
                  dataKey={category}
                  name={category.charAt(0).toUpperCase() + category.slice(1)}
                  stroke={categoryColorMap[category]}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
