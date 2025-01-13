"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useUserSession } from "@ssms/components/stores/useUserSession";
import { Button } from "@ssms/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ssms/components/ui/form";
import { Textarea } from "@ssms/components/ui/textarea";
import { $tickets } from "@ssms/lib/rpcClient";
import { AddUserTicketsFormSchema } from "@ssms/server/validations/ticketsSchemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type AddTicketFormUserProps = {
  setDialogOpen: (open: boolean) => void;
};

export const AddTicketFormUser: FunctionComponent<AddTicketFormUserProps> = ({ setDialogOpen }) => {
  // const [open, setOpen] = useState(false);
  const userSession = useUserSession((state) => state.userSession);

  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(AddUserTicketsFormSchema),
    defaultValues: {
      details: "",
      requestorId: userSession!.user.id! ?? "",
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["add-new-ticket"],
    mutationFn: async (data: z.infer<typeof AddUserTicketsFormSchema>) => {
      const res = await $tickets.index.$post({ form: data });

      const newTicket = await res.json();

      if (!res.ok) {
        throw newTicket;
      }

      return newTicket;
    },
    onSuccess: () => {
      setDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["get-all-tickets"] });
      toast.success("Successfully added a new ticket!");
    },
    onError: (err) => alert(err.message),
  });

  const onSubmit = (data: z.infer<typeof AddUserTicketsFormSchema>) => {
    console.log(data);
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <Textarea rows={5} placeholder="Please describe in details..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />

        <footer className="mt-7 flex justify-end gap-1">
          <Button variant="outline" type="button" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="ghost">Confirm</Button>
        </footer>
      </form>
    </Form>
  );
};
