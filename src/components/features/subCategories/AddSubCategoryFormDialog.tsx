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
import { SubCategoriesSchema } from "@ssms/server/validations/ticketsSchemas";
import { z } from "zod";
import { Input } from "@ssms/components/ui/input";
import { Textarea } from "@ssms/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { $categories, $subCategories } from "@ssms/lib/rpcClient";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@ssms/components/ui/select";

export const AddSubCategoryFormDialog: FunctionComponent = () => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof SubCategoriesSchema>>({
    resolver: zodResolver(SubCategoriesSchema),
    defaultValues: {
      categoryId: undefined,
      name: "",
      description: "",
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
    enabled: open === true,
  });

  const { mutate: addNewSubCategory } = useMutation({
    mutationKey: ["add-new-sub-category"],
    mutationFn: async (data: z.infer<typeof SubCategoriesSchema>) => {
      const res = await $subCategories.index.$post({ form: data });

      const newSubCategory = await res.json();

      if (!res.ok) {
        throw newSubCategory;
      }

      return newSubCategory;
    },
    onSuccess: () => {
      toast.success("Successfully added a new sub-category!");
      setOpen(false);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["get-all-sub-categories"] });
    },
    onError: () => {
      toast.error("Failed to create new sub category!");
    },
  });

  const onSubmit = (data: z.infer<typeof SubCategoriesSchema>) => {
    addNewSubCategory(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          <span>Create New</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Sub-Category</DialogTitle>
          <DialogDescription>Create a sub-category for which a ticket might belong to</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <>
                  <FormItem className="w-full">
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((category, index) => (
                          <SelectItem key={index} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                </>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Sub-category name..." {...field} />
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
