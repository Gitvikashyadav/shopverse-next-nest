// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import AuthShell from "@/components/auth/AuthShell";
// import toast from "react-hot-toast";
// // import { gql, FORGOT_PASSWORD } from "@/lib/graphql";

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [sent, setSent] = useState(false);
//   const [cooldown, setCooldown] = useState(0);

//   const startCooldown = () => {
//     setCooldown(45);
//     const id = setInterval(() => {
//       setCooldown((c) => {
//         if (c <= 1) {
//           clearInterval(id);
//           return 0;
//         }
//         return c - 1;
//       });
//     }, 1000);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       await gql(FORGOT_PASSWORD, { email: email.trim().toLowerCase() });
//       setSent(true);
//       startCooldown();
//       toast.success("Reset link sent");
//     } catch (err) {
//       // Don't leak whether the account exists — show success anyway
//       setSent(true);
//       startCooldown();
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------- success state ---------- */
//   if (sent) {
//     return (
//       <AuthShell
//         title="Check your inbox"
//         subtitle="We've sent a secure reset link to your email."
//         footer={
//           <>
//             Remembered it?{" "}
//             <Link
//               href="/auth/login"
//               className="font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-600"
//             >
//               Back to sign in
//             </Link>
//           </>
//         }
//       >
//         <div className="flex flex-col items-center text-center">
//           <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900">
//             <svg
//               className="h-6 w-6 text-white"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.6"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M3 8l7.9 5.3a2 2 0 002.2 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//               />
//             </svg>
//           </div>

//           <p className="mt-5 text-sm text-neutral-600">
//             If an account exists for
//           </p>
//           <p className="text-sm font-medium text-neutral-900">{email}</p>
//           <p className="mt-1 text-sm text-neutral-600">
//             you'll receive a link within a minute. It expires in 15 minutes.
//           </p>

//           <div className="mt-6 w-full rounded-md border border-neutral-200 bg-neutral-50 px-4 py-3 text-left">
//             <p className="text-[11px] leading-relaxed text-neutral-500">
//               Can't find it? Check your spam folder, or make sure you entered
//               the address associated with your LUXE account.
//             </p>
//           </div>

//           <button
//             type="button"
//             disabled={cooldown > 0 || loading}
//             onClick={handleSubmit}
//             className="mt-5 text-sm font-medium text-neutral-900 underline underline-offset-4 transition hover:text-neutral-600 disabled:cursor-not-allowed disabled:text-neutral-400 disabled:no-underline"
//           >
//             {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend email"}
//           </button>
//         </div>
//       </AuthShell>
//     );
//   }

//   /* ---------- form state ---------- */
//   return (
//     <AuthShell
//       title="Forgot password?"
//       subtitle="Enter your email and we'll send you a link to reset it."
//       footer={
//         <>
//           Remembered it?{" "}
//           <Link
//             href="/auth/login"
//             className="font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-600"
//           >
//             Back to sign in
//           </Link>
//         </>
//       }
//     >
//       <form onSubmit={handleSubmit} className="space-y-5">
//         <div>
//           <label
//             htmlFor="email"
//             className="mb-1.5 block text-sm font-medium text-neutral-800"
//           >
//             Email
//           </label>
//           <input
//             id="email"
//             name="email"
//             type="email"
//             required
//             autoFocus
//             autoComplete="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="you@example.com"
//             className="w-full rounded-md border border-neutral-300 px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-neutral-900"
//           />
//         </div>

//         {error && (
//           <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
//             {error}
//           </p>
//         )}

//         <button
//           type="submit"
//           disabled={loading || !email}
//           className="flex w-full items-center justify-center gap-2 rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400"
//         >
//           {loading && (
//             <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//                 fill="none"
//               />
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//               />
//             </svg>
//           )}
//           {loading ? "Sending link..." : "Send reset link"}
//         </button>
//       </form>
//     </AuthShell>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
//  import { requestPasswordReset } from "@/lib/auth-api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await requestPasswordReset(email.trim().toLowerCase());
      setSent(true); // always — never reveal whether the email exists
    } catch (err) {
      setError(err.message || "Could not send the link. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <AuthShell
        title="Check your inbox"
        subtitle={`If an account exists for ${email}, we've sent a reset link.`}
        footer={
          <Link href="/login" className="font-medium text-slate-900 hover:underline">
            Back to sign in
          </Link>
        }
      >
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
          <p>The link expires in 30 minutes. Don&apos;t see it? Check your spam folder.</p>
        </div>
        <button
          onClick={() => setSent(false)}
          className="mt-5 h-12 w-full rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Use a different email
        </button>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Forgot your password?"
      subtitle="Enter your email and we'll send you a link to reset it."
      footer={
        <Link href="/login" className="font-medium text-slate-900 hover:underline">
          Back to sign in
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
            className="h-12 w-full rounded-xl border border-slate-300 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
          />
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !email}
          className="h-12 w-full rounded-xl bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-40"
        >
          {loading ? "Sending link..." : "Send reset link"}
        </button>
      </form>
    </AuthShell>
  );
}
