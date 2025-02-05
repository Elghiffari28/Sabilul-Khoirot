import { NextResponse } from "next/server";

export function middleware(req) {
  const session = req.cookies.get("connect.sid");

  // console.log("Request URL:", req.url);
  // console.log("Session Token:", session); // Log isi session token

  // Redirect jika tidak ada session
  if (!session) {
    console.log("No session token found. Redirecting to login.");
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Jika ada token, lanjutkan ke halaman yang diminta
  return NextResponse.next();
}

// Tentukan URL yang harus diproteksi
export const config = {
  matcher: ["/admin/:path*"], // Proteksi semua route di /dashboard
};
