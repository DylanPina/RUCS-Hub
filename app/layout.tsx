import type { Metadata } from "next";
import { Source_Code_Pro } from "next/font/google";
import Nav from "@/components/Nav/Nav";
import "@/app/globals.css";
import Footer from "@/components/Footer/Footer";
import { AuthProvider } from "@/components/Auth/AuthProvider";
import { ToastContainer } from "react-toastify";
import { Toaster } from "@/components/shadcn/ui/toaster";
import "react-toastify/dist/ReactToastify.css";
import MaintenancePage from "@/components/Maintenance/MaintenancePage";

const font = Source_Code_Pro({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | RUCS Hub",
    default: "RUCS Hub",
  },
  description: "The Unofficial Hub for Rutgers University",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${font.className} flex flex-col w-full h-full place-items-center min-h-screen bg-zinc-900 overflow-auto`}
      >
        {process.env.MAINTENANCE_MODE === "true" ? (
          <MaintenancePage />
        ) : (
          <AuthProvider>
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
          </AuthProvider>
        )}
      </body>
    </html>
  );
}
