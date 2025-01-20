import { SubCategoriesTable } from "@ssms/components/features/dataTables/sub-categories/SubCategoriesTable";
import { AddSubCategoryFormDialog } from "@ssms/components/features/subCategories/AddSubCategoryFormDialog";
import { auth } from "@ssms/lib/auth";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sub-Categories",
};

export default async function SubCategories() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user.role !== "support") {
    redirect("/tickets");
  }

  return (
    <div className="flex flex-col">
      <header className="py-7 flex items-center justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">Sub Categories</h1>
        <AddSubCategoryFormDialog />
      </header>

      <main>
        <SubCategoriesTable />
      </main>
    </div>
  );
}
