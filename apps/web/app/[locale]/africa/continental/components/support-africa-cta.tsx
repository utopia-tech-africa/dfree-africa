import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import ComponentLayout from "@/components/component-layout";
import { cn } from "@/lib/utils";

export async function SupportAfricaCta() {
  const t = await getTranslations("africa.supportAfrica");

  return (
    <ComponentLayout className="flex justify-center py-2">
      <Link
        href={t("href")}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ variant: "default", size: "lg" }))}
      >
        {t("label")}
      </Link>
    </ComponentLayout>
  );
}
