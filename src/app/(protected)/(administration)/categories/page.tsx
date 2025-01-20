import { AddCategoryFormDialog } from "@ssms/components/features/categories/AddCategoryFormDialog";
import { CategoriesTable } from "@ssms/components/features/dataTables/categories/CategoriesTable";
import { auth } from "@ssms/lib/auth";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Categories",
};

export default async function SubCategories() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user.role !== "support") {
    redirect("/tickets");
  }

  return (
    <div className="flex flex-col">
      <header className="py-7 flex items-center justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">Categories</h1>
        <AddCategoryFormDialog />
      </header>

      <main>
        <CategoriesTable />
      </main>
    </div>
  );
}
