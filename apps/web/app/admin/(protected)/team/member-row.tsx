"use client";

import { motion } from "framer-motion";
import { Crown, Shield, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type MemberRowProps = {
  name: string;
  email: string;
  role: string;
  index: number;
};

function getInitials(name: string, email: string): string {
  const source = name.trim() || email;
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
  }
  return source.slice(0, 2).toUpperCase();
}

function RoleIcon({ role }: { role: string }) {
  if (role === "owner") {
    return <Crown className="size-3" aria-hidden />;
  }
  if (role === "admin") {
    return <Shield className="size-3" aria-hidden />;
  }
  return <User className="size-3" aria-hidden />;
}

function roleBadgeVariant(
  role: string,
): "owner" | "admin" | "member" | "default" {
  if (role === "owner") {
    return "owner";
  }
  if (role === "admin") {
    return "admin";
  }
  return "member";
}

export function MemberRow({ name, email, role, index }: MemberRowProps) {
  const displayName = name.trim() || email;
  const initials = getInitials(name, email);

  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25 }}
      className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
    >
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-sm font-semibold text-white shadow-sm"
          aria-hidden
        >
          {initials}
        </div>
        <div className="min-w-0">
          <p className="truncate font-medium text-neutral-1000">
            {displayName}
          </p>
          <p className="truncate text-sm text-neutral-700">{email}</p>
        </div>
      </div>
      <Badge variant={roleBadgeVariant(role)} className="shrink-0 capitalize">
        <RoleIcon role={role} />
        {role}
      </Badge>
    </motion.li>
  );
}
