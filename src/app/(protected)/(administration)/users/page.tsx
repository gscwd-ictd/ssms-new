import { AddUserDialog } from "@ssms/components/features/dataTables/users/AddUserDialog";
import { UsersDataTable } from "@ssms/components/features/dataTables/users/UsersDataTable";
import { auth } from "@ssms/lib/auth";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Users",
};

export default async function Users() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user.role !== "support") {
    redirect("/tickets");
  }

  return (
    <div className="flex flex-col">
      <header className="py-7 flex items-center justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">Users</h1>
        <AddUserDialog />
      </header>

      <main>
        <UsersDataTable />
      </main>
    </div>
  );
}
