"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import AuthShell from "@/components/auth/AuthShell";
import PasswordInput from "@/components/auth/PasswordInput";
// import { verifyResetToken, resetPassword } from "@/lib/auth-api";

/* password strength ------------------------------------------------ */
function scorePassword(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(s, 4);
}
const STRENGTH = [
  { label: "Too weak", bar: "w-1/5 bg-red-500", text: "text-red-600" },
  { label: "Weak", bar: "w-2/5 bg-orange-500", text: "text-orange-600" },
  { label: "Fair", bar: "w-3/5 bg-amber-500", text: "text-amber-600" },
  { label: "Strong", bar: "w-4/5 bg-lime-500", text: "text-lime-600" },
  {
    label: "Excellent",
    bar: "w-full bg-emerald-500",
    text: "text-emerald-600",
  },
];

export default function ResetPasswordForm() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  const [state, setState] = useState("valid"); // checking | valid | invalid | done
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  /* 1. verify token on mount */
  // useEffect(() => {
  //   if (!token) {
  //     setState("invalid");
  //     return;
  //   }
  //   let alive = true;
  //   (async () => {
  //     try {
  //       const data = await verifyResetToken(token);
  //       if (!alive) return;
  //       if (data?.verifyResetToken?.valid) {
  //         setEmail(data.verifyResetToken.email || "");
  //         setState("valid");
  //       } else {
  //         setState("invalid");
  //       }
  //     } catch {
  //       if (alive) setState("invalid");
  //     }
  //   })();
  //   return () => {
  //     alive = false;
  //   };
  // }, [token]);

  const score = useMemo(() => scorePassword(pw), [pw]);
  const meter = STRENGTH[score];
  const mismatch = confirm.length > 0 && pw !== confirm;
  const canSubmit = pw.length >= 8 && pw === confirm && !submitting;

  /* 2. submit new password */
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (pw.length < 8)
      return setError("Password must be at least 8 characters.");
    if (pw !== confirm) return setError("Passwords do not match.");

    setSubmitting(true);
    try {
      const data = await resetPassword(token, pw);
      if (data?.resetPassword?.success) {
        setState("done");
        toast.success("Password updated");
        setTimeout(() => router.push("/login"), 2500);
      } else {
        setError(data?.resetPassword?.message || "Could not reset password.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  /* ---------- checking ---------- */
  if (state === "checking") {
    return (
      <AuthShell
        title="Verifying link"
        subtitle="Just a moment while we check your reset link."
      >
        <div className="space-y-3">
          <div className="h-11 animate-pulse rounded-xl bg-slate-100" />
          <div className="h-11 animate-pulse rounded-xl bg-slate-100" />
          <div className="h-11 w-2/3 animate-pulse rounded-xl bg-slate-100" />
        </div>
      </AuthShell>
    );
  }

  /* ---------- invalid / expired ---------- */
  if (state === "invalid") {
    return (
      <AuthShell
        title="This link has expired"
        subtitle="Reset links are valid for 30 minutes and can only be used once."
        footer={
          <Link
            href="/auth/login"
            className="font-medium text-slate-900 hover:underline"
          >
            Back to sign in
          </Link>
        }
      >
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-900">
            For your security we couldn&apos;t verify this link. Request a fresh
            one and we&apos;ll email it right away.
          </p>
        </div>
        <Link
          href="/auth/forgot-password"
          className="mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Send a new reset link
        </Link>
      </AuthShell>
    );
  }

  /* ---------- success ---------- */
  if (state === "done") {
    return (
      <AuthShell
        title="Password updated"
        subtitle="You can now sign in with your new password."
      >
        <div className="flex flex-col items-center py-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
            <svg
              className="h-7 w-7 text-emerald-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <p className="mt-4 text-sm text-slate-600">
            Redirecting you to sign in...
          </p>
          <Link
            href="/login"
            className="mt-4 text-sm font-semibold text-slate-900 hover:underline"
          >
            Go now
          </Link>
        </div>
      </AuthShell>
    );
  }

  /* ---------- valid: the form ---------- */
  return (
    <AuthShell
      title="Choose a new password"
      subtitle={
        email
          ? `Resetting the password for ${email}`
          : "Make it strong and memorable."
      }
      footer={
        <Link
          href="/login"
          className="font-medium text-slate-900 hover:underline"
        >
          Back to sign in
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            New password
          </label>
          <PasswordInput
            id="password"
            name="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="At least 8 characters"
            autoComplete="new-password"
            required
          />

          {pw.length > 0 && (
            <div className="mt-2.5">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${meter.bar}`}
                />
              </div>
              <p className={`mt-1.5 text-xs font-medium ${meter.text}`}>
                {meter.label}
              </p>
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="confirm"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Confirm password
          </label>
          <PasswordInput
            id="confirm"
            name="confirm"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Re-enter your password"
            autoComplete="new-password"
            required
          />
          {mismatch && (
            <p className="mt-1.5 text-xs font-medium text-red-600">
              Passwords don&apos;t match
            </p>
          )}
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="flex h-12 w-full items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {submitting ? "Updating..." : "Update password"}
        </button>
      </form>
    </AuthShell>
  );
}
