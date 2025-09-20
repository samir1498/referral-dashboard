import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("auth");

  if (authCookie) {
    redirect("/dashboard/referrals");
  } else {
    redirect("/auth");
  }

}