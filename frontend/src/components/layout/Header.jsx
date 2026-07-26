// "use client";
// import Link from "next/link";
// import { useState } from "react";
// import {
//   Search,
//   User,
//   Heart,
//   ShoppingBag,
//   Menu,
//   X,
//   ChevronDown,
// } from "lucide-react";
// import { NAV_LINKS, SITE_NAME } from "@/constants/site";

// export default function Header() {
//   const [open, setOpen] = useState(false);
//   const [accountOpen, setAccountOpen] = useState(false);

//   return (
//     <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[var(--border)]">
//       <div className="max-w-7xl mx-auto px-4 md:px-6">
//         <div className="h-16 md:h-20 flex items-center justify-between gap-4">
//           {/* Left: mobile menu + logo */}
//           <div className="flex items-center gap-3">
//             <button
//               className="md:hidden p-2 -ml-2"
//               onClick={() => setOpen(true)}
//               aria-label="Open menu"
//             >
//               <Menu className="h-6 w-6" />
//             </button>
//             <Link
//               href="/"
//               className="font-display text-2xl md:text-3xl font-bold tracking-tight"
//             >
//               {SITE_NAME}
//               <span className="text-[var(--gold)]">.</span>
//             </Link>
//           </div>

//           {/* Center: desktop nav */}
//           <nav className="hidden md:flex items-center gap-8">
//             {NAV_LINKS.map((l) => (
//               <Link
//                 key={l.href}
//                 href={l.href}
//                 className="text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors relative group"
//               >
//                 {l.label}
//                 <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--gold)] group-hover:w-full transition-all duration-300" />
//               </Link>
//             ))}
//           </nav>

//           {/* Right: search + account + wishlist + cart */}
//           <div className="flex items-center gap-1 md:gap-2">
//             <button
//               className="p-2 hover:text-[var(--gold)] transition-colors"
//               aria-label="Search"
//             >
//               <Search className="h-5 w-5" />
//             </button>

//             {/* Account dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setAccountOpen((v) => !v)}
//                 onBlur={() => setTimeout(() => setAccountOpen(false), 150)}
//                 className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full border border-[var(--border)] hover:border-[var(--ink)] hover:bg-[var(--muted)] transition-all text-sm font-medium"
//               >
//                 <User className="h-4 w-4" />
//                 <span>Account</span>
//                 <ChevronDown
//                   className={`h-3.5 w-3.5 transition-transform ${accountOpen ? "rotate-180" : ""}`}
//                 />
//               </button>

//               <Link
//                 href="/login"
//                 className="sm:hidden p-2"
//                 aria-label="Account"
//               >
//                 <User className="h-5 w-5" />
//               </Link>

//               {accountOpen && (
//                 <div className="absolute right-0 mt-2 w-56 bg-white border border-[var(--border)] rounded-xl shadow-xl overflow-hidden">
//                   <div className="p-4 border-b border-[var(--border)]">
//                     <p className="text-sm text-[var(--ink-soft)]">Welcome</p>
//                     <p className="text-base font-semibold">
//                       Sign in to your account
//                     </p>
//                   </div>
//                   <div className="p-2">
//                     <Link
//                       href="/login"
//                       className="block px-3 py-2.5 rounded-lg text-sm font-medium bg-[var(--ink)] text-white text-center hover:bg-black transition"
//                     >
//                       Log in
//                     </Link>
//                     <Link
//                       href="/register"
//                       className="block mt-2 px-3 py-2.5 rounded-lg text-sm font-medium text-center border border-[var(--border)] hover:border-[var(--ink)] transition"
//                     >
//                       Create account
//                     </Link>
//                   </div>
//                   <div className="border-t border-[var(--border)] p-2">
//                     <Link
//                       href="/account"
//                       className="block px-3 py-2 text-sm text-[var(--ink-soft)] hover:text-[var(--ink)]"
//                     >
//                       My Orders
//                     </Link>
//                     <Link
//                       href="/wishlist"
//                       className="block px-3 py-2 text-sm text-[var(--ink-soft)] hover:text-[var(--ink)]"
//                     >
//                       Wishlist
//                     </Link>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <Link
//               href="/wishlist"
//               className="hidden sm:inline-flex p-2 hover:text-[var(--gold)] transition-colors"
//               aria-label="Wishlist"
//             >
//               <Heart className="h-5 w-5" />
//             </Link>

