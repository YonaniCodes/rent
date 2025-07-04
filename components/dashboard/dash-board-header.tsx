"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Bell, LogOut } from "lucide-react";

// import SidebarTrigger if you have it, or replace with your button/icon
import { SidebarTrigger } from "@/components/ui/sidebar"; // Adjust path accordingly
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function DashBoardHeader() {
  const {
    data: session,
    isPending, //loading state
  } = authClient.useSession();

  if (isPending) return <>Loading</>;

  const user = session?.user;

  return (
    <header className="h-16 z-30  bg-white border-b fixed right-0 left-0  border-gray-200 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-gray-600 hover:text-gray-900" />
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-gray-900"
        >
          <Bell className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
          <Link href={`/dashboard/profile`}>
            <Avatar>
              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                {user?.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
        <Button
          variant="ghost"
          size="sm"
          // onClick={logout}
          className="text-gray-600 hover:text-red-600"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
