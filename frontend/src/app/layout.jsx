// import "./globals.css";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import Announcement from "@/components/layout/Announcement";
// import { Toaster } from "react-hot-toast";
// import { WishlistProvider } from "@/context/WishlistContext";
// import { CartProvider } from "@/context/CartContext";
// export const metadata = {
//   title: "LUXE — Premium Fashion & Lifestyle",
//   description: "Curated premium fashion, accessories and lifestyle essentials.",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head>
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap"
//           rel="stylesheet"
//         />
//       </head>

//       <body className="min-h-screen flex flex-col">
//         <WishlistProvider>
//           <CartProvider>
//         <Toaster
//           position="top-right"
//           toastOptions={{
//             duration: 3000,
//           }}
//         />
//         <Announcement />
//         <Header />
//         <main className="flex-1">{children}</main>
//         </CartProvider>
//         <Footer />
//         </WishlistProvider>
//       </body>
//     </html>
//   );
// }
import Script from "next/script";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Announcement from "@/components/layout/Announcement";
import { Toaster } from "react-hot-toast";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartProvider } from "@/context/CartContext";
import Providers from "@/app/providers";
export const metadata = {
  title: "LUXE — Premium Fashion & Lifestyle",
  description: "Curated premium fashion, accessories and lifestyle essentials.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <AuthProvider>
        <Providers>
          <Announcement />
          <Script
            src="https://checkout.razorpay.com/v1/checkout.js"
            strategy="lazyOnload"
          />
          <Header />

          {children}

          <Footer />

          <Toaster position="top-right" />
        </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
