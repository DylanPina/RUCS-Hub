import type { Metadata } from "next";
import { Source_Code_Pro } from "next/font/google";
import Nav from "@/components/nav/nav";
import "@/app/globals.css";
import Footer from "@/components/footer/footer";
import { AuthProvider } from "@/components/auth/auth_provider";
import { ToastContainer } from "react-toastify";
import { Toaster } from "@/components/shadcn/ui/toaster";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

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
      <Head>
        <title>Courses | RUCS Hub</title>
        <meta
          name="description"
          content="Unoffical hub for Rutger's computer science"
        />

        <meta property="og:url" content="https://www.rucshub.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="RUCS Hub" />
        <meta
          property="og:description"
          content="Unoffical hub for Rutger's computer science"
        />
        <meta property="og:image" content="" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="rucshub.com" />
        <meta property="twitter:url" content="https://www.rucshub.com" />
        <meta name="twitter:title" content="Courses | RUCS Hub" />
        <meta
          name="twitter:description"
          content="Unoffical hub for Rutger's computer science"
        />
        <meta name="twitter:image" content="" />
      </Head>
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
