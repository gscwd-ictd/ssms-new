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
import { FilePen, Folder, Hammer, Settings, SquareDashedMousePointer, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { FunctionComponent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUserSession } from "@ssms/components/stores/useUserSession";
import { UserInSession } from "../dataTables/tickets/AcceptTicketBadge";

const mainItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: SquareDashedMousePointer,
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
];

export const AppSidebar: FunctionComponent = () => {
  const setUserSession = useUserSession((state) => state.setUserSession);

  const pathname = usePathname();

  const { data: session } = useQuery({
    queryKey: ["get-session-details"],
    queryFn: async () => {
      const userSession = (await authClient.getSession()).data as UserInSession;

      setUserSession(userSession);

      return userSession;
    },
  });

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-2 flex items-center gap-1">
          <Image
            className="dark:invert"
            src="/ticketly.svg"
            alt="ticketly logo"
            width={0}
            height={0}
            style={{ width: "auto", height: "auto" }}
            priority
          />
          <span className="font-bold tracking-wider">ticket.ly</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase font-semibold tracking-widest">General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname.startsWith(item.url)}>
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

        {session?.user.role === "support" && (
          <SidebarGroup>
            <SidebarGroupLabel className="uppercase font-semibold tracking-widest">
              Administration
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {configItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname.startsWith(item.url)}>
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
