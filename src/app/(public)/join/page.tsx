import { redirect } from "next/navigation";

export default function JoinPage() {
  redirect("/sign-in?mode=sign-up");
}
