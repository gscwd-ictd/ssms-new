import { UsersDataTable } from "@ssms/components/features/dataTables/users/UsersDataTable";

export default function Users() {
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
