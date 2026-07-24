import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Announcement from "@/components/layout/Announcement";
import { Toaster } from "react-hot-toast";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartProvider } from "@/context/CartContext";
export const metadata = {
  title: "LUXE — Premium Fashion & Lifestyle",
  description: "Curated premium fashion, accessories and lifestyle essentials.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      
      <body className="min-h-screen flex flex-col">
        <WishlistProvider>
          <CartProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
          }}
        />
        <Announcement />
        <Header />
        <main className="flex-1">{children}</main>
        </CartProvider>
        <Footer />
        </WishlistProvider>
      </body>
    </html>
  );
}
