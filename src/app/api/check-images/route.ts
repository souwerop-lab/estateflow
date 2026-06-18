import { NextResponse } from "next/server";
import { properties } from "@/data/properties";
import { agents } from "@/data/agents";

export async function GET() {
  const allUrls: { id: string; url: string }[] = [];

  properties.forEach((p) => {
    p.images.forEach((url, idx) => {
      allUrls.push({ id: `${p.id} [img ${idx}]`, url });
    });
  });

  agents.forEach((a) => {
    allUrls.push({ id: `agent-${a.id} (${a.name})`, url: a.avatar });
  });

  const results = await Promise.all(
    allUrls.map(async ({ id, url }) => {
      try {
        const res = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(4000) });
        return {
          id,
          url,
          ok: res.ok,
          status: res.status,
        };
      } catch (e: unknown) {
        return {
          id,
          url,
          ok: false,
          error: e instanceof Error ? e.message : "Timeout/Network Error",
        };
      }
    })
  );

  const failed = results.filter((r) => !r.ok);

  return NextResponse.json({
    total: results.length,
    passed: results.length - failed.length,
    failedCount: failed.length,
    failed,
    all: results,
  });
}
