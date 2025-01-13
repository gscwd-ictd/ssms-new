// "use client";

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ssms/components/ui/card";
// import { Button } from "@ssms/components/ui/button";
// import { Input } from "@ssms/components/ui/input";
// import { Label } from "@ssms/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@ssms/components/ui/select";
// import { authClient } from "@ssms/lib/auth-client";
// import { ErrorContext } from "@better-fetch/fetch";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { z } from "zod";
// import { Form } from "@ssms/components/ui/form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ssms/components/ui/form";
// import { useForm } from "react-hook-form";
// import { Popover, PopoverContent, PopoverTrigger } from "@ssms/components/ui/popover";
// import { Check, ChevronsUpDown } from "lucide-react";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@ssms/components/ui/command";
// import { cn } from "@ssms/lib/shadcn";

// const offices = [
//   { label: "Office of the AGM for Admin", value: "adm" },
//   { label: "Office of the AGM for Finance", value: "fin" },
//   { label: "Office of the AGM for Operations and Technical Services", value: "ots" },
// ];

// const departments = [
//   "Human Resournce Department",
//   "Information and Communications Technology Department",
//   "General Services, Property and Materials Management Department",
// ];
// const divisions = ["Systems Development and Application Division", "Geographical Information System Division"];

// const formSchema = z.object({
//   name: z.string(),
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(8, "Password must be at least 8 characters"),
//   office: z.string(),
// });

// export default function SignupForm() {
//   const router = useRouter();

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       office: "",
//     },
//   });

//   const onSubmit = async (data: z.infer<typeof formSchema>) => {
//     await authClient.signUp.email(
//       {
//         email: data.email,
//         name: data.name,
//         password: data.password,
//       },
//       {
//         onSuccess: async () => {
//           router.push("/dashboard");
//           router.refresh();
//         },
//         onError: (ctx: ErrorContext) => {
//           toast.error(ctx.error.message ?? "Something went wrong.");
//         },
//       }
//     );
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <Card className="w-96">
//         <CardHeader>
//           <CardTitle>Create Account</CardTitle>
//           <CardDescription>Sign up for a new account</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Full Name</FormLabel>
//                     <FormControl>
//                       <Input id="name" placeholder="John Doe" type="name" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input type="email" placeholder="Enter your email" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="office"
//                 render={({ field }) => (
//                   <FormItem className="flex flex-col">
//                     <FormLabel>Office</FormLabel>
//                     <Popover>
//                       <PopoverTrigger asChild>
//                         <FormControl>
//                           <Button
//                             variant="outline"
//                             role="combobox"
//                             className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
//                           >
//                             {field.value
//                               ? offices.find((language) => language.value === field.value)?.label
//                               : "Select language"}
//                             <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                           </Button>
//                         </FormControl>
//                       </PopoverTrigger>
//                       <PopoverContent className="w-full p-0">
//                         <Command>
//                           <CommandInput placeholder="Search language..." />
//                           <CommandList>
//                             <CommandEmpty>No language found.</CommandEmpty>
//                             <CommandGroup>
//                               {offices.map((office) => (
//                                 <CommandItem
//                                   value={office.label}
//                                   key={office.value}
//                                   onSelect={() => {
//                                     form.setValue("office", office.value);
//                                   }}
//                                 >
//                                   {office.label}
//                                   <Check
//                                     className={cn(
//                                       "ml-auto",
//                                       office.value === field.value ? "opacity-100" : "opacity-0"
//                                     )}
//                                   />
//                                 </CommandItem>
//                               ))}
//                             </CommandGroup>
//                           </CommandList>
//                         </Command>
//                       </PopoverContent>
//                     </Popover>

//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <div className="space-y-2">
//                 <Label>Department</Label>
//                 <Select>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select department" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {departments.map((dept) => (
//                       <SelectItem key={dept} value={dept.toLowerCase()}>
//                         {dept}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2">
//                 <Label>Division</Label>
//                 <Select>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select division" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {divisions.map((division) => (
//                       <SelectItem key={division} value={division.toLowerCase()}>
//                         {division}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <Input type="password" placeholder="Enter your password" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <div className="space-y-2">
//                 <Label htmlFor="confirmPassword">Confirm Password</Label>
//                 <Input id="confirmPassword" type="password" placeholder="••••••••" />
//               </div>

//               <Button type="submit" className="w-full">
//                 Sign Up
//               </Button>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import { ErrorContext } from "@better-fetch/fetch";
import { authClient } from "@ssms/lib/authCient";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();

  const signUp = async () => {
    await authClient.signUp.email(
      {
        email,
        password,
        name,
        office: "pzsdwopxfiorcowedcrhjqayejmf",
        department: "uefglvaisbhybmilfobpcakhjlsv",
        division: "qrmnqfgjvlwponqwtcxgzckgdgku",
        // office: "iipxgganqfybvrdokclqprdmitdq",
        // department: "vkvegmanffdwqkraguxlpxwfaxyc",
        // division: "cqgfqcfklheovjqcvqtujthfcpiz",
      },
      {
        onSuccess: async () => {
          router.push("/dashboard");
          router.refresh();
        },
        onError: (ctx: ErrorContext) => {
          alert(ctx.error.message);
        },
      }
    );
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <input
            type="name"
            value={name}
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            className="border px-3 py-2"
          />
          <input
            type="email"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-2"
          />
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            className="border px-3 py-2"
          />
        </div>
        <button onClick={signUp}>Sign Up</button>
      </div>
    </div>
  );
}
