export const ADMIN_ORG_NAME = "DFREE Admin";
export const ADMIN_ORG_SLUG = "dfree-admin";

export type AdminNavItem = {
  href: string;
  label: string;
  exact?: boolean;
  disabled?: boolean;
};

export const ADMIN_NAV: AdminNavItem[] = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/team", label: "Team" },
  {
    href: "/admin/fellowship-applications",
    label: "Fellowship Applications",
  },
  {
    href: "/admin/fellowship-sponsors",
    label: "Fellowship Sponsors",
    disabled: true,
  },
];
