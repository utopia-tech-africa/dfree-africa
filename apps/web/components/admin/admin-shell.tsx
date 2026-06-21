"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ADMIN_MAIN_NAV,
  ADMIN_SETTINGS_NAV,
  type AdminNavItem,
} from "@/lib/admin/constants";
import { authClient } from "@/lib/auth/auth-client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function AdminNavLink({
  item,
  pathname,
}: {
  item: AdminNavItem;
  pathname: string;
}) {
  const isActive =
    item.exact === true
      ? pathname === item.href
      : pathname.startsWith(item.href);

  if (item.disabled) {
    return (
      <span
        className="cursor-not-allowed rounded-lg px-3 py-2 text-sm text-neutral-500"
        title="Coming soon"
      >
        {item.label}
      </span>
    );
  }

  return (
    <Link
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
}

type AdminShellProps = {
  userName: string;
  userEmail: string;
  children: React.ReactNode;
};

export function AdminShell({ userName, userEmail, children }: AdminShellProps) {
  const pathname = usePathname() ?? "";

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-neutral-200">
      <aside className="fixed top-0 left-0 z-40 flex h-screen w-64 flex-col border-r border-neutral-300 bg-white">
        <div className="shrink-0 border-b border-neutral-200 px-6 py-5">
          <p className="font-space-grotesk text-lg font-bold text-primary-600">
            DFREE Admin
          </p>
          <p className="mt-1 truncate text-xs text-neutral-700">{userEmail}</p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
          {ADMIN_MAIN_NAV.map((item) => (
            <AdminNavLink key={item.href} item={item} pathname={pathname} />
          ))}

          <div className="mt-6 space-y-1">
            <p className="px-3 py-2 text-xs font-semibold tracking-wide text-neutral-500 uppercase">
              Settings
            </p>
            {ADMIN_SETTINGS_NAV.map((item) => (
              <AdminNavLink key={item.href} item={item} pathname={pathname} />
            ))}
          </div>
        </nav>
        <div className="shrink-0 border-t border-neutral-200 p-4">
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
      <div className="ml-64 flex min-h-screen min-w-0 flex-col">
        <header className="border-b border-neutral-300 bg-white px-8 py-4">
          <p className="text-sm text-neutral-700">Signed in as</p>
          <p className="font-medium text-neutral-1000">{userName}</p>
        </header>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
