"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Building2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/supabase/config";

const DEMO_EMAIL = "demo@estateflow.com";
const DEMO_PASSWORD = "estateflow-demo";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectedFrom = searchParams.get("redirectedFrom") || "/dashboard";
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  async function signIn(nextEmail: string, nextPassword: string, mode: "form" | "demo") {
    setError("");

    if (!hasSupabaseEnv()) {
      setError("Supabase environment variables are not configured yet.");
      return;
    }

    if (mode === "demo") {
      setDemoLoading(true);
    } else {
      setLoading(true);
    }

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: nextEmail,
      password: nextPassword,
    });

    setLoading(false);
    setDemoLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    router.replace(redirectedFrom);
    router.refresh();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await signIn(email, password, "form");
  }

  async function handleDemoSignIn() {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    await signIn(DEMO_EMAIL, DEMO_PASSWORD, "demo");
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <Link href="/" className="mb-8 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-heading font-bold tracking-tight">
            Estate<span className="text-amber-400">Flow</span>
          </span>
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl font-heading font-bold text-neutral-900">Welcome back</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Sign in to save listings and open the agent dashboard.
          </p>
        </div>

        <div className="mb-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-heading font-bold text-emerald-950">
                Demo account
              </p>
              <p className="mt-1 text-xs font-medium text-emerald-800">
                {DEMO_EMAIL} / {DEMO_PASSWORD}
              </p>
            </div>
            <Button
              type="button"
              onClick={handleDemoSignIn}
              disabled={loading || demoLoading}
              className="h-9 rounded-xl bg-emerald-800 px-4 text-xs font-semibold text-white hover:bg-emerald-700"
            >
              {demoLoading && <Loader2 className="mr-2 size-3.5 animate-spin" />}
              Sign in demo
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Email
            </label>
            <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Password
            </label>
            <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
              {error}
            </p>
          )}

          <Button type="submit" disabled={loading || demoLoading} className="w-full h-11 rounded-xl bg-emerald-800 text-white hover:bg-emerald-700">
            {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
            Sign in
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-neutral-500">
          No account?{" "}
          <Link href="/signup" className="font-semibold text-emerald-800 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
