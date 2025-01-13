import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@ssms/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ssms/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ssms/components/ui/form";
import { Textarea } from "@ssms/components/ui/textarea";
import { $tickets } from "@ssms/lib/rpcClient";
import { CancelTicketFormSchema } from "@ssms/server/validations/ticketsSchemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { FunctionComponent, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type CancelTicketFormDialogProps = {
  status: string;
};

export const CancelTicketFormDialog: FunctionComponent<CancelTicketFormDialogProps> = ({ status }) => {
  const [open, setOpen] = useState(false);

  const param = useParams<{ id: string }>();

  const queryClient = useQueryClient();

  const cancelTicketForm = useForm({
    resolver: zodResolver(CancelTicketFormSchema),
    defaultValues: {
      cancelledDueTo: "",
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["cancel-ticket"],
    mutationFn: async (data: z.infer<typeof CancelTicketFormSchema>) => {
      const res = await $tickets[":id"].cancel.$patch({
        form: data,
        param: {
          id: param.id,
        },
      });

      const cancelledTicket = await res.json();

      if (!res.ok) {
        throw cancelledTicket;
      }

      return cancelledTicket;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-ticket-details"] });
      toast.success("Successfully cancelled the ticket");
      setOpen(false);
      cancelTicketForm.reset();
    },
    onError: (err) => alert(err.message),
  });

  const onSubmit = (data: z.infer<typeof CancelTicketFormSchema>) => {
    mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={status !== "open"}>
          Cancel
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel ticket</DialogTitle>
          <DialogDescription>Provide details on why this ticket is being cancelled</DialogDescription>
        </DialogHeader>
        <div>
          <Form {...cancelTicketForm}>
            <form onSubmit={cancelTicketForm.handleSubmit(onSubmit)}>
              <FormField
                control={cancelTicketForm.control}
                name="cancelledDueTo"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Remarks</FormLabel>
                      <FormControl>
                        <Textarea rows={3} placeholder="Please describe in details..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />

              <footer className="mt-7 flex justify-end gap-1">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    cancelTicketForm.reset();
                  }}
                >
                  Cancel
                </Button>
                <Button variant="ghost">Confirm</Button>
              </footer>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
