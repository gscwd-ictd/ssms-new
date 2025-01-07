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
import { authClient } from "@ssms/lib/authCient";
import { useQuery } from "@tanstack/react-query";
import {
  ChartNoAxesCombined,
  FilePen,
  Folder,
  Hammer,
  Settings,
  SquareDashedMousePointer,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FunctionComponent } from "react";

const mainItems = [
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

const configItems = [
  {
    title: "Categories",
    url: "/categories",
    icon: Folder,
  },
  {
    title: "Support Types",
    url: "/support-types",
    icon: Hammer,
  },
  {
    title: "Organization",
    url: "/offices",
    icon: SquareDashedMousePointer,
  },
];

export const AppSidebar: FunctionComponent = () => {
  const pathname = usePathname();

  const { data } = useQuery({
    queryKey: ["get-session-details"],
    queryFn: async () => {
      return await authClient.getSession();
    },
  });

  return (
    <Sidebar>
      <SidebarHeader>{/** Write something here */}</SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase font-semibold tracking-widest">General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
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

        {data?.data?.user.role === "support" && (
          <SidebarGroup>
            <SidebarGroupLabel className="uppercase font-semibold tracking-widest">
              Configuration
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {configItems.map((item) => (
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
        )}
      </SidebarContent>

      <SidebarFooter>{/** Write something here */}</SidebarFooter>
    </Sidebar>
  );
};
