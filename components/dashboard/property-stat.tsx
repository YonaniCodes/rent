import { Building, CheckCircle, Clock, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "My Properties",
    value: "8",
    icon: Building,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Approved",
    value: "6",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Pending",
    value: "2",
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "Monthly Earnings",
    value: "$12,500",
    icon: TrendingUp,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];
export default function PropertyStat() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow p-6 flex items-center justify-between"
        >
          <div>
            <p className="text-md text-gray-600 font-medium mb-1">
              {stat.title}
            </p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
          <div className={`ml-4 p-3 rounded-full ${stat.bgColor}`}>
            <stat.icon className={`h-7 w-7 ${stat.color}`} />
          </div>
        </div>
      ))}
    </div>
  );
}
