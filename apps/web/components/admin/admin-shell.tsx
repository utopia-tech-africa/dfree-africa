"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAV } from "@/lib/admin/constants";
import { authClient } from "@/lib/auth/auth-client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type AdminShellProps = {
  userName: string;
  userEmail: string;
  children: React.ReactNode;
};

export function AdminShell({ userName, userEmail, children }: AdminShellProps) {
  const pathname = usePathname();

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/admin/login";
  };

  return (
    <div className="flex min-h-screen bg-neutral-200">
      <aside className="flex w-64 shrink-0 flex-col border-r border-neutral-300 bg-white">
        <div className="border-b border-neutral-200 px-6 py-5">
          <p className="font-space-grotesk text-lg font-bold text-primary-600">
            DFREE Admin
          </p>
          <p className="mt-1 truncate text-xs text-neutral-700">{userEmail}</p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-4">
          {ADMIN_NAV.map((item) => {
            const isActive =
              item.exact === true
                ? pathname === item.href
                : pathname.startsWith(item.href);

            if (item.disabled) {
              return (
                <span
                  key={item.href}
                  className="cursor-not-allowed rounded-lg px-3 py-2 text-sm text-neutral-500"
                  title="Coming soon"
                >
                  {item.label}
                </span>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary-500 text-white"
                    : "text-neutral-900 hover:bg-neutral-200",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-neutral-200 p-4">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleSignOut}
          >
            Sign out
          </Button>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-neutral-300 bg-white px-8 py-4">
          <p className="text-sm text-neutral-700">Signed in as</p>
          <p className="font-medium text-neutral-1000">{userName}</p>
        </header>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
