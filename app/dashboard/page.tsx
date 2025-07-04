import WelcomeHeader from "@/components/dashboard/welcome-header";
import PropertyStat from "@/components/dashboard/property-stat";
import QuickActions from "@/components/dashboard/quick-actions";
import RecentActivities from "@/components/dashboard/recent-activities";

const DashboardOverview = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 my-10">
      <WelcomeHeader />
      <PropertyStat />
      <QuickActions />
      <RecentActivities />
    </div>
  );
};

export default DashboardOverview;
