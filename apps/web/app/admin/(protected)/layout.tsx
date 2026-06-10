import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminSession } from "@/lib/admin/get-admin-session";

export default async function AdminProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminShell
      userName={session.user.name ?? session.user.email}
      userEmail={session.user.email}
    >
      {children}
    </AdminShell>
  );
}
