"use client";

import { useState } from "react";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import SocialButtons from "@/components/auth/SocialButtons";
import PasswordInput from "@/components/auth/PasswordInput";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Simple strength meter
  const strength = (() => {
    const p = form.password;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s; // 0-4
  })();
  const strengthLabel = ["Too short", "Weak", "Fair", "Good", "Strong"][
    strength
  ];
  const strengthColor = [
    "bg-neutral-200",
    "bg-red-400",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-green-500",
  ][strength];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!agree) return setError("Please accept the Terms to continue.");
    if (strength < 2) return setError("Please choose a stronger password.");
    setLoading(true);
    try {
      //Merge first and last name
      const payload = {
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        password: form.password,
      };
      // TODO: replace with your backend API call
      const res = await fetch("http://localhost:5000/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Signup failed");
      await new Promise((r) => setTimeout(r, 800));
      toast.success("Account created successfully!");
      //Redirect login page 
      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
      console.log("Signup payload:", payload);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join LUXE and unlock exclusive member benefits."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-neutral-900 underline underline-offset-4"
          >
            Sign in
          </Link>
        </>
      }
    >
      <SocialButtons />

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-neutral-200" />
        <span className="text-xs uppercase tracking-widest text-neutral-400">
          or
        </span>
        <span className="h-px flex-1 bg-neutral-200" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="firstName"
              className="block text-xs font-medium uppercase tracking-wider text-neutral-600 mb-1.5"
            >
              First name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              value={form.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-md text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-xs font-medium uppercase tracking-wider text-neutral-600 mb-1.5"
            >
              Last name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              value={form.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-md text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-xs font-medium uppercase tracking-wider text-neutral-600 mb-1.5"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-4 py-2.5 border border-neutral-300 rounded-md text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-xs font-medium uppercase tracking-wider text-neutral-600 mb-1.5"
          >
            Password
          </label>
          <PasswordInput
            id="password"
            name="password"
            placeholder="At least 8 characters"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
          {form.password && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${strengthColor} transition-all`}
                  style={{ width: `${(strength / 4) * 100}%` }}
                />
              </div>
              <span className="text-xs text-neutral-500 w-16 text-right">
                {strengthLabel}
              </span>
            </div>
          )}
        </div>

        <label className="flex items-start gap-2 text-sm text-neutral-600">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
          />
          <span>
            I agree to the{" "}
            <Link href="/terms" className="underline underline-offset-2">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-neutral-900 text-white text-sm font-medium uppercase tracking-wider rounded-md hover:bg-neutral-800 disabled:opacity-60 transition"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>
    </AuthShell>
  );
}
