"use client";

import { ErrorContext } from "@better-fetch/fetch";
import { Button } from "@ssms/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ssms/components/ui/dialog";
import { Input } from "@ssms/components/ui/input";
import { Label } from "@ssms/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@ssms/components/ui/select";
import { authClient } from "@ssms/lib/authCient";
import { $departments, $divisions, $offices } from "@ssms/lib/rpcClient";
import { useQuery } from "@tanstack/react-query";
import { FilePlus2 } from "lucide-react";
import { useState, type FunctionComponent } from "react";

export const AddUserDialog: FunctionComponent = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [office, setOffice] = useState("");
  const [department, setDepartment] = useState("");
  const [division, setDivision] = useState("");

  const { data: offices } = useQuery({
    queryKey: ["get-offices"],
    queryFn: async () => {
      const res = await $offices.index.$get();
      const offices = await res.json();

      if (!res.ok) {
        throw offices;
      }

      return offices;
    },
  });

  const { data: departments } = useQuery({
    queryKey: ["get-departments-by-office-id", office],
    queryFn: async () => {
      const res = await $departments.offices[":id"].$get({
        param: {
          id: office,
        },
      });
      const departments = await res.json();

      if (!res.ok) {
        throw departments;
      }

      return departments;
    },
    enabled: !!offices || office !== "",
  });

  const { data: divisions } = useQuery({
    queryKey: ["get-divisions-by-department-id", department],
    queryFn: async () => {
      const res = await $divisions.departments[":id"].$get({
        param: {
          id: department,
        },
      });

      const divisions = await res.json();

      if (!res.ok) {
        throw divisions;
      }

      return divisions;
    },
    enabled: !!departments || department !== "",
  });

  const addUser = async () => {
    await authClient.signUp.email(
      {
        email,
        password,
        name,
        office,
        department,
        division,
      },
      {
        onSuccess: () => {
          setDialogOpen(false);
        },
        onError: (ctx: ErrorContext) => {
          alert(ctx.error.message);
        },
      }
    );
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" onClick={() => setDialogOpen(true)}>
          <FilePlus2 className="text-green-500" />
          <span>Add User</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a user</DialogTitle>
          <DialogDescription>Create a new user</DialogDescription>
        </DialogHeader>
        <div className="space-y-5">
          <section className="space-y-2">
            <Label>Full Name</Label>
            <Input
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="User's full name"
            />
          </section>

          <section className="space-y-2">
            <Label>Email address</Label>
            <Input
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@example.com"
            />
          </section>

          <section className="space-y-2">
            <Label>Password</Label>
            <Input
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="At least 8 characters"
            />
          </section>

          <section className="space-y-2">
            <Label>Office</Label>
            <Select onValueChange={(val) => setOffice(val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select office" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>List of all offices</SelectLabel>
                  {offices?.map((office, index) => {
                    return (
                      <SelectItem key={index} value={office.id}>
                        {office.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </section>

          <section className="space-y-2">
            <Label>Department</Label>
            <Select onValueChange={(val) => setDepartment(val)}>
              <SelectTrigger className="w-full" disabled={office === "" || !office}>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>List of all departments</SelectLabel>
                  {departments?.map((department, index) => {
                    return (
                      <SelectItem key={index} value={department.id}>
                        {department.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </section>

          <section className="space-y-2">
            <Label>Division</Label>
            <Select onValueChange={(val) => setDivision(val)}>
              <SelectTrigger className="w-full" disabled={department === "" || !department}>
                <SelectValue placeholder="Select a division" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  {divisions?.map((division, index) => {
                    return (
                      <SelectItem key={index} value={division.id}>
                        {division.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </section>

          <section className="flex items-center justify-end">
            <Button variant="secondary" onClick={() => addUser()}>
              Confirm
            </Button>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};
