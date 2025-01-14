import { GoBack } from "@ssms/components/features/GoBack";
import { AppSidebar } from "@ssms/components/features/navigation/AppSidebar";
import { SidebarProvider } from "@ssms/components/ui/sidebar";
import { PropsWithChildren } from "react";

export default function ProtectedPagesLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <main className="py-10 px-24 space-y-2">
          <GoBack />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
