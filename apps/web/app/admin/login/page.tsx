import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/app/admin/login/admin-login-form";
import { getAdminSession } from "@/lib/admin/get-admin-session";

type AdminLoginPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const session = await getAdminSession();
  const { callbackUrl } = await searchParams;

  if (session) {
    redirect(callbackUrl ?? "/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-200 px-4">
      <div className="w-full max-w-md rounded-xl border border-neutral-300 bg-white p-8 shadow-sm">
        <h1 className="font-space-grotesk text-2xl font-bold text-primary-700">
          Admin sign in
        </h1>
        <p className="mt-2 text-sm text-neutral-700">
          Sign in with your admin account. New admins must accept an email
          invitation first.
        </p>
        <div className="mt-8">
          <AdminLoginForm callbackUrl={callbackUrl} />
        </div>
      </div>
    </div>
  );
}
