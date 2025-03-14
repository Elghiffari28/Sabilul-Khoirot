import { Geist, Geist_Mono, Roboto_Slab, Roboto_Slab } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { UserProvider } from "@/context/UserContext";
import Footer from "@/components/Footer";
import "remixicon/fonts/remixicon.css";
import { Toaster } from "@/components/ui/toaster";
import CurrentTime from "@/components/CurrentTime";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const RobotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sabilul Khoirot Heuleut-Leuwimunding",
  description: "Raudlatul Athfal Sabilul Khoirot Heuleu Leuwimunding",
  icons: "/favicon.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={`${geistMono.className} antialiased bg-bg_primary`}>
          <Navbar />
          <CurrentTime />
          <main className="min-h-screen p-4 md:p-8 lg:p-12">{children}</main>
          <Toaster />
          <Footer />
        </body>
      </UserProvider>
    </html>
  );
}
