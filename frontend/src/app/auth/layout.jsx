export const metadata = {
  title: "Account | LUXE",
  description: "Sign in or create your LUXE account.",
};

export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen bg-neutral-50">
      {children}
    </main>
  );
}
