"use client";

import React, { memo } from "react";
import { useUser } from "@clerk/clerk-react";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./user-sidebar";
import { Skeleton } from "@/components/ui/skeleton";

const items = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Inbox", url: "/dashboard/inbox", icon: Inbox },
  { title: "Calendar", url: "/dashboard/calendar", icon: Calendar },
  { title: "Search", url: "/dashboard/search", icon: Search },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

const fallbackUser = {
  name: "Guest User",
  email: "guest@example.com",
  avatar: "/images/avatar.jpg",
};

const AppSidebar = memo(() => {
  const { isLoaded, isSignedIn, user } = useUser();

  const userData =
    isLoaded && isSignedIn
      ? {
          name: user.fullName || user.username || "User",
          email: user.primaryEmailAddress?.emailAddress || "",
          avatar: user.imageUrl || fallbackUser.avatar,
        }
      : fallbackUser;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {isLoaded ? (
          <NavUser user={userData} />
        ) : (
          <Skeleton className="h-10 w-full" />
        )}
      </SidebarFooter>
    </Sidebar>
  );
});

export default AppSidebar;
