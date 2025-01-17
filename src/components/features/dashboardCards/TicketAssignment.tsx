import React, { FunctionComponent, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ssms/components/ui/card";
import { Clock, Database } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@ssms/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { $dashboard } from "@ssms/lib/rpcClient";
import { useUserSession } from "@ssms/components/stores/useUserSession";
import { Badge } from "@ssms/components/ui/badge";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { useDashboardDateFilter } from "@ssms/components/stores/useDateFilter";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@ssms/components/ui/select";

export const TicketAssignment: FunctionComponent = () => {
  const [selectedStatus, setSelectedStatus] = useState("ongoing");

  const userSession = useUserSession((state) => state.userSession);

  const dateRange = useDashboardDateFilter((state) => state.dateRange);

  const router = useRouter();

  const { data: tickets } = useQuery({
    queryKey: ["get-tickets-by-assignment", dateRange?.from, dateRange?.to, selectedStatus],
    queryFn: async () => {
      const res = await $dashboard["tickets-by-assignment"][":id"].$get({
        param: { id: userSession?.user.id as string },
        //@ts-expect-error this is just a type error
        query: {
          from: dateRange?.from,
          to: dateRange?.to,
          status: selectedStatus,
        },
      });

      const tickets = await res.json();

      if (!res.ok) {
        throw tickets;
      }

      return tickets;
    },
  });

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <CardHeader>
          <div className="flex items-start justify-between">
            <section>
              <CardTitle>My Assigned Tickets</CardTitle>
              <CardDescription>Showing {tickets?.length} assigned tickets</CardDescription>
            </section>

            <section>
              <Select defaultValue="ongoing" onValueChange={(e) => setSelectedStatus(e)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="ongoing">On Going</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </section>
          </div>
        </CardHeader>

        <CardContent>
          {tickets?.length === 0 ? (
            <div className="h-[300px] flex items-center justify-center">
              <div className="flex items-center gap-2">
                <Database className="h-10 w-10 text-muted" />
                <h2 className="text-3xl font-bold text-muted">No Result.</h2>
              </div>
            </div>
          ) : (
            <div className="h-[300px] flex items-start justify-between overflow-y-auto pr-5">
              <ul className="w-full">
                {tickets?.map((ticket, index) => {
                  return (
                    <li
                      key={index}
                      className="p-4 rounded-lg flex items-start gap-2 flex-1 mb-2 hover:bg-secondary/20 border"
                      role="button"
                      onClick={() => router.push(`/tickets/${ticket.id}`)}
                    >
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={ticket.requestedByAvatar || undefined} className="object-cover" />
                        <AvatarFallback>{ticket.requestedByName.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-1 w-full rounded-md">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">{ticket.requestedByName}</span>

                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{formatDistanceToNow(ticket.requestedAt, { addSuffix: true })}</span>
                          </div>
                        </div>

                        <p className="text-base font-medium">{ticket.details}</p>
                        <Badge>{ticket.status}</Badge>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
