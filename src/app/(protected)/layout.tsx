import { AppSidebar } from "@ssms/components/features/layouts/AppSidebar";
import { SidebarProvider } from "@ssms/components/ui/sidebar";
import { PropsWithChildren } from "react";

export default function ProtectedPagesLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-10">{children}</main>
    </SidebarProvider>
  );
}
