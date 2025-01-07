import { AppSidebar } from "@ssms/components/features/navigation/AppSidebar";
import { SidebarProvider } from "@ssms/components/ui/sidebar";
import { PropsWithChildren } from "react";

export default function ProtectedPagesLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <main className="p-10">{children}</main>
      </div>
    </SidebarProvider>
  );
}
