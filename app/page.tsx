import Link from "next/link";

import { auth } from "../lib/auth";
import { headers } from "next/headers";

import Signout from "./components/SignInButton";
// import Signout from "./_components/signout";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center px-6">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-5xl font-bold">🏠 Rentella</h1>
        <p className="text-xl text-gray-600">
          The easiest way to rent or sell properties in Ethiopia.
        </p>
        <Link
          href="/login"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
        >
          Login with Telegram
        </Link>
        <div className="pt-10 space-y-2">
          <h2 className="text-lg font-semibold">Features</h2>
          <ul className="text-gray-700 list-disc list-inside">
            <li>Post properties for rent or sale</li>
            <li>Search by map or location</li>
            <li>Role-based access for agents, owners, and renters</li>
          </ul>
        </div>
      </div>

      <Signout />

      {!session ? "Not authenticated" : session.user.name}
    </main>
  );
}
