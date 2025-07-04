"use client";
import { Plus, QrCode, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

export default function QuickActions() {
  const router = useRouter(); // ✅ Initialize router
  const quickActions = [
    {
      title: "Add New Property",
      subtitle: "Click to get started",
      action: () => router.push("/properties/new"),
      icon: Plus,
    },
    {
      title: "Generate QR Codes",
      subtitle: "Click to get started",
      action: () => router.push("/qr-codes"),
      icon: QrCode,
    },
  ];
  return (
    <div className="bg-white rounded-xl shadow mb-8">
      <div className="px-6 pt-6 pb-2 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-blue-600" />
        <h2 className="text-2xl font-semibold">Quick Actions</h2>
      </div>
      <div className="p-6 pt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="flex items-center w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-5 transition group text-left"
          >
            <action.icon className="h-6 w-6 text-blue-600 mr-4" />
            <div>
              <div className="font-semibold text-gray-900 text-lg">
                {action.title}
              </div>
              <div className="text-gray-500 text-sm mt-1">
                {action.subtitle}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
