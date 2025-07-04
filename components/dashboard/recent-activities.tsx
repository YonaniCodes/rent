const activities = [
  {
    text: 'New property "Luxury Downtown Apartment" submitted for approval',
    time: "2 hours ago",
  },
  {
    text: 'Property "Cozy Studio in Brooklyn" was approved',
    time: "4 hours ago",
  },
  {
    text: "User John Smith registered as a new landlord",
    time: "1 day ago",
  },
];

export default function RecentActivities() {
  return (
    <div className="bg-white rounded-xl shadow">
      <div className="px-6 pt-6 pb-2">
        <h2 className="text-2xl font-semibold">Recent Activity</h2>
      </div>
      <div className="p-6 pt-2 space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 rounded-lg bg-gray-50"
          >
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-md text-gray-900">{activity.text}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
