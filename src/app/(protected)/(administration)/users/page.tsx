import { UsersDataTable } from "@ssms/components/features/dataTables/users/UsersDataTable";
import { auth } from "@ssms/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Users() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user.role !== "support") {
    redirect("/tickets");
  }

  return (
    <div className="flex flex-col">
      <header className="py-7 flex items-center justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">Users</h1>
      </header>

      <main>
        <UsersDataTable />
      </main>
    </div>
  );
}
