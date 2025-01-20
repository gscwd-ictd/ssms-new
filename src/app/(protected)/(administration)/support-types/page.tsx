import { SupportTypesTable } from "@ssms/components/features/dataTables/supportTypes/SupportTypesTable";
import { Button } from "@ssms/components/ui/button";
import { auth } from "@ssms/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SupportTypes() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user.role !== "support") {
    redirect("/tickets");
  }

  return (
    <div className="flex flex-col">
      <header className="py-7 flex items-center justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">Support Types</h1>
        <Button variant="secondary">Create New</Button>
      </header>

      <main>
        <SupportTypesTable />
      </main>
    </div>
  );
}
