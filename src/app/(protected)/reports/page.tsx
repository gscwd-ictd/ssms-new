import { auth } from "@ssms/lib/auth";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Reports",
};

export default async function Reports() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user.role !== "support") {
    redirect("/tickets");
  }

  return <div>Reports</div>;
}
