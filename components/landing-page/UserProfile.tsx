import SignIN from "./SignIn";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import UserDropDown from "./UserDropDown";
import Link from "next/link";
import { Button } from "../ui/button";
import { LayoutDashboard } from "lucide-react";

const UserProfile = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if (!session) {
    return <SignIN />;
  }
  const user = session.user;
  console.log(user.role);

  return (
    <>
      <div>
        {(user.role + " " == "agent" || "landlord" || "admin") && (
          <Link href="/dashboard">
            <Button className="hidden sm:inline-flex gap-2">
              <LayoutDashboard className="w-4 h-4" />
              List Property
            </Button>
          </Link>
        )}
      </div>
      <UserDropDown user={user} />
    </>
  );
};

export default UserProfile;
