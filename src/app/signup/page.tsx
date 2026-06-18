import type { Metadata } from "next";
import SignupClient from "./SignupClient";

export const metadata: Metadata = {
  title: "Sign Up | EstateFlow",
  description: "Create an EstateFlow account for saved listings and dashboard access.",
};

export default function SignupPage() {
  return <SignupClient />;
}
