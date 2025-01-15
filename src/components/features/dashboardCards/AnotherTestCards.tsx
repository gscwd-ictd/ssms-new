import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@ssms/components/ui/card";
import { Badge } from "@ssms/components/ui/badge";
import {
  Users,
  Timer,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Calendar,
  User,
  BadgeAlert,
  Clock,
  Ticket,
  ArrowRight,
} from "lucide-react";

const StatusCardsAnother = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Pending Assignment</CardTitle>
          <User className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">23</div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">High Priority</span>
              <div className="flex items-center gap-2">
                <Badge variant="destructive" className="text-xs">
                  8
                </Badge>
                <TrendingUp className="h-3 w-3 text-destructive" />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Medium Priority</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  12
                </Badge>
                <TrendingDown className="h-3 w-3 text-emerald-500" />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Low Priority</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  3
                </Badge>
                <TrendingDown className="h-3 w-3 text-emerald-500" />
              </div>
            </div>
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
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">New Tickets</span>
              <div className="flex items-center gap-2">
                <span>13</span>
                <ArrowRight className="h-3 w-3" />
                <span className="text-emerald-500">+2 vs avg</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Ongoing</span>
              <div className="flex items-center gap-2">
                <span>32</span>
                <ArrowRight className="h-3 w-3" />
                <span className="text-destructive">+5 vs avg</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Expected Today</span>
              <div className="flex items-center gap-2">
                <span>58</span>
                <span className="text-muted-foreground">(forecast)</span>
              </div>
            </div>
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
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">&lt; 24 hours</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  15
                </Badge>
                <span className="text-emerald-500">On track</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">1-3 days</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  8
                </Badge>
                <span className="text-yellow-500">Monitor</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">&gt; 3 days</span>
              <div className="flex items-center gap-2">
                <Badge variant="destructive" className="text-xs">
                  4
                </Badge>
                <span className="text-destructive">Action needed</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Agent Performance</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">82%</div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Active Agents</span>
              <div className="flex items-center gap-2">
                <span>8/10</span>
                <TrendingUp className="h-3 w-3 text-emerald-500" />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Avg Tickets/Agent</span>
              <div className="flex items-center gap-2">
                <span>5.6</span>
                <span className="text-emerald-500">+0.8 vs target</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Response Rate</span>
              <div className="flex items-center gap-2">
                <span>93%</span>
                <TrendingUp className="h-3 w-3 text-emerald-500" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Resolution Metrics</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">76%</div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">First Contact</span>
              <div className="flex items-center gap-2">
                <span>45%</span>
                <TrendingUp className="h-3 w-3 text-emerald-500" />
                <span className="text-emerald-500">+5%</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Same Day</span>
              <div className="flex items-center gap-2">
                <span>31%</span>
                <TrendingDown className="h-3 w-3 text-yellow-500" />
                <span className="text-yellow-500">-2%</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Multiple Days</span>
              <div className="flex items-center gap-2">
                <span>24%</span>
                <TrendingDown className="h-3 w-3 text-emerald-500" />
                <span className="text-emerald-500">-3%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Category Analysis</CardTitle>
          <Ticket className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">124</div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Hardware</span>
              <div className="flex items-center gap-2">
                <span>48</span>
                <Badge variant="outline" className="text-xs">
                  39%
                </Badge>
                <TrendingUp className="h-3 w-3 text-yellow-500" />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Software</span>
              <div className="flex items-center gap-2">
                <span>52</span>
                <Badge variant="outline" className="text-xs">
                  42%
                </Badge>
                <TrendingDown className="h-3 w-3 text-emerald-500" />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Network</span>
              <div className="flex items-center gap-2">
                <span>24</span>
                <Badge variant="outline" className="text-xs">
                  19%
                </Badge>
                <TrendingDown className="h-3 w-3 text-emerald-500" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Handling Time</CardTitle>
          <Timer className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">18m</div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Simple Tickets</span>
              <div className="flex items-center gap-2">
                <span>12m</span>
                <TrendingDown className="h-3 w-3 text-emerald-500" />
                <span className="text-emerald-500">-2m</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Medium Tickets</span>
              <div className="flex items-center gap-2">
                <span>25m</span>
                <TrendingUp className="h-3 w-3 text-yellow-500" />
                <span className="text-yellow-500">+3m</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Complex Tickets</span>
              <div className="flex items-center gap-2">
                <span>45m</span>
                <span className="text-muted-foreground">no change</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Hourly Distribution</CardTitle>
          <BadgeAlert className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">10-11am</div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Peak Hours (9-11)</span>
              <div className="flex items-center gap-2">
                <span>28/hr</span>
                <Badge variant="destructive" className="text-xs">
                  High
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Normal (11-3)</span>
              <div className="flex items-center gap-2">
                <span>15/hr</span>
                <Badge variant="outline" className="text-xs">
                  Normal
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Off-Peak (3-5)</span>
              <div className="flex items-center gap-2">
                <span>8/hr</span>
                <Badge variant="outline" className="text-xs">
                  Low
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusCardsAnother;
