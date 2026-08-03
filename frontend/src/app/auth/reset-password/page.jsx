"use client";

import { Suspense } from "react";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import AuthShell from "@/components/auth/AuthShell";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <AuthShell title="Reset password" subtitle="Loading your secure link...">
          <div className="h-40 animate-pulse rounded-xl bg-slate-100" />
        </AuthShell>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
