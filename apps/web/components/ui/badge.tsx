import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary-100 text-primary-700",
        secondary: "bg-neutral-200 text-neutral-800",
        owner: "bg-amber-100 text-amber-800",
        admin: "bg-primary-100 text-primary-700",
        member: "bg-neutral-200 text-neutral-800",
        pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
        expired: "bg-neutral-100 text-neutral-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
