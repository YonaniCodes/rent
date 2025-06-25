import SignIN from "./SignIn";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import UserDropDown from "./UserDropDown";

const UserProfile = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if (!session) {
    return <SignIN />;
  }
  const user = session.user;
  return <UserDropDown user={user} />;
};

export default UserProfile;
