
"use client";
import OrdersTable from "@/components/admin/OrdersTable";
import { useState } from "react";
import { Package, Users, TrendingUp,ClipboardList } from "lucide-react";
import ProductForm from "@/components/admin/ProductForm";
import ProductTable from "@/components/admin/ProductTable";
import UsersTable from "@/components/admin/UsersTable";
import { useAdminProducts } from "@/hooks/useAdminProducts";

const TABS = [
  { key: "products", label: "Products", icon: Package },
  { key: "orders", label: "Orders", icon: ClipboardList },
  { key: "customers", label: "Customers", icon: Users },
];

export default function AdminPage() {
  const [tab, setTab] = useState("products");
  const { products, loading, addProduct, deleteProduct, updateProduct } =
    useAdminProducts();
  const [editingProduct, setEditingProduct] = useState(null);
  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
              Admin
            </p>
            <h1 className="mt-1 font-serif text-3xl text-neutral-900">
              Dashboard
            </h1>
          </div>
        </header>

        {/* Stat cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={Package}
            label="Total products"
            value={products.length}
          />
          <StatCard
            icon={Users}
            label="Registered customers"
            value="—"
            note="See Customers tab"
          />
          <StatCard
            icon={TrendingUp}
            label="On sale"
            value={products.filter((p) => p.oldPrice).length}
          />
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 border-b border-neutral-200">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                tab === key
                  ? "border-neutral-900 text-neutral-900"
                  : "border-transparent text-neutral-400 hover:text-neutral-600"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {/* {tab === "products" && (
          <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
            <ProductForm onCreate={addProduct} />
            <section>
              {loading ? (
                <p className="text-sm text-neutral-500">Loading…</p>
              ) : (
                <ProductTable products={products} onDelete={deleteProduct} />
              )}
            </section>
          </div>
        )} */}
        {tab === "products" && (
          <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
            <ProductForm
              onCreate={addProduct}
              onUpdate={updateProduct}
              editingProduct={editingProduct}
              onCancelEdit={() => setEditingProduct(null)}
            />
            <section>
              {loading ? (
                <p className="text-sm text-neutral-500">Loading…</p>
              ) : (
                <ProductTable
                  products={products}
                  onDelete={deleteProduct}
                  onEdit={setEditingProduct}
                />
              )}
            </section>
          </div>
        )}

        {tab === "customers" && <UsersTable />}
        {tab === "orders" && <OrdersTable />}
      </div>
    </main>
  );
}

function StatCard({ icon: Icon, label, value, note }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wide text-neutral-400">
          {label}
        </p>
        <div className="grid h-8 w-8 place-items-center rounded-md bg-neutral-100 text-neutral-600">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-2 font-serif text-2xl text-neutral-900">{value}</p>
      {note && <p className="mt-1 text-xs text-neutral-400">{note}</p>}
    </div>
  );
}
