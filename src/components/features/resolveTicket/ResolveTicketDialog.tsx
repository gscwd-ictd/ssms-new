"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ssms/components/ui/dialog";
import { FunctionComponent, useState } from "react";
import { Button } from "@ssms/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResolveTicketsSchema } from "@ssms/server/validations/ticketsSchemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ssms/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@ssms/components/ui/select";
import { TicketDetails } from "../ticketDetails/TicketDetailsHeader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { $categories, $subCategories, $supportTypes, $tickets } from "@ssms/lib/rpcClient";
import { Textarea } from "@ssms/components/ui/textarea";
import { z } from "zod";
import { toast } from "sonner";
import { useParams } from "next/navigation";

type ResolveTicketDialogProps = {
  ticketDetails: TicketDetails;
};

export const ResolveTicketDialog: FunctionComponent<ResolveTicketDialogProps> = ({ ticketDetails }) => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const param = useParams<{ id: string }>();

  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(ResolveTicketsSchema),
    defaultValues: {
      categoryId: ticketDetails.categoryId as string,
      subCategoryId: ticketDetails.subCategoryId as string,
      supportTypeId: ticketDetails.supportTypeId as string,
      status: ticketDetails.status as "open" | "closed" | "ongoing" | "cancelled" | "resolved",
      assessment: "",
      action: "",
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["get-all-categories"],
    queryFn: async () => {
      const res = await $categories.index.$get();

      const categories = await res.json();

      if (!res.ok) {
        throw categories;
      }

      return categories;
    },
    enabled: ticketDetails.categoryId === null,
  });

  const { data: subCategories } = useQuery({
    queryKey: ["get-all-sub-categories-by-category-id", selectedCategory],
    queryFn: async () => {
      const res = await $subCategories.categories[":id"].$get({
        param: {
          id: selectedCategory!,
        },
      });

      const subCategories = await res.json();

      if (!res.ok) {
        throw subCategories;
      }

      return subCategories;
    },
    enabled: !!selectedCategory,
  });

  const { data: supportTypes } = useQuery({
    queryKey: ["get-all-support_types"],
    queryFn: async () => {
      const res = await $supportTypes.index.$get();

      const supportTypes = await res.json();

      if (!res.ok) {
        throw supportTypes;
      }

      return supportTypes;
    },
    enabled: ticketDetails.subCategoryId === null,
  });

  const { mutate } = useMutation({
    mutationKey: ["add-new-ticket"],
    mutationFn: async (data: z.infer<typeof ResolveTicketsSchema>) => {
      const res = await $tickets[":id"].resolve.$patch({
        form: data,
        param: {
          id: param.id,
        },
      });

      const newTicket = await res.json();

      if (!res.ok) {
        throw newTicket;
      }

      return newTicket;
    },
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["get-ticket-details"] });
      toast.success("Ticket successfully resolved!");
    },
    onError: (err) => {
      alert(err.message);
      console.log(err);
    },
  });

  const onSubmit = (data: z.infer<typeof ResolveTicketsSchema>) => {
    mutate({ ...data, status: "resolved" });
    console.log({ ...data, resolvedAt: new Date(), status: "resolved" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          onClick={() => setOpen(true)}
          disabled={ticketDetails.status === "resolved" || ticketDetails.status === "cancelled"}
        >
          Resolve
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Resolve ticket</DialogTitle>
          <DialogDescription>Provide details on how you resolved this ticket</DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex items-center gap-2 justify-between">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <>
                      {!ticketDetails.categoryId ? (
                        <>
                          <FormItem className="w-full">
                            <FormLabel>Category</FormLabel>
                            <Select
                              onValueChange={(e) => {
                                field.onChange(e);
                                setSelectedCategory(e);
                              }}
                              // defaultValue={field.value === null ? "Select a category" : field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories?.map((category) => (
                                  <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        </>
                      ) : (
                        <>{ticketDetails.categoryName}</>
                      )}
                    </>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subCategoryId"
                  render={({ field }) => (
                    <>
                      {!ticketDetails.subCategoryId ? (
                        <>
                          <FormItem className="w-full">
                            <FormLabel>Sub Category</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              // defaultValue={field.value as string}
                              disabled={
                                form.getValues().categoryId === "" || form.getValues().categoryId === null
                              }
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select a sub category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {subCategories?.map((subCategory) => (
                                  <SelectItem key={subCategory.id} value={subCategory.id}>
                                    {subCategory.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        </>
                      ) : (
                        <>{ticketDetails.subCategoryName}</>
                      )}
                    </>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="supportTypeId"
                render={({ field }) => (
                  <>
                    {!ticketDetails.supportTypeId ? (
                      <>
                        <FormItem className="w-full">
                          <FormLabel>Support Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            // defaultValue={field.value as string}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a type of support" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {supportTypes?.map((supportType) => (
                                <SelectItem key={supportType.id} value={supportType.id}>
                                  {supportType.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      </>
                    ) : (
                      <>{ticketDetails.supportTypeName}</>
                    )}
                  </>
                )}
              />

              <FormField
                control={form.control}
                name="assessment"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Assessment</FormLabel>
                      <FormControl>
                        <Textarea rows={3} placeholder="Please describe in details..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />

              <FormField
                control={form.control}
                name="action"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Action</FormLabel>
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
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
                <Button variant="ghost">Confirm</Button>
              </footer>
            </form>
            {/* <Button onClick={() => console.log(form.formState.errors)}>Test </Button> */}
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
