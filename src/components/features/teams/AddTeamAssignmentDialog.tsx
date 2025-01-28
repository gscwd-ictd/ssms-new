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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ssms/components/ui/form";
import { Button } from "../../ui/button";
import { Input } from "@ssms/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { $teams } from "@ssms/lib/rpcClient";
import { MultiSelect } from "@ssms/components/ui/multi-select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TeamAssignmentSchema } from "@ssms/server/validations/teamSchemas";
import { teamAssignments } from "@ssms/server/db/schemas/teams";
import { toast } from "sonner";

export type SelectOption = {
  label: string;
  value: string;
};

export const AddTeamAssignmentDialog: FunctionComponent = () => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof TeamAssignmentSchema>>({
    resolver: zodResolver(TeamAssignmentSchema),
    defaultValues: {
      name: "",
      users: [],
      categories: [],
    },
  });

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

  const { data: unassignedCategories } = useQuery({
    queryKey: ["get-all-unassigned-categories"],
    queryFn: async () => {
      const res = await $teams["unassigned-categories"].$get();

      const unassignedCategories = await res.json();

      if (!res.ok) {
        throw unassignedCategories;
      }

      const transformedData: SelectOption[] = unassignedCategories.map((user) => ({
        label: user.name,
        value: user.id,
      }));

      return transformedData;
    },
    enabled: open === true,
  });

  const { mutate: createTeamAssignment } = useMutation({
    mutationKey: ["create-team-assignment"],
    mutationFn: async (data: z.infer<typeof TeamAssignmentSchema>) => {
      const res = await $teams["team-assignments"].$post({ form: data });

      const newTeamAssignment = await res.json();

      if (!res.ok) {
        throw newTeamAssignment;
      }

      return teamAssignments;
    },
    onSuccess: () => {
      toast.success("Successfully created a new team assignment!");
      setOpen(false);
      form.reset();
      queryClient.invalidateQueries({
        queryKey: ["get-all-teams"],
      });
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  const onSubmit = (data: z.infer<typeof TeamAssignmentSchema>) => {
    createTeamAssignment(data);
    console.log(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          <span>Add Team</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Team Assignment</DialogTitle>
          <DialogDescription>Assign technical support staff to a specific team</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Team name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={unassignedCategories ?? []}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Assign categories for this team"
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
