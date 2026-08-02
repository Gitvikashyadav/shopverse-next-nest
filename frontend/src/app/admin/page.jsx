"use client";
import ProductForm from "@/components/admin/ProductForm";
import ProductTable from "@/components/admin/ProductTable";
import { useAdminProducts } from "@/hooks/useAdminProducts";

export default function AdminPage() {
  const { products, loading, addProduct, deleteProduct } = useAdminProducts();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Admin</p>
        <h1 className="text-2xl font-semibold">Product management</h1>
      </header>

      <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
        <ProductForm onCreate={addProduct} />
        <section>
          <h2 className="mb-3 text-lg font-semibold">All products ({products.length})</h2>
          {loading ? <p className="text-sm text-neutral-500">Loading…</p>
            : <ProductTable products={products} onDelete={deleteProduct} />}
        </section>
      </div>
    </main>
  );
}
