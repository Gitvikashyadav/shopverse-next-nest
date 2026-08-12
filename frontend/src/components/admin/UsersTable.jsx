// "use client";
// import { useState } from "react";
// import Pagination from "./Pagination";
// import { useAdminUsers } from "@/hooks/useAdminUsers";

// const PAGE_SIZE = 8;

// export default function UsersTable() {
//   const [page, setPage] = useState(1);
//   const skip = (page - 1) * PAGE_SIZE;
//   const { users, total, loading } = useAdminUsers(skip, PAGE_SIZE);
//   const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

//   return (
//     <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
//       <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
//         <h3 className="text-sm font-semibold text-neutral-900">
//           All customers <span className="text-neutral-400 font-normal">({total})</span>
//         </h3>
//       </div>

//       {loading ? (
//         <p className="p-10 text-center text-sm text-neutral-500">Loading…</p>
//       ) : users.length === 0 ? (
//         <p className="p-10 text-center text-sm text-neutral-500">No customers yet.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-500">
//               <tr>
//                 <th className="px-4 py-3">Name</th>
//                 <th className="px-4 py-3">Email</th>
//                 <th className="px-4 py-3">Role</th>
//                 <th className="px-4 py-3">Joined</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-neutral-100">
//               {users.map((u) => (
//                 <tr key={u.id} className="hover:bg-neutral-50/60">
//                   <td className="px-4 py-3">
//                     <div className="flex items-center gap-3">
//                       <div className="grid h-8 w-8 place-items-center rounded-full bg-neutral-900 text-xs font-semibold text-white">
//                         {u.name?.charAt(0)?.toUpperCase() || "?"}
//                       </div>
//                       <span className="font-medium text-neutral-900">{u.name}</span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 text-neutral-600">{u.email}</td>
//                   <td className="px-4 py-3">
//                     <span
//                       className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
//                         u.role === "admin"
//                           ? "bg-[var(--gold)]/10 text-[var(--gold-dark,#9a6b1e)]"
//                           : "bg-neutral-100 text-neutral-600"
//                       }`}
//                     >
//                       {u.role || "customer"}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 text-neutral-500">
//                     {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <Pagination page={page} totalPages={totalPages} onChange={setPage} />
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { X, Mail, Calendar, ShieldCheck, Package } from "lucide-react";
import Pagination from "./Pagination";
import { useAdminUsers } from "@/hooks/useAdminUsers";

const PAGE_SIZE = 8;

export default function UsersTable() {
  const [page, setPage] = useState(1);
  const skip = (page - 1) * PAGE_SIZE;
  const { users, total, loading } = useAdminUsers(skip, PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const [selectedUser, setSelectedUser] = useState(null); // ← NEW

  return (
    <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
        <h3 className="text-sm font-semibold text-neutral-900">
          All customers <span className="text-neutral-400 font-normal">({total})</span>
        </h3>
      </div>

      {loading ? (
        <p className="p-10 text-center text-sm text-neutral-500">Loading…</p>
      ) : users.length === 0 ? (
        <p className="p-10 text-center text-sm text-neutral-500">No customers yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {users.map((u) => (
                <tr
                  key={u.id}
                  onClick={() => setSelectedUser(u)}               // ← NEW
                  className="cursor-pointer hover:bg-neutral-50/60"  // ← added cursor-pointer
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-neutral-900 text-xs font-semibold text-white">
                        {u.name?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                      <span className="font-medium text-neutral-900">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{u.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                        u.role === "admin"
                          ? "bg-[var(--gold)]/10 text-[var(--gold-dark,#9a6b1e)]"
                          : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {u.role || "customer"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-neutral-500">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      {selectedUser && (
        <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}

// ── NEW COMPONENT ──────────────────────────────────────────
function UserDetailModal({ user, onClose }) {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useState(() => {
    (async () => {
      try {
        const res = await fetch(`/api/orders?skip=0&take=50`, { cache: "no-store" });
        const data = await res.json();
        const userOrders = (data.orders || []).filter(
          (o) => o.customerEmail === user.email
        );
        setOrders(userOrders);
      } catch (err) {
        console.error("Error fetching user orders:", err);
      } finally {
        setLoadingOrders(false);
      }
    })();
  }, [user.email]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-neutral-900 text-sm font-semibold text-white">
              {user.name?.charAt(0)?.toUpperCase() || "?"}
            </div>
            <div>
              <p className="font-semibold text-neutral-900">{user.name}</p>
              <p className="text-xs text-neutral-500">{user.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-md text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto px-5 py-4 space-y-5">
          {/* Basic info */}
          <div className="grid gap-3 sm:grid-cols-2">
            <InfoRow icon={Mail} label="Email" value={user.email} />
            <InfoRow
              icon={ShieldCheck}
              label="Role"
              value={user.role || "customer"}
            />
            <InfoRow
              icon={Calendar}
              label="Joined"
              value={user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
            />
            <InfoRow icon={Package} label="Total orders" value={orders.length} />
          </div>

          {/* Order history */}
          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Order history
            </h4>
            {loadingOrders ? (
              <p className="text-sm text-neutral-500">Loading orders…</p>
            ) : orders.length === 0 ? (
              <p className="text-sm text-neutral-500">No orders placed yet.</p>
            ) : (
              <div className="space-y-2">
                {orders.map((o) => (
                  <div
                    key={o.id}
                    className="flex items-center justify-between rounded-md border border-neutral-200 px-3 py-2 text-sm"
                  >
                    <div>
                      <p className="font-medium text-neutral-900">
                        {o.items?.length || 0} item{o.items?.length === 1 ? "" : "s"}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {o.createdAt ? new Date(o.createdAt).toLocaleDateString() : "—"} · {o.method?.toUpperCase()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-neutral-900">${o.amount}</p>
                      <span className="text-[10px] uppercase text-neutral-500">{o.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-neutral-200 px-3 py-2">
      <Icon className="h-4 w-4 text-neutral-400" />
      <div>
        <p className="text-[10px] uppercase tracking-wide text-neutral-400">{label}</p>
        <p className="text-sm font-medium text-neutral-900">{value}</p>
      </div>
    </div>
  );
}