import "../globals.css";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import DashBoardHeader from "@/components/dashboard/dash-board-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardQueryProvider from "@/providers/dashboard-query";
import { SupabaseProvider } from "@/providers/supabase-client";
import { Toaster } from "sonner";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SupabaseProvider>
          <DashboardQueryProvider>
            <SidebarProvider>
              <div className="flex min-h-screen w-full">
                <AppSidebar />
                <main className="flex-1 flex flex-col w-full">
                  <DashBoardHeader />
                  {children}
                </main>
              </div>
            </SidebarProvider>
          </DashboardQueryProvider>
        </SupabaseProvider>

        <Toaster expand={true} />
      </body>
    </html>
  );
}
