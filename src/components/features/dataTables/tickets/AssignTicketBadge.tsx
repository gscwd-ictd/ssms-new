"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@ssms/components/ui/badge";
import { Button } from "@ssms/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@ssms/components/ui/avatar";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogContent,
} from "@ssms/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@ssms/components/ui/command";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@ssms/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@ssms/components/ui/popover";
import { $tickets, $users } from "@ssms/lib/rpcClient";
import { AssignTicketSchema } from "@ssms/server/validations/ticketsSchemas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowUp, ChevronsUpDown } from "lucide-react";
import { FunctionComponent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { cn } from "@ssms/lib/shadcn";
import { toast } from "sonner";

type UserList = {
  id: string;
  name: string;
  image: string;
};

type AssignTicketBadgeDialogProps = {
  ticketId: string;
};

export const AssignTicketBadgeDialog: FunctionComponent<AssignTicketBadgeDialogProps> = ({ ticketId }) => {
  const [open, setOpen] = useState(false);
  const [userListOpen, setUserListOpen] = useState(false);
  const [selectedUserAvatar, setSelectedUserAvatar] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(AssignTicketSchema),
    defaultValues: {
      assignedId: "",
    },
  });

  const { data: supportStaff } = useQuery<UserList[]>({
    queryKey: ["get-all-support-staff"],
    queryFn: async () => {
      const res = await $users["list-summary"].q.$get({
        query: {
          role: "support",
        },
      });

      const supportStaff = await res.json();

      if (!res.ok) {
        throw supportStaff;
      }

      return supportStaff as UserList[];
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["assign-ticket"],
    mutationFn: async (data: z.infer<typeof AssignTicketSchema>) => {
      const res = await $tickets[":id"].assign.$patch({
        form: data,
        param: {
          id: ticketId,
        },
      });

      const assignedTicket = await res.json();

      if (!res.ok) {
        throw assignedTicket;
      }

      return assignedTicket;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-tickets"] });
      toast.success("Ticket successfully assigned!");
      setOpen(false);
      form.reset();
    },
    onError: (err) => alert(err.message),
  });

  const onSubmit = (data: z.infer<typeof AssignTicketSchema>) => {
    //console.log({ data });
    mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Badge role="button" variant="outline" className="text-xs space-x-1">
          <ArrowUp className="h-3 w-3" />
          <span className="font-bold">Assign</span>
        </Badge>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Ticket</DialogTitle>
          <DialogDescription>Select Support Staff you wish to assign this ticket to</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="assignedId"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Assign to</FormLabel>
                    <Popover open={userListOpen} onOpenChange={setUserListOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                          >
                            <div className="flex items-center gap-3">
                              {selectedUserAvatar && (
                                <Avatar className="h-5 w-5">
                                  <AvatarImage
                                    src={selectedUserAvatar}
                                    alt="profile"
                                    className="object-cover"
                                  />
                                </Avatar>
                              )}
                              {field.value
                                ? supportStaff?.find((user) => user.id === field.value)?.name
                                : "Select user"}
                            </div>

                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search user..." />
                          <CommandList>
                            <CommandEmpty>No user found.</CommandEmpty>
                            <CommandGroup>
                              {supportStaff?.map((user) => (
                                <CommandItem
                                  value={user.name}
                                  key={user.id}
                                  onSelect={() => {
                                    form.setValue("assignedId", user.id as string);
                                    setSelectedUserAvatar(user.image);
                                    setUserListOpen(false);
                                  }}
                                >
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-5 w-5">
                                      <AvatarImage src={user.image!} alt="profile" className="object-cover" />
                                      <AvatarFallback>
                                        <Image
                                          className="dark:invert object-cover"
                                          src="/default.svg"
                                          alt="default logo"
                                          width={0}
                                          height={0}
                                          style={{ width: "auto", height: "auto" }}
                                          priority
                                        />
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{user.name}</span>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                </>
              )}
            />

            <footer className="mt-7 flex justify-end gap-1">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  form.reset();
                  setSelectedUserAvatar(null);
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button variant="ghost">Confirm</Button>
            </footer>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
