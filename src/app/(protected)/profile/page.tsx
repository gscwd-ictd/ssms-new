// import UserProfile from "@ssms/components/features/userProfile/UserProfile";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile",
};

export default function Profile() {
  redirect("/dashboard");

  // return (
  //   <div>
  //     <UserProfile />
  //   </div>
  // );
}
