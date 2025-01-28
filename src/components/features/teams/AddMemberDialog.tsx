"use client";

import { FunctionComponent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ssms/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@ssms/components/ui/form";
import { Button } from "../../ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddMemberSchema } from "@ssms/server/validations/teamSchemas";
import { MultiSelect } from "@ssms/components/ui/multi-select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { $teams } from "@ssms/lib/rpcClient";
import { SelectOption } from "./AddTeamAssignmentDialog";
import { toast } from "sonner";

type AddMemberProps = {
  teamId: string;
};

export const AddMemberDialog: FunctionComponent<AddMemberProps> = ({ teamId }) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof AddMemberSchema>>({
    resolver: zodResolver(AddMemberSchema),
    defaultValues: {
      users: [],
    },
  });

  const { mutate: addMember } = useMutation({
    mutationKey: ["add-member"],
    mutationFn: async (data: z.infer<typeof AddMemberSchema>) => {
      const res = await $teams["add-member"][":id"].$post({
        form: data,
        param: {
          id: teamId,
        },
      });

      const newMembers = await res.json();

      if (!res.ok) {
        throw newMembers;
      }

      return newMembers;
    },
    onSuccess: () => {
      toast.success("Successfully added a new member!");
      setOpen(false);
      form.reset();
      queryClient.invalidateQueries({
        queryKey: ["get-all-teams", "get-assigned-users-by-team-id"],
      });
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  const onSubmit = (data: z.infer<typeof AddMemberSchema>) => {
    //console.log(data);
    addMember(data);
  };

  const { data: unassignedUsers } = useQuery({
    queryKey: ["get-all-unassigned-users"],
    queryFn: async () => {
      const res = await $teams["unassigned-users"].$get();

      const unassignedUsers = await res.json();

      if (!res.ok) {
        throw unassignedUsers;
      }

      const transformedData: SelectOption[] = unassignedUsers.map((user) => ({
        label: user.name,
        value: user.id,
      }));

      return transformedData;
    },
    enabled: open === true,
  });

  const { data: team } = useQuery({
    queryKey: ["get-team-by-id"],
    queryFn: async () => {
      const res = await $teams.info[":id"].$get({
        param: {
          id: teamId,
        },
      });

      const team = await res.json();

      if (!res.ok) {
        throw team;
      }

      return team;
    },
    enabled: open === true,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        onClick={() => setOpen(true)}
        className="cursor-default relative flex hover:bg-secondary w-full select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
        asChild
      >
        <button>Add Member</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Member/s</DialogTitle>
          <DialogDescription>
            Assign technical support staff to <strong className="text-indigo-500">{team?.name}</strong> team
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="users"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Users</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={unassignedUsers ?? []}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Select technical support staff"
                      variant="secondary"
                      maxCount={3}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <footer className="mt-7 flex justify-end gap-1">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  setOpen(false);
                  form.reset();
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
