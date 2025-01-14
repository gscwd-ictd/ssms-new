"use client";

import { FunctionComponent } from "react";
import { Bell, Settings, HelpCircle, User, LogOut } from "lucide-react";
// import { Input } from "@ssms/components/ui/input";
import { Button } from "@ssms/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@ssms/components/ui/avatar";
import { Badge } from "@ssms/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ssms/components/ui/dropdown-menu";
import { useUserSession } from "@ssms/components/stores/useUserSession";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "@ssms/lib/authCient";
import { useRouter } from "next/navigation";
import { ThemeToggler } from "../theme/ThemeToggler";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from "@ssms/components/ui/navigation-menu";

export const AppTopbar: FunctionComponent = () => {
  const userSession = useUserSession((state) => state.userSession);

  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["sign-out-user"],
    mutationFn: async () => {
      const res = await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/signin");
          },
        },
      });
      return res.data;
    },
  });

  return (
    <>
      <div className="">
        <div className="flex h-16 items-center gap-4 w-full px-24 pt-7 justify-end">
          {/* Logo */}

          {/* Navigation */}
          {/* <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Dashboard</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-48 gap-1 p-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Button variant="ghost" className="w-full justify-start">
                          Overview
                        </Button>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Button variant="ghost" className="w-full justify-start">
                          Analytics
                        </Button>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Button variant="ghost" className="w-full justify-start">
                          Reports
                        </Button>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button variant="ghost">Tickets</Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button variant="ghost">Knowledge Base</Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button variant="ghost">Team</Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu> */}

          {/* Search */}
          {/* <div className="flex-1 flex items-center">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search tickets..." className="pl-8" />
            </div>
          </div> */}

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button> */}

            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-red-700 text-white">
                3
              </Badge>
            </Button>

            <Button variant="outline" size="icon">
              <HelpCircle className="h-4 w-4" />
            </Button>

            <ThemeToggler />
            {/* <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button> */}

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={userSession?.user.image as string}
                      alt="User"
                      className="object-cover"
                    />
                    <AvatarFallback>{userSession?.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col">
                    <p className="font-medium">{userSession?.user.name}</p>
                    <p className="text-sm text-muted-foreground">{userSession?.user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={() => mutate()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
};
