"use client";

import { useState } from "react";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import SocialButtons from "@/components/auth/SocialButtons";
import PasswordInput from "@/components/auth/PasswordInput";
import toast from "react-hot-toast";

export default function LoginPage() {
  
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // TODO: replace with your backend API call
      const res = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      //main perpos wait 8 second
      await new Promise((r) => setTimeout(r, 800));
      toast.success("Login successfully!");
      console.log("resopne out put ",res);
      
      console.log("Login payload:", form);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue to your account."
      footer={
        <>
          New to LUXE?{" "}
          <Link href="/signup" className="font-medium text-neutral-900 underline underline-offset-4">
            Create an account
          </Link>
        </>
      }
    >
      <SocialButtons />

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-neutral-200" />
        <span className="text-xs uppercase tracking-widest text-neutral-400">or</span>
        <span className="h-px flex-1 bg-neutral-200" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wider text-neutral-600 mb-1.5">
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
          <div className="flex justify-between items-center mb-1.5">
            <label htmlFor="password" className="block text-xs font-medium uppercase tracking-wider text-neutral-600">
              Password
            </label>
            <Link href="/forgot-password" className="text-xs text-neutral-500 hover:text-neutral-900">
              Forgot?
            </Link>
          </div>
          <PasswordInput
            id="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-neutral-600">
          <input type="checkbox" className="w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900" />
          Remember me for 30 days
        </label>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-neutral-900 text-white text-sm font-medium uppercase tracking-wider rounded-md hover:bg-neutral-800 disabled:opacity-60 transition"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </AuthShell>
  );
}
