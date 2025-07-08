import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("supabase_auth_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "No token found" }, { status: 401 });
  }

  return NextResponse.json({ token });
}
