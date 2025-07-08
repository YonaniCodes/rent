"use client";
import {
  Home,
  Building,
  Users,
  Settings,
  BarChart3,
  CheckCircle,
  PlusCircle,
  QrCode,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import Uploader from "@/data/uploader";

export function AppSidebar() {
  const { data: session, isPending, error, refetch } = authClient.useSession();
  const pathname = usePathname();

  if (isPending) return <>Loading</>;
  if (error) refetch();

  const user = session!.user;

  const getNavClass = (url: string) => {
    const isActive = pathname === url;
    return `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
        : "text-gray-700 hover:bg-gray-100"
    }`;
  };
  const adminItems = [
    { title: "Dashboard", url: "/", icon: Home },
    { title: "All Homes", url: "/dashboard/homes", icon: Building },
    {
      title: "Pending Approvals",
      url: "/dashboard/approvals",
      icon: CheckCircle,
    },
    { title: "Users", url: "/dashboard/users", icon: Users },
    { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
  ];

  const AgentItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    {
      title: "My Homes",
      url: `dashboard/my-homes `,
      icon: Building,
    },
    { title: "Add Home", url: "/dashboard/add-home", icon: PlusCircle },
    { title: "QR Codes", url: "/qr-codes", icon: QrCode },
  ];
  console.log("role", user?.role);
  const items = user?.role.trim() === "agent" ? AgentItems : adminItems;

  return (
    <Sidebar className="w-64 z-50 bg-white border-r border-gray-200 shadow-sm">
      <SidebarContent className="p-4">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Home className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">PropertyHub</h2>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role} Panel
              </p>
            </div>
            <SidebarTrigger className="text-gray-600 hover:text-gray-900" />
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className={getNavClass(item.url)}>
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Uploader />

        <div className="mt-auto pt-8">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
            <p className="text-sm font-medium text-gray-900 mb-1">Need Help?</p>
            <p className="text-xs text-gray-600 mb-3">
              Contact our support team
            </p>
            <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
              Get Support →
            </button>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
