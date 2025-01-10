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
import { UpdateTicketsSchema } from "@ssms/server/validations/ticketsSchemas";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@ssms/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@ssms/components/ui/select";
import { TicketDetails } from "../ticketDetails/TicketDetailsHeader";
import { useQuery } from "@tanstack/react-query";
import { $categories, $subCategories } from "@ssms/lib/rpcClient";

type ResolveTicketDialogProps = {
  ticketDetails: TicketDetails;
};

export const ResolveTicketDialog: FunctionComponent<ResolveTicketDialogProps> = ({ ticketDetails }) => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const form = useForm({
    resolver: zodResolver(UpdateTicketsSchema),
    defaultValues: { ...ticketDetails },
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
    enabled: ticketDetails.categoryId !== null,
  });

  const { data: subCategories } = useQuery({
    queryKey: ["get-all-sub-categories-by-category-id", selectedCategory],
    queryFn: async () => {
      const res = await $subCategories.categories[":id"].$get({
        param: {
          id: selectedCategory,
        },
      });

      const subCategories = await res.json();

      if (!res.ok) {
        throw subCategories;
      }

      return subCategories;
    },
    enabled: !!form.getValues().categoryId && ticketDetails.subCategoryId !== null,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" onClick={() => setOpen(true)}>
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
            <form>
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
                              defaultValue={field.value as string}
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
                        <>
                          <FormItem className="w-full">
                            <FormLabel>Category</FormLabel>
                            <Select
                              onValueChange={(e) => {
                                field.onChange(e);
                                setSelectedCategory(e);
                              }}
                              defaultValue={ticketDetails.categoryId as string}
                              disabled
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories?.map((category) => (
                                  <SelectItem key={category.id} value={category.id}>
                                    {ticketDetails.categoryName}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        </>
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
                              defaultValue={field.value as string}
                              disabled={form.getValues().categoryId === ""}
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
                        <>
                          <FormItem className="w-full">
                            <FormLabel>Sub Category</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={ticketDetails.subCategoryId as string}
                              disabled
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder={ticketDetails.subCategoryName} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {subCategories?.map((subCategory) => (
                                  <SelectItem key={subCategory.id} value={subCategory.id}>
                                    {ticketDetails.subCategoryName}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        </>
                      )}
                    </>
                  )}
                />
              </div>
            </form>
            <Button onClick={() => console.log(form.formState.errors)}>Test </Button>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
