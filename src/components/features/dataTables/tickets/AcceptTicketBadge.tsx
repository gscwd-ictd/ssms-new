"use client";

import { Badge } from "@ssms/components/ui/badge";
import { $tickets } from "@ssms/lib/rpcClient";
import { session, user } from "@ssms/server/db/schemas/auth";
import { TicketsSchema } from "@ssms/server/validations/ticketsSchemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { FunctionComponent } from "react";
import { toast } from "sonner";
import { z } from "zod";

type AcceptTicketBadgeProps = {
  ticketId: string;
};

type UpdateTicket = Partial<z.infer<typeof TicketsSchema>>;

export type UserInSession = {
  session: typeof session.$inferInsert;
  user: typeof user.$inferSelect;
};

export const AcceptTicketBadge: FunctionComponent<AcceptTicketBadgeProps> = ({ ticketId }) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["accept-ticket"],
    mutationFn: async (data: UpdateTicket) => {
      const res = await $tickets[":id"].$patch({
        json: data,
        param: {
          id: ticketId,
        },
      });

      const updatedTicket = await res.json();

      if (!res.ok) {
        throw updatedTicket;
      }

      return updatedTicket;
    },
    onSuccess: () => {
      toast.success("Successfully accepted the ticket!");
      queryClient.invalidateQueries({ queryKey: ["get-all-tickets"] });
    },
  });

  return (
    <Badge
      role="button"
      variant="secondary"
      className="text-xs space-x-1"
      onClick={() => {
        const assignedId = queryClient.getQueryData<UserInSession>(["get-session-details"])?.user.id;
        mutate({ assignedId, status: "ongoing" });
      }}
    >
      <Check className="h-3 w-3 text-green-500" />
      <span className="font-bold">Accept</span>
    </Badge>
  );
};
