"use client";

import { authClient } from "@/lib/auth-client";

export default function WelcomeHeader() {
  const {
    data: session,
    isPending, //loading state
  } = authClient.useSession();

  if (isPending) return <>Loading</>;

  const user = session?.user;
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-2">
          Welcome back, {user!.name || "Sarah Landlord"}!{" "}
          <span className="text-3xl">👋</span>
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Here&apos;s what&apos;s happening with your properties today.
        </p>
      </div>
      <div className="mt-4 md:mt-0 flex justify-end">
        <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-medium text-sm shadow-sm">
          {user!.role!.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
