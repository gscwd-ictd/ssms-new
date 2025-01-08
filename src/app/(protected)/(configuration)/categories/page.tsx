import { CategoriesTable } from "@ssms/components/features/dataTables/categories/CategoriesTable";
import { Button } from "@ssms/components/ui/button";

export default function SubCategories() {
  return (
    <div className="flex flex-col gap-7">
      <header className="py-7 flex items-center justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">Categories</h1>
        <Button variant="secondary">Create New</Button>
      </header>

      <main>
        <CategoriesTable />
      </main>
    </div>
  );
}
