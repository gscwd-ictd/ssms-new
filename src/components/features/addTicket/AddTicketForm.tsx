"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@ssms/components/ui/avatar";
import { Button } from "@ssms/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@ssms/components/ui/command";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ssms/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@ssms/components/ui/popover";
import { $categories, $subCategories, $supportTypes, $tickets, $users } from "@ssms/lib/rpcClient";
import { cn } from "@ssms/lib/shadcn";
import { AddSupportTicketsFormSchema } from "@ssms/server/validations/ticketsSchemas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronsUpDown } from "lucide-react";
import { FunctionComponent, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { z } from "zod";
import { Textarea } from "@ssms/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@ssms/components/ui/select";
// import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoadingSpinner } from "@ssms/components/ui/loading-spinner";
import { useDateFilter } from "@ssms/components/stores/useDateFilter";
import { addDays, startOfMonth } from "date-fns";

type AddTicketFormProps = {
  setDialogOpen: (open: boolean) => void;
  dialogOpen: boolean;
};

export const AddTicketForm: FunctionComponent<AddTicketFormProps> = ({ setDialogOpen, dialogOpen }) => {
  const [selectedUserAvatar, setSelectedUserAvatar] = useState<string | null>(null);
  const [userListOpen, setUserListOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const setDateFiler = useDateFilter((state) => state.setDateFilter);

  // const router = useRouter();

  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(AddSupportTicketsFormSchema),
    defaultValues: {
      requestorId: "",
      categoryId: "",
      subCategoryId: "",
      supportTypeId: "",
      details: "",
      status: "open",
    },
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
    enabled: dialogOpen === true,
  });

  const { data: userList, isPending: userListLoading } = useQuery({
    queryKey: ["get-user-list-summary"],
    queryFn: async () => {
      const res = await $users["list-summary"].$get();

      const userList = await res.json();

      if (!res.ok) {
        throw userList;
      }

      return userList;
    },
    enabled: dialogOpen === true,
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
    enabled: dialogOpen === true,
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
    enabled: !!form.getValues().categoryId,
  });

  const { mutate } = useMutation({
    mutationKey: ["add-new-ticket"],
    mutationFn: async (data: z.infer<typeof AddSupportTicketsFormSchema>) => {
      const res = await $tickets.index.$post({ form: data });

      const newTicket = await res.json();

      if (!res.ok) {
        throw newTicket;
      }

      return newTicket;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-all-tickets"],
      });

      toast.success("Successfully added a new ticket!");
      setDialogOpen(false);
      form.reset();

      setDateFiler({
        from: startOfMonth(new Date()),
        to: addDays(new Date(), +1),
      });

      //router.push(`/tickets/${data.id}`);
    },
    onError: (err) => alert(err.message),
  });

  const onSubmit = (data: z.infer<typeof AddSupportTicketsFormSchema>) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="requestorId"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Requestor</FormLabel>
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
                              <AvatarImage src={selectedUserAvatar} alt="profile" className="object-cover" />
                            </Avatar>
                          )}
                          {field.value
                            ? userList?.find((user) => user.id === field.value)?.name
                            : "Select user"}
                        </div>

                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search user..." />
                      {userListLoading ? (
                        <div className="flex items-center justify-center p-5 gap-1">
                          <LoadingSpinner className="h-5 w-5 text-muted-foreground" />
                          <span className="text-muted-foreground font-medium">Loading user...</span>
                        </div>
                      ) : (
                        <CommandList>
                          <CommandEmpty>No user found.</CommandEmpty>
                          <CommandGroup>
                            {userList?.map((user, index) => (
                              <CommandItem
                                value={user.name}
                                key={index}
                                onSelect={() => {
                                  form.setValue("requestorId", user.id);
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
                      )}
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            </>
          )}
        />

        <div className="flex items-center gap-2 justify-between">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <>
                <FormItem className="w-full">
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={(e) => {
                      field.onChange(e);
                      setSelectedCategory(e);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
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
            name="subCategoryId"
            render={({ field }) => (
              <>
                <FormItem className="w-full">
                  <FormLabel>Sub Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={form.getValues().categoryId === ""}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a sub category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subCategories?.map((subCategory, index) => (
                        <SelectItem key={index} value={subCategory.id}>
                          {subCategory.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              </>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="supportTypeId"
          render={({ field }) => (
            <>
              <FormItem className="w-full">
                <FormLabel>Support Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a type of support" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {supportTypes?.map((supportType, index) => (
                      <SelectItem key={index} value={supportType.id}>
                        {supportType.name}
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
