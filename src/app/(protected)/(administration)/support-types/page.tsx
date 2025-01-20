import { SupportTypesTable } from "@ssms/components/features/dataTables/supportTypes/SupportTypesTable";
import { AddSupportTypesFormDialog } from "@ssms/components/features/supportTypes/AddSupportTypesFormDialog";
import { auth } from "@ssms/lib/auth";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Support Types",
};

export default async function SupportTypes() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user.role !== "support") {
    redirect("/tickets");
  }

  return (
    <div className="flex flex-col">
      <header className="py-7 flex items-center justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">Support Types</h1>
        <AddSupportTypesFormDialog />
      </header>

      <main>
        <SupportTypesTable />
      </main>
    </div>
  );
}
