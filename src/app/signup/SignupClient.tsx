"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Building2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/supabase/config";

export default function SignupClient() {
  const router = useRouter();
  const [email, setEmail] = useState("demo@estateflow.com");
  const [password, setPassword] = useState("estateflow-demo");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!hasSupabaseEnv()) {
      setError("Supabase environment variables are not configured yet.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    if (data.session) {
      router.replace("/dashboard");
      router.refresh();
      return;
    }

    setMessage("Check your email to confirm the new EstateFlow account.");
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
          <h1 className="text-2xl font-heading font-bold text-neutral-900">Create account</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Create a demo user for saved listings and dashboard access.
          </p>
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
            <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} />
          </div>

          {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-700">{error}</p>}
          {message && <p className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">{message}</p>}

          <Button type="submit" disabled={loading} className="w-full h-11 rounded-xl bg-emerald-800 text-white hover:bg-emerald-700">
            {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
            Create account
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-neutral-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-emerald-800 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