//             <Link
//               href="/cart"
//               className="relative p-2 hover:text-[var(--gold)] transition-colors"
//               aria-label="Cart"
//             >
//               <ShoppingBag className="h-5 w-5" />
//               <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-[var(--gold)] text-white text-[10px] font-bold flex items-center justify-center">
//                 0
//               </span>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Mobile drawer
//       {open && (
//         <div className="fixed inset-0 z-50 md:hidden">
//           <div
//             className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//             onClick={() => setOpen(false)}
//           />
//           <aside className="absolute left-0 top-0 max-h-[85vh] w-[82%] max-w-sm bg-white shadow-2xl rounded-br-2xl flex flex-col overflow-hidden">
//             <div className="flex items-center justify-between p-4 border-b border-[var(--border)] shrink-0">
//               <span className="font-display text-2xl font-bold">
//                 {SITE_NAME}
//                 <span className="text-[var(--gold)]">.</span>
//               </span>
//               <button
//                 onClick={() => setOpen(false)}
//                 aria-label="Close menu"
//                 className="p-1.5 rounded-full text-[var(--ink-soft)] hover:text-white hover:bg-[var(--ink)] transition-colors duration-200"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
//             <nav className="overflow-y-auto p-3 space-y-0.5">
//               {NAV_LINKS.map((l) => (
//                 <Link
//                   key={l.href}
//                   href={l.href}
//                   onClick={() => setOpen(false)}
//                   className="flex items-center px-3 py-3 rounded-lg text-base font-medium text-[var(--ink)] hover:bg-[var(--muted)] hover:text-[var(--gold-dark)] hover:pl-4 transition-all duration-200"
//                 >
//                   {l.label}
//                 </Link>
//               ))}
//             </nav>
//             <div className="p-4 border-t border-[var(--border)] space-y-2">
//               <Link
//                 href="/login"
//                 className="block w-full text-center px-4 py-3 rounded-lg bg-[var(--ink)] text-white font-medium"
//               >
//                 Log in
//               </Link>
//               <Link
//                 href="/register"
//                 className="block w-full text-center px-4 py-3 rounded-lg border border-[var(--border)] font-medium"
//               >
//                 Create account
//               </Link>
//             </div>
//           </aside>
//         </div>
//       )} */}
//       {/* Mobile drawer */}
// {open && (
//   <div className="fixed inset-0 z-50 md:hidden">
//     <div
//       className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70 backdrop-blur-md transition-opacity duration-300"
//       onClick={() => setOpen(false)}
//     />
//     <aside className="absolute left-0 top-0 max-h-[85vh] w-[82%] max-w-sm bg-white shadow-2xl rounded-br-2xl flex flex-col overflow-hidden animate-in slide-in-from-left duration-300">
//       <div className="flex items-center justify-between p-4 border-b border-[var(--border)] shrink-0">
//         <span className="font-display text-2xl font-bold">
//           {SITE_NAME}<span className="text-[var(--gold)]">.</span>
//         </span>
//         <button
//           onClick={() => setOpen(false)}
//           aria-label="Close menu"
//           className="p-1.5 rounded-full text-[var(--ink-soft)] hover:text-white hover:bg-[var(--ink)] transition-colors duration-200"
//         >
//           <X className="h-5 w-5" />
//         </button>
//       </div>
//       <nav className="overflow-y-auto p-3 space-y-0.5">
//         {NAV_LINKS.map((l) => (
//           <Link
//             key={l.href}
//             href={l.href}
//             onClick={() => setOpen(false)}
//             className="flex items-center px-3 py-3 rounded-lg text-base font-medium text-[var(--ink)] hover:bg-[var(--muted)] hover:text-[var(--gold-dark)] hover:pl-4 transition-all duration-200"
//           >
//             {l.label}
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   </div>
// )}
//     </header>
//   );
// }
// "use client";
// import Link from "next/link";
// import { useState, useEffect, useRef } from "react";
// import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown, ChevronRight } from "lucide-react";
// import { NAV_LINKS, SITE_NAME } from "@/constants/site";

