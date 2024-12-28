"use client";

import React, { Suspense, lazy } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ClerkProvider } from "@clerk/clerk-react";
import { Skeleton } from "@/components/ui/skeleton";
import "@/styles/globals.css";

const AppSidebar = lazy(
  () => import("@/components/dashboard/sidebar/app-sidebar")
);
const publishableK = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={publishableK}>
      <SidebarProvider>
        <div className="flex h-screen">
          <Suspense fallback={<Skeleton className="w-64 h-full bg-gray-100" />}>
            <AppSidebar />
          </Suspense>
          <main className="flex-1 overflow-auto">
            <SidebarTrigger className="m-4" />
            {children}
          </main>
        </div>
      </SidebarProvider>
    </ClerkProvider>
  );
}
