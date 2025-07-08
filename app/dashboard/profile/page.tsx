"use client";
import CompanyCard from "@/components/dashboard/campany-card";
import { HostCard } from "@/components/dashboard/host-card";
import HostProfile from "@/components/dashboard/host-profile";
import { authClient } from "@/lib/auth-client";

export default function page() {
  const {
    data: session,
    isPending, //loading state
  } = authClient.useSession();

  if (isPending) return <>Loading</>;
  const user = session?.user;
  const telegram_id = user?.email.split("#")[1];

  return (
    <HostProfile>
      <HostCard user={user!} />
      <CompanyCard telegram_id={telegram_id!} />
      {/* <BasicMoreOptions /> */}
    </HostProfile>
  );
}
