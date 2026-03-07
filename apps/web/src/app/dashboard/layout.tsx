import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import MobileHeader from "@/components/dashboard/mobile-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <DashboardSidebar />
      </div>
      <div className="flex-1 flex flex-col">
        {/* Mobile Header - shown only on mobile */}
        <MobileHeader />
        {/* Desktop Header - hidden on mobile */}
        <div className="hidden md:block">
          <DashboardHeader />
        </div>
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
