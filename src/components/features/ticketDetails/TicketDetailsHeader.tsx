"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@ssms/components/ui/avatar";
import { Badge } from "@ssms/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@ssms/components/ui/card";
import { Label } from "@ssms/components/ui/label";
import { $comments, $tickets } from "@ssms/lib/rpcClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Clock, MessagesSquare } from "lucide-react";
import { useParams } from "next/navigation";
import { FunctionComponent, useEffect } from "react";
import { Separator } from "@ssms/components/ui/separator";
import { Button } from "@ssms/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentsSchema } from "@ssms/server/validations/ticketsSchemas";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@ssms/components/ui/form";
import { Textarea } from "@ssms/components/ui/textarea";
import { z } from "zod";
import { format } from "date-fns";
import { useUserSession } from "@ssms/components/stores/useUserSession";
import { ResolveTicketDialog } from "../resolveTicket/ResolveTicketDialog";
import { CancelTicketFormDialog } from "../cancelTicket/CancelTicketFormDialog";

export type TicketDetails = {
  id: string;
  requestedBy: string;
  requestedByAvatar: string | null;
  requestedByEmail: string;
  assignedTo: string | null;
  assignedToAvatar: string | null;
  assignedToEmail: string | null;
  details: string;
  categoryId: string | null;
  categoryName: string | null;
  subCategoryId: string | null;
  subCategoryName: string | null;
  supportTypeId: string | null;
  supportTypeName: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date | null;
};

export const TicketDetailsHeader: FunctionComponent = () => {
  const param = useParams<{ id: string }>();

  const userSession = useUserSession((state) => state.userSession);

  const queryClient = useQueryClient();

  const commentForm = useForm({
    resolver: zodResolver(CommentsSchema),
    defaultValues: {
      userId: userSession?.user.id,
      ticketId: param.id,
      details: "",
    },
  });

  useEffect(() => {
    commentForm.setValue("userId", userSession?.user.id);
  }, [commentForm, userSession]);

  const { data: ticket } = useQuery<TicketDetails>({
    queryKey: ["get-ticket-details"],
    queryFn: async () => {
      const res = await $tickets[":id"].$get({
        param: {
          id: param.id,
        },
      });

      const ticket = await res.json();

      if (!res.ok) {
        throw ticket;
      }

      return ticket;
    },
  });

  const { data: comments } = useQuery({
    queryKey: ["get-ticket-comments"],
    queryFn: async () => {
      const res = await $comments.tickets[":id"].$get({ param: { id: param.id } });

      const comments = await res.json();

      if (!res.ok) {
        throw comments;
      }

      return comments;
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["add-comment"],
    mutationFn: async (data: z.infer<typeof CommentsSchema>) => {
      const res = await $comments.index.$post({ form: data });

      const comment = await res.json();

      if (!res.ok) {
        throw comment;
      }

      return comment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-ticket-comments"] });
      commentForm.resetField("details");
    },
    onError: () => alert("bad"),
  });

  const onCommentSubmit = (data: z.infer<typeof CommentsSchema>) => {
    mutate(data);
    //console.log(data);
  };

  if (ticket) {
    return (
      <Card>
        <CardHeader className="space-y-7">
          <div className="flex items-center justify-between mr-20">
            <div className="space-y-2">
              <Badge
                variant="secondary"
                className={`${
                  ticket.status === "resolved"
                    ? "bg-green-700"
                    : ticket.status === "ongoing"
                    ? "bg-amber-700"
                    : ticket.status === "open"
                    ? "bg-blue-700"
                    : "bg-rose-700"
                } uppercase tracking-wider`}
              >
                {ticket.status}
              </Badge>

              <h1 className="scroll-m-20 text-4xl font-medium tracking-wide mb-2 max-w-[50rem] line-clamp-2">
                {ticket.details}
              </h1>

              <div className="flex items-center gap-4">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Created {format(ticket.createdAt, "MMMM d, yyyy, hh:mm:ss a")}
                </span>
                <span
                  role="button"
                  onClick={() => commentForm.setFocus("details")}
                  className="text-muted-foreground flex items-center gap-1 cursor-pointer hover:underline"
                >
                  <MessagesSquare className="h-4 w-4" />
                  {comments?.length === 0 ? "No" : comments?.length} comments
                </span>
              </div>
            </div>

            <div className="flex items-center gap-10">
              <div className="space-y-2">
                <Label className="text-muted-foreground">Requested by:</Label>

                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={ticket.requestedByAvatar!} className="object-cover" />
                    <AvatarFallback className="font-semibold text-lg">
                      {ticket?.requestedBy.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="font-bold">{ticket.requestedBy}</p>
                    <p className="text-sm text-muted-foreground">{ticket.requestedByEmail}</p>
                  </div>
                </div>
              </div>

              <div className="h-10">
                <Separator orientation="vertical" />
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground">Assgned to:</Label>
                {ticket.assignedTo ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={ticket.assignedToAvatar!} className="object-cover" />
                        <AvatarFallback className="font-semibold text-lg">
                          {ticket.assignedTo?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-bold">{ticket.assignedTo}</p>
                        <p className="text-sm text-muted-foreground">{ticket.assignedToEmail}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          <div className="space-x-2">
            {/* <Button variant="outline" disabled={ticket.status !== "open"}>
              Cancel
            </Button> */}
            <CancelTicketFormDialog status={ticket.status} />

            {userSession?.user.role === "support" && <ResolveTicketDialog ticketDetails={ticket} />}
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="mt-5">
          <Label>Comments:</Label>

          {comments !== undefined && comments.length > 0 && (
            <>
              {comments.map((comment) => (
                <div key={comment.id} className="mt-5">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={comment.image!} className="object-cover" />
                      <AvatarFallback className="font-semibold text-lg">
                        {comment.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">{comment.name}</span>
                        <p className="text-sm text-muted-foreground">
                          {format(comment.createdAt, "MMMM d, yyyy, hh:mm:ss a")}
                        </p>
                      </div>

                      <p className="text-muted-foreground">{comment.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          <div className="mt-7 flex items-start gap-4">
            <Avatar>
              <AvatarImage src={userSession?.user.image as string} className="object-cover" />
              <AvatarFallback className="font-semibold text-lg">
                {userSession?.user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="w-full space-y-2">
              <Form {...commentForm}>
                <form onSubmit={commentForm.handleSubmit(onCommentSubmit)}>
                  <FormField
                    control={commentForm.control}
                    name="details"
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormControl>
                            <Textarea rows={4} placeholder="Add comment..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />

                  <div className="flex justify-end mt-2">
                    <Button type="submit">Comment</Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </CardContent>

        <Separator />

        <CardFooter>
          <span className="text-muted-foreground mt-5 flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {format(ticket.updatedAt as Date, "MMMM d, yyyy, hh:mm:ss a")}
          </span>
        </CardFooter>
      </Card>
    );
  }
};
