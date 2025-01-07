"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@ssms/components/ui/sidebar";
import { Calendar, ChartNoAxesCombined, FilePen, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FunctionComponent } from "react";

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Tickets",
    url: "/tickets",
    icon: FilePen,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export const AppSidebar: FunctionComponent = () => {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>{/** Write something here */}</SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase font-semibold tracking-widest">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.url.includes(pathname)}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>{/** Write something here */}</SidebarFooter>
    </Sidebar>
  );
};
