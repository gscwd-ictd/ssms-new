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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoriesSchema } from "@ssms/server/validations/ticketsSchemas";
import { z } from "zod";
import { Input } from "@ssms/components/ui/input";
import { Textarea } from "@ssms/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { $categories } from "@ssms/lib/rpcClient";
import { toast } from "sonner";

export const AddCategoryFormDialog: FunctionComponent = () => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof CategoriesSchema>>({
    resolver: zodResolver(CategoriesSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { mutate: addNewCategory } = useMutation({
    mutationKey: ["add-new-category"],
    mutationFn: async (data: z.infer<typeof CategoriesSchema>) => {
      const res = await $categories.index.$post({ form: data });

      const newCategory = await res.json();

      if (!res.ok) {
        throw newCategory;
      }

      return newCategory;
    },
    onSuccess: () => {
      toast.success("Successfully added a new category!");
      setOpen(false);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["get-all-categories"] });
    },
    onError: () => {
      toast.error("Failed to create new category!");
    },
  });

  const onSubmit = (data: z.infer<typeof CategoriesSchema>) => {
    addNewCategory(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          <span>Add Category</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>Create a category for which a ticket might belong to</DialogDescription>
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
                    <Input placeholder="Category name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Description (optional)</FormLabel>
                    <FormControl>
                      <Textarea rows={5} placeholder="Please describe in details..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />

            <footer className="mt-7 flex justify-end gap-1">
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>
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
