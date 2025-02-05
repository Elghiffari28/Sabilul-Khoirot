import Sidebar from "@/components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div>
      <Sidebar />
      <main className="flex-1 ml-0 sm:ml-64 bg-gray-100 p-6">{children}</main>
    </div>
  );
}
