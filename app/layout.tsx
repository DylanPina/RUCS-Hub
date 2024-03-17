import type { Metadata } from "next";
import { Source_Code_Pro } from "next/font/google";
import Nav from "@/components/nav/nav";
import "@/app/globals.css";
import Footer from "@/components/footer/footer";
import { AuthProvider } from "@/components/auth/auth_provider";
import { ToastContainer } from "react-toastify";
import { Toaster } from "@/components/shadcn/ui/toaster";
import "react-toastify/dist/ReactToastify.css";

const font = Source_Code_Pro({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | RUCS Hub",
    default: "RUCS Hub",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <AuthProvider>
          <div className="flex flex-col place-items-center min-h-screen bg-zinc-900 overflow-auto">
            <ToastContainer
              toastClassName="toast-background"
              position="top-center"
            />
            <Toaster />
            <Nav />
            <main className="flex-grow w-full max-w-screen-2xl p-4 overflow-auto">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
