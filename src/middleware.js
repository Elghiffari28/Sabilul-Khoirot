import { NextResponse } from "next/server";
import { getMe } from "./lib/api";

export async function middleware(req) {
  const session = req.cookies.get("connect.sid");
  const role = req.cookies.get("role");

  // console.log("Request URL:", req.url);
  // console.log("Session Token:", session); // Log isi session token

  console.log("objek", role.value);
  // Redirect jika tidak ada session
  if (!session) {
    console.log("No session token found. Redirecting to login.");
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (role.value !== "admin") {
    console.log("User does not have admin role. Redirecting to home.");
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return NextResponse.next();

  // try {
  //   const data = await getMe(req);
  //   console.log("objec middlewaret", data);
  //   const userRole = data?.message?.role;

  //   if (userRole !== "admin") {
  //     console.log("User does not have admin role. Redirecting to home.");
  //     return NextResponse.redirect(new URL("/", req.url));
  //   }
  //   return NextResponse.next();
  // } catch (error) {
  //   console.error("Error verifying session:", error);
  //   return NextResponse.redirect(new URL("/", req.url));
  // }
}

// Tentukan URL yang harus diproteksi
export const config = {
  matcher: ["/admin/:path*"], // Proteksi semua route di /dashboard
};
