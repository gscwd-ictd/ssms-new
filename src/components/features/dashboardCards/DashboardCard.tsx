import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ssms/components/ui/card";
import { Badge } from "@ssms/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { Clock, Users, AlertCircle, CheckCircle2, Timer, TrendingUp, TrendingDown } from "lucide-react";

type Ticket = {
  id: string;
  requestedBy: string;
  requestedByAvatar: string | null;
  requestedByEmail: string;
  assignedToId: string | null;
  assignedToName: string | null;
  assignedToAvatar: string | null;
  assignedToEmail: string | null;
  details: string;
  categoryId: string;
  categoryName: string;
  subCategoryId: string;
  subCategoryName: string;
  supportTypeId: string;
  supportTypeName: string;
  status: "open" | "ongoing" | "resolved" | "cancelled";
  createdAt: string;
  updatedAt: string;
  startedAt: string | null;
  cancelledAt: string | null;
  resolvedAt: string | null;
  cancelledDueTo: string | null;
  action: string | null;
  assessment: string | null;
};

const SupportDashboard = () => {
  const dailyTickets = [
    { date: "Mon", total: 24, resolved: 20 },
    { date: "Tue", total: 30, resolved: 25 },
    { date: "Wed", total: 28, resolved: 22 },
    { date: "Thu", total: 32, resolved: 28 },
    { date: "Fri", total: 26, resolved: 20 },
    { date: "Sat", total: 18, resolved: 15 },
    { date: "Sun", total: 15, resolved: 12 },
  ];

  const categoryDistribution = [
    { name: "Hardware", value: 35 },
    { name: "Software", value: 45 },
    { name: "Network", value: 20 },
  ];

  const supportTypeBreakdown = [
    { type: "Simple", count: 45 },
    { type: "Medium", count: 30 },
    { type: "Complex", count: 25 },
  ];

  // Using shadcn color palette
  const COLORS = ["#0ea5e9", "#f59e0b", "#10b981", "#6366f1"];

  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Tickets</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
              <span className="text-emerald-500">12%</span>
              <span className="ml-1">from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5h</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 text-emerald-500 mr-1" />
              <span className="text-emerald-500">8%</span>
              <span className="ml-1">faster than target</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
              <span className="text-emerald-500">4%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">SLA Compliance</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
              <span className="text-emerald-500">2%</span>
              <span className="ml-1">above target</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Monthly Ticket Load</CardTitle>
          <CardDescription>Tickets distribution by category</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={[
                  { month: "Jan", hardware: 45, software: 60, network: 30 },
                  { month: "Feb", hardware: 50, software: 55, network: 35 },
                  { month: "Mar", hardware: 40, software: 65, network: 25 },
                  { month: "Apr", hardware: 55, software: 50, network: 40 },
                  { month: "May", hardware: 48, software: 58, network: 32 },
                  { month: "Jun", hardware: 52, software: 63, network: 35 },
                ]}
              >
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
                <Line type="monotone" dataKey="hardware" name="Hardware" stroke="#0ea5e9" strokeWidth={2} />
                <Line type="monotone" dataKey="software" name="Software" stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="network" name="Network" stroke="#6366f1" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Monthly Performance Overview</CardTitle>
          <CardDescription>Resolution rates and response times</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={[
                  { month: "Jan", resolutionRate: 92, responseTime: 2.5, sla: 95 },
                  { month: "Feb", resolutionRate: 88, responseTime: 3.0, sla: 93 },
                  { month: "Mar", resolutionRate: 95, responseTime: 2.0, sla: 97 },
                  { month: "Apr", resolutionRate: 90, responseTime: 2.8, sla: 94 },
                  { month: "May", resolutionRate: 93, responseTime: 2.3, sla: 96 },
                  { month: "Jun", resolutionRate: 91, responseTime: 2.6, sla: 95 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-sm" />
                <YAxis yAxisId="left" className="text-sm" />
                <YAxis yAxisId="right" orientation="right" className="text-sm" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="resolutionRate"
                  name="Resolution Rate (%)"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="responseTime"
                  name="Response Time (hrs)"
                  stroke="#f59e0b"
                  strokeWidth={2}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="sla"
                  name="SLA Compliance (%)"
                  stroke="#6366f1"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 pt-4">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-[#0ea5e9]" />
              <span className="text-sm text-muted-foreground">Resolution Rate</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-[#f59e0b]" />
              <span className="text-sm text-muted-foreground">Response Time</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-[#6366f1]" />
              <span className="text-sm text-muted-foreground">SLA Compliance</span>
            </div>
          </div>
        </CardContent>
      </Card> */}

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Ticket Volume</CardTitle>
            <CardDescription>Daily tickets created vs resolved</CardDescription>
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
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    name="Created"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="resolved"
                    stroke="hsl(var(--secondary))"
                    strokeWidth={2}
                    name="Resolved"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
            <CardDescription>Tickets by category</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="hsl(var(--primary))"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryDistribution.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.5rem",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 pt-4">
              {categoryDistribution.map((entry, index) => (
                <div key={entry.name} className="flex items-center space-x-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-muted-foreground">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Support Type Breakdown</CardTitle>
            <CardDescription>Distribution by complexity</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={supportTypeBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="type" className="text-sm" />
                  <YAxis className="text-sm" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>SLA Breaches</CardTitle>
            <CardDescription>Tickets requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">TICKET-123{item}</p>
                    <p className="text-sm text-muted-foreground">Hardware Issue - Printer</p>
                  </div>
                  <Badge variant="destructive" className="ml-auto">
                    2h overdue
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Monthly Resolution Time</CardTitle>
            <CardDescription>Average time to resolve tickets per month</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { month: "Jan", simple: 4, medium: 8, complex: 24 },
                    { month: "Feb", simple: 3, medium: 7, complex: 20 },
                    { month: "Mar", simple: 5, medium: 9, complex: 28 },
                    { month: "Apr", simple: 4, medium: 6, complex: 22 },
                    { month: "May", simple: 3, medium: 8, complex: 25 },
                    { month: "Jun", simple: 4, medium: 7, complex: 23 },
                  ]}
                >
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
                  <Bar dataKey="simple" name="Simple" stackId="a" fill="#0ea5e9" />
                  <Bar dataKey="medium" name="Medium" stackId="a" fill="#f59e0b" />
                  <Bar dataKey="complex" name="Complex" stackId="a" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 pt-4">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-[#0ea5e9]" />
                <span className="text-sm text-muted-foreground">Simple (hrs)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-[#f59e0b]" />
                <span className="text-sm text-muted-foreground">Medium (hrs)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-[#6366f1]" />
                <span className="text-sm text-muted-foreground">Complex (hrs)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupportDashboard;