// export default function Header() {
//   const [open, setOpen] = useState(false);
//   const [visible, setVisible] = useState(false); // controls slide transition
//   const [accountOpen, setAccountOpen] = useState(false);
//   const accountRef = useRef(null);

//   // click-outside for account dropdown
//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (accountRef.current && !accountRef.current.contains(e.target)) {
//         setAccountOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // mount drawer, then trigger slide-in on next frame; reverse on close
//   const openDrawer = () => {
//     setOpen(true);
//     requestAnimationFrame(() => setVisible(true));
//   };
//   const closeDrawer = () => {
//     setVisible(false);
//     setTimeout(() => setOpen(false), 300); // match transition duration
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[var(--border)]">
//       <div className="max-w-7xl mx-auto px-4 md:px-6">
//         <div className="h-16 md:h-20 flex items-center justify-between gap-4">
//           <div className="flex items-center gap-3">
//             <button className="md:hidden p-2 -ml-2" onClick={openDrawer} aria-label="Open menu">
//               <Menu className="h-6 w-6" />
//             </button>
//             <Link href="/" className="font-display text-2xl md:text-3xl font-bold tracking-tight">
//               {SITE_NAME}
//               <span className="text-[var(--gold)]">.</span>
//             </Link>
//           </div>

//           <nav className="hidden md:flex items-center gap-8">
//             {NAV_LINKS.map((l) => (
//               <Link
//                 key={l.href}
//                 href={l.href}
//                 className="text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors relative group"
//               >
//                 {l.label}
//                 <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--gold)] group-hover:w-full transition-all duration-300" />
//               </Link>
//             ))}
//           </nav>

//           <div className="flex items-center gap-1 md:gap-2">
//             <button className="p-2 hover:text-[var(--gold)] transition-colors" aria-label="Search">
//               <Search className="h-5 w-5" />
//             </button>

//             <div className="relative" ref={accountRef}>
//               <button
//                 onClick={() => setAccountOpen((v) => !v)}
//                 className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full border border-[var(--border)] hover:border-[var(--ink)] hover:bg-[var(--muted)] transition-all text-sm font-medium"
//               >
//                 <User className="h-4 w-4" />
//                 <span>Account</span>
//                 <ChevronDown className={`h-3.5 w-3.5 transition-transform ${accountOpen ? "rotate-180" : ""}`} />
//               </button>

//               <Link href="/login" className="sm:hidden p-2" aria-label="Account">
//                 <User className="h-5 w-5" />
//               </Link>

//               {accountOpen && (
//                 <div className="absolute right-0 mt-2 w-56 bg-white border border-[var(--border)] rounded-xl shadow-xl overflow-hidden z-50">
//                   <div className="p-4 border-b border-[var(--border)]">
//                     <p className="text-sm text-[var(--ink-soft)]">Welcome</p>
//                     <p className="text-base font-semibold">Sign in to your account</p>
//                   </div>
//                   <div className="p-2">
//                     <Link href="/auth/login" className="block px-3 py-2.5 rounded-lg text-sm font-medium bg-[var(--ink)] text-white text-center hover:bg-black transition">
//                       Log in
//                     </Link>
//                     <Link href="/auth/signup" className="block mt-2 px-3 py-2.5 rounded-lg text-sm font-medium text-center border border-[var(--border)] hover:border-[var(--ink)] transition">
//                       Create account
//                     </Link>
//                   </div>
//                   <div className="border-t border-[var(--border)] p-2">
//                     <Link href="/account" className="block px-3 py-2 text-sm text-[var(--ink-soft)] hover:text-[var(--ink)]">My Orders</Link>
//                     <Link href="/wishlist" className="block px-3 py-2 text-sm text-[var(--ink-soft)] hover:text-[var(--ink)]">Wishlist</Link>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <Link href="/wishlist" className="hidden sm:inline-flex p-2 hover:text-[var(--gold)] transition-colors" aria-label="Wishlist">
//               <Heart className="h-5 w-5" />
//             </Link>

