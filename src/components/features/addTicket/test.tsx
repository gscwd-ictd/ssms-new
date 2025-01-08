// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { Avatar, AvatarFallback, AvatarImage } from "@ssms/components/ui/avatar";
// import { Button } from "@ssms/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@ssms/components/ui/command";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ssms/components/ui/form";
// import { Popover, PopoverContent, PopoverTrigger } from "@ssms/components/ui/popover";
// import { $categories, $subCategories, $users } from "@ssms/lib/rpcClient";
// import { cn } from "@ssms/lib/shadcn";
// import { TicketsSchema } from "@ssms/server/validations/ticketsSchemas";
// import { useQuery } from "@tanstack/react-query";
// import { ChevronsUpDown } from "lucide-react";
// import { FunctionComponent, useState } from "react";
// import { useForm } from "react-hook-form";
// import Image from "next/image";
// import { z } from "zod";
// import { Textarea } from "@ssms/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@ssms/components/ui/select";

// export const AddTicketForm: FunctionComponent = () => {
//   const [selectedUserAvatar, setSelectedUserAvatar] = useState<string | null>(null);
//   const [userListOpen, setUserListOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState<string>("");

//   const form = useForm({
//     resolver: zodResolver(TicketsSchema),
//     defaultValues: {
//       requestorId: "",
//       assignedId: "",
//       categoryId: "",
//       subCategoryId: "",
//       supportTypeId: "",
//       details: "",
//     },
//   });

//   const { data: userList } = useQuery({
//     queryKey: ["get-user-list-summary"],
//     queryFn: async () => {
//       const res = await $users["list-summary"].$get();

//       const userList = await res.json();

//       if (!res.ok) {
//         throw userList;
//       }

//       return userList;
//     },
//   });

//   const { data: categories } = useQuery({
//     queryKey: ["get-all-categories"],
//     queryFn: async () => {
//       const res = await $categories.index.$get();

//       const categories = await res.json();

//       if (!res.ok) {
//         throw categories;
//       }

//       return categories;
//     },
//     enabled: selectedCategory !== "",
//   });

//   const {} = useQuery({
//     queryKey: ["get-allsub-categories-by-category-id"],
//     queryFn: async () => {
//       const res = await $subCategories.categories[":id"].$get({ param: { id: selectedCategory } });

//       const subCategories = await res.json();

//       if (!res.ok) {
//         throw subCategories;
//       }

//       return subCategories;
//     },
//   });

//   const onSubmit = (data: z.infer<typeof TicketsSchema>) => {
//     console.log(data);
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
//         <FormField
//           control={form.control}
//           name="requestorId"
//           render={({ field }) => (
//             <>
//               <FormItem>
//                 <FormLabel>Requestor</FormLabel>
//                 <Popover open={userListOpen} onOpenChange={setUserListOpen}>
//                   <PopoverTrigger asChild>
//                     <FormControl>
//                       <Button
//                         variant="outline"
//                         role="combobox"
//                         className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
//                       >
//                         <div className="flex items-center gap-3">
//                           {selectedUserAvatar && (
//                             <Avatar className="h-5 w-5">
//                               <AvatarImage src={selectedUserAvatar} alt="profile" className="object-cover" />
//                             </Avatar>
//                           )}
//                           {field.value
//                             ? userList?.find((user) => user.id === field.value)?.name
//                             : "Select user"}
//                         </div>

//                         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                       </Button>
//                     </FormControl>
//                   </PopoverTrigger>

//                   <PopoverContent className="w-full p-0" align="start">
//                     <Command>
//                       <CommandInput placeholder="Search user..." />
//                       <CommandList>
//                         <CommandEmpty>No user found.</CommandEmpty>
//                         <CommandGroup>
//                           {userList?.map((user) => (
//                             <CommandItem
//                               value={user.name}
//                               key={user.id}
//                               onSelect={() => {
//                                 form.setValue("requestorId", user.id);
//                                 setSelectedUserAvatar(user.image);
//                                 setUserListOpen(false);
//                               }}
//                             >
//                               <div className="flex items-center gap-3">
//                                 <Avatar className="h-5 w-5">
//                                   <AvatarImage src={user.image!} alt="profile" className="object-cover" />
//                                   <AvatarFallback>
//                                     <Image
//                                       className="dark:invert object-cover"
//                                       src="/default.svg"
//                                       alt="default logo"
//                                       width={0}
//                                       height={0}
//                                       style={{ width: "auto", height: "auto" }}
//                                       priority
//                                     />
//                                   </AvatarFallback>
//                                 </Avatar>
//                                 <span className="font-medium">{user.name}</span>
//                               </div>
//                             </CommandItem>
//                           ))}
//                         </CommandGroup>
//                       </CommandList>
//                     </Command>
//                   </PopoverContent>
//                 </Popover>
//               </FormItem>
//             </>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="details"
//           render={({ field }) => (
//             <>
//               <FormItem>
//                 <FormLabel>Details</FormLabel>
//                 <FormControl>
//                   <Textarea rows={7} placeholder="Enter details..." {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             </>
//           )}
//         />

//         <div className="flex items-center gap-2">
//           <FormField
//             control={form.control}
//             name="categoryId"
//             render={({ field }) => (
//               <>
//                 <FormItem>
//                   <FormLabel>Category</FormLabel>
//                   <Select onValueChange={field.onChange} defaultValue={field.value}>
//                     <FormControl>
//                       <SelectTrigger className="w-full">
//                         <SelectValue placeholder="Select a category" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {categories?.map((category) => (
//                         <SelectItem key={category.id} value={category.id}>
//                           {category.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </FormItem>
//               </>
//             )}
//           />

//           {/* <FormField /> */}
//         </div>

//         <footer className="mt-7">
//           <Button variant="secondary">Confirm</Button>
//         </footer>
//       </form>
//     </Form>
//   );
// };
