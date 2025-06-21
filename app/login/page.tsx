import SignInButton from "../components/SignInButton";
import Image from "next/image";
import { auth } from "../../lib/auth";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log("sessinn", session);
  return (
    <div className=" bg-white flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">
        Sign in to access your guest area
      </h2>

      {!session && <SignInButton />}

      {session && <UserProfile session={session} />}
    </div>
  );
}

function UserProfile({ session }: { session: any }) {
  const user = session?.user;

  return (
    <div className="max-w-sm w-full mx-auto p-6 rounded-3xl shadow-xl bg-gradient-to-br from-white via-gray-50 to-gray-100 border border-gray-200 flex flex-col items-center space-y-4">
      {/* Profile Picture */}
      <div className="relative w-28 h-28">
        <Image
          src={user?.image || "/default-profile.png"}
          alt={`${user?.name || "User"}'s profile`}
          width={112}
          height={112}
          className="rounded-full object-cover border-4 border-white shadow-md"
        />
      </div>

      {/* User Info */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {user?.name || "Anonymous"}
        </h2>
        {user?.email && (
          <p className="text-sm text-gray-500 mt-1">{user.email}</p>
        )}
      </div>

      {/* Optional Button */}
      <button className="mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition">
        Edit Profile
      </button>
    </div>
  );
}
