import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@ssms/components/ui/card";
import {
  Users,
  Timer,
  CheckCircle2,
  MoveUp,
  ArrowUpDown,
  Calendar,
  User,
  BadgeAlert,
  Clock,
  Ticket,
} from "lucide-react";

export const StatusCards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* First Row */}
      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Pending Assignment</CardTitle>
          <User className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">23</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <MoveUp className="h-3 w-3 text-destructive mr-1" />
            <span className="text-destructive">8</span>
            <span className="ml-1">tickets need attention</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Today&apos;s Workload</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">45</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <span>32 ongoing / 13 new</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Backlog Age</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3.2d</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <ArrowUpDown className="h-3 w-3 text-emerald-500 mr-1" />
            <span>Average time in backlog</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">First Contact Resolution</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">76%</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <MoveUp className="h-3 w-3 text-emerald-500 mr-1" />
            <span className="text-emerald-500">5%</span>
            <span className="ml-1">vs last month</span>
          </div>
        </CardContent>
      </Card>

      {/* Second Row */}
      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Reopened Tickets</CardTitle>
          <BadgeAlert className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">4.8%</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <span>12 tickets this month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Avg Handle Time</CardTitle>
          <Timer className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">18m</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <MoveUp className="h-3 w-3 text-emerald-500 mr-1" />
            <span>Per ticket interaction</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Agent Utilization</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">82%</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <span>8/10 agents active</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Peak Hour Load</CardTitle>
          <Ticket className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">10-11am</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <span>Avg. 28 tickets/hour</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