//             <Link href="/cart" className="relative p-2 hover:text-[var(--gold)] transition-colors" aria-label="Cart">
//               <ShoppingBag className="h-5 w-5" />
//               <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-[var(--gold)] text-white text-[10px] font-bold flex items-center justify-center">
//                 0
//               </span>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Mobile drawer */}
//       {open && (
//         <div className="fixed inset-0 z-[60] md:hidden">
//           <div
//             className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
//               visible ? "opacity-100" : "opacity-0"
//             }`}
//             onClick={closeDrawer}
//           />
//           <aside
//             className={`absolute left-0 top-0 h-screen w-[85%] max-w-[380px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
//               visible ? "translate-x-0" : "-translate-x-full"
//             }`}
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between px-6 h-20 border-b border-[var(--border)] shrink-0">
//               <span className="font-display text-2xl font-bold tracking-tight">
//                 {SITE_NAME}<span className="text-[var(--gold)]">.</span>
//               </span>
//               <button
//                 onClick={closeDrawer}
//                 aria-label="Close menu"
//                 className="p-2 -mr-2 text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>

//             {/* Nav */}
//             <nav className="flex-1 overflow-y-auto px-6 py-6">
//               <ul className="space-y-0.5">
//                 {NAV_LINKS.map((l) => (
//                   <li key={l.href} className="border-b border-[var(--border)]/60 last:border-0">
//                     <Link
//                       href={l.href}
//                       onClick={closeDrawer}
//                       className="group flex items-center justify-between py-4 text-[15px] font-medium tracking-[0.08em] uppercase text-[var(--ink)] hover:text-[var(--gold-dark)] transition-colors"
//                     >
//                       {l.label}
//                       <ChevronRight className="h-4 w-4 text-[var(--ink-soft)]/40 group-hover:text-[var(--gold-dark)] group-hover:translate-x-1 transition-all" />
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </nav>

//             {/* Footer CTA */}
//             <div className="px-6 py-6 border-t border-[var(--border)] shrink-0 space-y-3">
//               <Link
//                 href="/login"
//                 onClick={closeDrawer}
//                 className="block w-full text-center py-3 text-sm font-semibold tracking-wide bg-[var(--ink)] text-white hover:bg-[var(--gold-dark)] transition-colors duration-300"
//               >
//                 LOG IN
//               </Link>
//               <div className="flex items-center justify-center gap-6 pt-2 text-xs tracking-wide text-[var(--ink-soft)]">
//                 <Link href="/wishlist" onClick={closeDrawer} className="hover:text-[var(--gold-dark)] transition-colors">WISHLIST</Link>
//                 <span className="text-[var(--border)]">|</span>
//                 <Link href="/account" onClick={closeDrawer} className="hover:text-[var(--gold-dark)] transition-colors">MY ORDERS</Link>
//               </div>
//             </div>
//           </aside>
//         </div>
//       )}
//     </header>
//   );
// }

