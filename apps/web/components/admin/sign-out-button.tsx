"use client";

import { authClient } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/admin/login";
  };

  return (
    <Button type="button" variant="outline" onClick={handleSignOut}>
      Sign out
    </Button>
  );
}
