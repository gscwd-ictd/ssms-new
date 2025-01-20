import { TeamsDataTable } from "@ssms/components/features/dataTables/teams/TeamsDataTable";
import { AddTeamAssignmentDialog } from "@ssms/components/features/teams/AddTeamAssignmentDialog";
import { auth } from "@ssms/lib/auth";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Teams",
};

export default async function Teams() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user.role !== "support") {
    redirect("/tickets");
  }

  return (
    <div className="flex flex-col">
      <header className="py-7 flex items-center justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">Teams</h1>
        <AddTeamAssignmentDialog />
      </header>

      <main>
        <TeamsDataTable />
      </main>
    </div>
  );
}
