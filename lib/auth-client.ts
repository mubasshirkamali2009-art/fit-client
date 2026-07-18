import { createAuthClient } from "better-auth/react";

// ─── Safe base URL resolution ─────────────────────────────────────────────────
// Mirrors the logic in lib/auth.ts so client and server always agree,
// and so a missing/malformed NEXT_PUBLIC_APP_URL never crashes the build.
function resolveBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_APP_URL?.trim();

  if (!raw) return "http://localhost:3000";

  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    new URL(candidate);
    return candidate;
  } catch {
    console.warn(
      `[auth-client] NEXT_PUBLIC_APP_URL="${raw}" is not a valid URL. Falling back to http://localhost:3000`
    );
    return "http://localhost:3000";
  }
}

export const authClient = createAuthClient({
  baseURL: resolveBaseUrl(),
});

// Convenience destructured exports
export const { signIn, signUp, signOut, useSession } = authClient;