"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { NAV_LINKS, SITE_NAME } from "@/constants/site";
import { useWishlist } from "@/context/WishlistContext"; // ⭐ NEW
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);

  const { items: wishlistItems } = useWishlist(); // ⭐ NEW
  const wishlistCount = wishlistItems?.length || 0; // ⭐ NEW
  const { count: cartCount } = useCart();

  useEffect(() => {
    function handleClickOutside(e) {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openDrawer = () => {
    setOpen(true);
    requestAnimationFrame(() => setVisible(true));
  };
  const closeDrawer = () => {
    setVisible(false);
    setTimeout(() => setOpen(false), 300);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="h-16 md:h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 -ml-2"
              onClick={openDrawer}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link
              href="/"
              className="font-display text-2xl md:text-3xl font-bold tracking-tight"
            >
              {SITE_NAME}
              <span className="text-[var(--gold)]">.</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--gold)] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            <button
              className="p-2 hover:text-[var(--gold)] transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <div className="relative" ref={accountRef}>
              <button
                onClick={() => setAccountOpen((v) => !v)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full border border-[var(--border)] hover:border-[var(--ink)] hover:bg-[var(--muted)] transition-all text-sm font-medium"
              >
                <User className="h-4 w-4" />
                <span>Account</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${accountOpen ? "rotate-180" : ""}`}
                />
              </button>

              <Link
                href="/login"
                className="sm:hidden p-2"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Link>

              {accountOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-[var(--border)] rounded-xl shadow-xl overflow-hidden z-50">
                  <div className="p-4 border-b border-[var(--border)]">
                    <p className="text-sm text-[var(--ink-soft)]">Welcome</p>
                    <p className="text-base font-semibold">
                      Sign in to your account
                    </p>
                  </div>
                  <div className="p-2">
                    <Link
                      href="/auth/login"
                      className="block px-3 py-2.5 rounded-lg text-sm font-medium bg-[var(--ink)] text-white text-center hover:bg-black transition"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block mt-2 px-3 py-2.5 rounded-lg text-sm font-medium text-center border border-[var(--border)] hover:border-[var(--ink)] transition"
                    >
                      Create account
                    </Link>
                  </div>
                  <div className="border-t border-[var(--border)] p-2">
                    <Link
                      href="/account"
                      className="block px-3 py-2 text-sm text-[var(--ink-soft)] hover:text-[var(--ink)]"
                    >
                      My Orders
                    </Link>
                    <Link
                      href="/wishlist"
                      className="block px-3 py-2 text-sm text-[var(--ink-soft)] hover:text-[var(--ink)]"
                    >
                      Wishlist {wishlistCount > 0 && `(${wishlistCount})`}{" "}
                      {/* ⭐ NEW */}
                    </Link>
                  </div>
                </div>
              )}
            </div>
            {/* ⭐ NEW: wishlist heart with badge */}
            <Link
              href="/shop/wishlist"
              className="hidden sm:inline-flex relative p-2 hover:text-[var(--gold)] transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-[var(--gold)] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            {/* <Link href="/cart" className="relative p-2 hover:text-[var(--gold)] transition-colors" aria-label="Cart">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-[var(--gold)] text-white text-[10px] font-bold flex items-center justify-center">
                0
              </span>
            </Link> */}
            {/* // on the bag icon: */}
            <Link href="/shop/cart" className="relative p-2 hover:text-[var(--gold)] transition-colors" aria-label="Cart">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-[var(--gold)] text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile drawer — unchanged except wishlist count in footer link */}
      {open && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeDrawer}
          />
          <aside
            className={`absolute left-0 top-0 h-screen w-[85%] max-w-[380px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
              visible ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between px-6 h-20 border-b border-[var(--border)] shrink-0">
              <span className="font-display text-2xl font-bold tracking-tight">
                {SITE_NAME}
                <span className="text-[var(--gold)]">.</span>
              </span>
              <button
                onClick={closeDrawer}
                aria-label="Close menu"
                className="p-2 -mr-2 text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-6">
              <ul className="space-y-0.5">
                {NAV_LINKS.map((l) => (
                  <li
                    key={l.href}
                    className="border-b border-[var(--border)]/60 last:border-0"
                  >
                    <Link
                      href={l.href}
                      onClick={closeDrawer}
                      className="group flex items-center justify-between py-4 text-[15px] font-medium tracking-[0.08em] uppercase text-[var(--ink)] hover:text-[var(--gold-dark)] transition-colors"
                    >
                      {l.label}
                      <ChevronRight className="h-4 w-4 text-[var(--ink-soft)]/40 group-hover:text-[var(--gold-dark)] group-hover:translate-x-1 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="px-6 py-6 border-t border-[var(--border)] shrink-0 space-y-3">
              <Link
                href="/login"
                onClick={closeDrawer}
                className="block w-full text-center py-3 text-sm font-semibold tracking-wide bg-[var(--ink)] text-white hover:bg-[var(--gold-dark)] transition-colors duration-300"
              >
                LOG IN
              </Link>
              <div className="flex items-center justify-center gap-6 pt-2 text-xs tracking-wide text-[var(--ink-soft)]">
                <Link
                  href="/wishlist"
                  onClick={closeDrawer}
                  className="hover:text-[var(--gold-dark)] transition-colors"
                >
                  WISHLIST {wishlistCount > 0 && `(${wishlistCount})`}{" "}
                  {/* ⭐ NEW */}
                </Link>
                <span className="text-[var(--border)]">|</span>
                <Link
                  href="/account"
                  onClick={closeDrawer}
                  className="hover:text-[var(--gold-dark)] transition-colors"
                >
                  MY ORDERS
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
