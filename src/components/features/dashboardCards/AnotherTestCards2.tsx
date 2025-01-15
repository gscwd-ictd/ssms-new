import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@ssms/components/ui/card";
import { Badge } from "@ssms/components/ui/badge";
import { Users, Timer, TrendingUp, TrendingDown, BadgeAlert, ArrowRight } from "lucide-react";

const StatusCardsAnother2 = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Ticket Reopen Rate</CardTitle>
          <BadgeAlert className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">4.8%</div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Hardware Issues</span>
              <div className="flex items-center gap-2">
                <span>6.2%</span>
                <TrendingUp className="h-3 w-3 text-destructive" />
                <span className="text-destructive">High</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Software Issues</span>
              <div className="flex items-center gap-2">
                <span>3.1%</span>
                <TrendingDown className="h-3 w-3 text-emerald-500" />
                <span className="text-emerald-500">Good</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Network Issues</span>
              <div className="flex items-center gap-2">
                <span>4.2%</span>
                <ArrowRight className="h-3 w-3" />
                <span className="text-muted-foreground">Average</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
          <BadgeAlert className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">4.6/5.0</div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">5 Stars</span>
              <div className="flex items-center gap-2">
                <span>68%</span>
                <Badge variant="outline" className="text-xs">
                  485 reviews
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">4 Stars</span>
              <div className="flex items-center gap-2">
                <span>24%</span>
                <Badge variant="outline" className="text-xs">
                  171 reviews
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">≤ 3 Stars</span>
              <div className="flex items-center gap-2">
                <span>8%</span>
                <Badge variant="destructive" className="text-xs">
                  57 reviews
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Response Speed</CardTitle>
          <Timer className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">15m</div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Within 15m</span>
              <div className="flex items-center gap-2">
                <span>75%</span>
                <Badge variant="outline" className="text-xs bg-emerald-50">
                  Target met
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">15m - 1h</span>
              <div className="flex items-center gap-2">
                <span>20%</span>
                <Badge variant="outline" className="text-xs bg-yellow-50">
                  Monitor
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">&gt; 1h</span>
              <div className="flex items-center gap-2">
                <span>5%</span>
                <Badge variant="destructive" className="text-xs">
                  Action needed
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Knowledge Base Impact</CardTitle>
          <BadgeAlert className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">32%</div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Self-Resolved</span>
              <div className="flex items-center gap-2">
                <span>156</span>
                <TrendingUp className="h-3 w-3 text-emerald-500" />
                <span className="text-emerald-500">+12%</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">KB Views</span>
              <div className="flex items-center gap-2">
                <span>2.4k</span>
                <TrendingUp className="h-3 w-3 text-emerald-500" />
                <span className="text-emerald-500">+8%</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Deflection Rate</span>
              <div className="flex items-center gap-2">
                <span>32%</span>
                <Badge variant="outline" className="text-xs">
                  Target: 35%
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Agent Load Balance</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">7.2</div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">High Load (&gt;10)</span>
              <div className="flex items-center gap-2">
                <span>2 agents</span>
                <Badge variant="destructive" className="text-xs">
                  Action needed
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Optimal (5-10)</span>
              <div className="flex items-center gap-2">
                <span>5 agents</span>
                <Badge variant="outline" className="text-xs bg-emerald-50">
                  Good
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Light Load (&lt;5)</span>
              <div className="flex items-center gap-2">
                <span>3 agents</span>
                <Badge variant="outline" className="text-xs bg-yellow-50">
                  Reassign
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Escalation Rate</CardTitle>
          <BadgeAlert className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8.5%</div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Technical</span>
              <div className="flex items-center gap-2">
                <span>12%</span>
                <TrendingUp className="h-3 w-3 text-destructive" />
                <span className="text-destructive">Above target</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Procedural</span>
              <div className="flex items-center gap-2">
                <span>6%</span>
                <TrendingDown className="h-3 w-3 text-emerald-500" />
                <span className="text-emerald-500">Within target</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Customer Request</span>
              <div className="flex items-center gap-2">
                <span>7.5%</span>
                <ArrowRight className="h-3 w-3" />
                <span className="text-muted-foreground">Expected</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Support Channels</CardTitle>
          <BadgeAlert className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Email</div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Email</span>
              <div className="flex items-center gap-2">
                <span>45%</span>
                <Badge variant="outline" className="text-xs">
                  432 tickets
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Phone</span>
              <div className="flex items-center gap-2">
                <span>35%</span>
                <Badge variant="outline" className="text-xs">
                  336 tickets
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Chat</span>
              <div className="flex items-center gap-2">
                <span>20%</span>
                <Badge variant="outline" className="text-xs">
                  192 tickets
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Follow-up Required</CardTitle>
          <BadgeAlert className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">15%</div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Pending Info</span>
              <div className="flex items-center gap-2">
                <span>8%</span>
                <Badge variant="outline" className="text-xs">
                  32 tickets
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Testing Required</span>
              <div className="flex items-center gap-2">
                <span>5%</span>
                <Badge variant="outline" className="text-xs">
                  20 tickets
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Verification Needed</span>
              <div className="flex items-center gap-2">
                <span>2%</span>
                <Badge variant="outline" className="text-xs">
                  8 tickets
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusCardsAnother2;
