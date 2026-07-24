"use client";

export default function ShopFilters({ categories, active, onChange, sort, onSortChange }) {
  return (
    <aside className="lg:sticky lg:top-24 h-max space-y-8">
      <div>
        <h3 className="text-xs tracking-widest uppercase text-neutral-500 mb-4">Category</h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => onChange("All")}
              className={`text-sm ${active === "All" ? "text-neutral-900 font-semibold" : "text-neutral-600 hover:text-neutral-900"}`}
            >
              All Products
            </button>
          </li>
          {categories.map((c) => (
            <li key={c}>
              <button
                onClick={() => onChange(c)}
                className={`text-sm ${active === c ? "text-neutral-900 font-semibold" : "text-neutral-600 hover:text-neutral-900"}`}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xs tracking-widest uppercase text-neutral-500 mb-4">Sort By</h3>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full border border-neutral-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-neutral-900"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name (A–Z)</option>
        </select>
      </div>
    </aside>
  );
}
