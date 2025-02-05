import { Geist, Geist_Mono, Roboto_Slab, Roboto_Slab } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { User } from "@phosphor-icons/react/dist/ssr";
import { UserProvider } from "@/context/UserContext";
import Footer from "@/components/Footer";

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
      <body className={`${geistMono.className} antialiased bg-bg_primary`}>
        <UserProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
