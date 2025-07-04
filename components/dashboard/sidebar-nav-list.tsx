"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

interface Item {
  title: string;
  url: string;
  icon: React.ElementType;
}

export default function SidebarNavList({ items }: { items: Item[] }) {
  const pathname = usePathname();
  const getNavClass = (url: string) => {
    const isActive = pathname === url;
    return `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
        : "text-gray-700 hover:bg-gray-100"
    }`;
  };
  return (
    <>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link
              href={item.url}
              className={getNavClass(`dashboard/${item.url}`)}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
}
