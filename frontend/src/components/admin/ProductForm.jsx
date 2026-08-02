"use client";
import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { generateDescription } from "@/lib/aiDescription";

export default function ProductForm({ onCreate }) {
  const [form, setForm] = useState({ name: "", price: "", image: "", description: "" });
  const [genLoading, setGenLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleGenerate = async () => {
    if (!form.name || !form.price) return setMsg("Enter name and price first.");
    setMsg(""); setGenLoading(true);
    try {
      const description = await generateDescription({ name: form.name, price: form.price });
      setForm((f) => ({ ...f, description }));
    } finally { setGenLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.image) return setMsg("Name, price and image are required.");
    setSaving(true);
    try {
      await onCreate({ ...form, price: Number(form.price) });
      setForm({ name: "", price: "", image: "", description: "" });
      setMsg("Product added.");
    } finally { setSaving(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-neutral-200 bg-white p-6 space-y-4">
      <h2 className="text-lg font-semibold">Add product</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-neutral-500">Name</label>
          <input value={form.name} onChange={set("name")} placeholder="Cashmere Overcoat"
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900" />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-neutral-500">Price (USD)</label>
          <input type="number" min="0" value={form.price} onChange={set("price")} placeholder="890"
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900" />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs uppercase tracking-wide text-neutral-500">Image URL</label>
        <input value={form.image} onChange={set("image")} placeholder="https://…"
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900" />
        {form.image && (
          <img src={form.image} alt="" className="mt-3 h-32 w-32 rounded-md object-cover border border-neutral-200" />
        )}
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="text-xs uppercase tracking-wide text-neutral-500">Description</label>
          <button type="button" onClick={handleGenerate} disabled={genLoading}
            className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50">
            {genLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
            {genLoading ? "Generating…" : "Generate with AI"}
          </button>
        </div>
        <textarea rows={5} value={form.description} onChange={set("description")}
          placeholder="Click “Generate with AI” or write your own."
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900" />
      </div>

      {msg && <p className="text-sm text-neutral-600">{msg}</p>}

      <button type="submit" disabled={saving}
        className="w-full rounded-md bg-neutral-900 py-2.5 text-sm font-medium text-white disabled:opacity-50 sm:w-auto sm:px-8">
        {saving ? "Saving…" : "Add product"}
      </button>
    </form>
  );
}
