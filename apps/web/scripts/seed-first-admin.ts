import "../lib/load-env";
import { ADMIN_ORG_NAME, ADMIN_ORG_SLUG } from "../lib/admin/constants";
import { auth } from "../lib/auth/auth";
import { prisma } from "../lib/db/prisma";

const email = process.env.BOOTSTRAP_ADMIN_EMAIL;
const password = process.env.BOOTSTRAP_ADMIN_PASSWORD;
const name = process.env.BOOTSTRAP_ADMIN_NAME ?? "Admin";

async function main() {
  if (!email || !password) {
    console.error(
      "Set BOOTSTRAP_ADMIN_EMAIL and BOOTSTRAP_ADMIN_PASSWORD in your environment.",
    );
    process.exit(1);
  }

  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    const signUp = await auth.api.signUpEmail({
      body: { email, password, name },
    });

    if (!signUp?.user) {
      console.error("Failed to create bootstrap user.");
      process.exit(1);
    }

    user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      console.error("User record missing after sign-up.");
      process.exit(1);
    }

    console.log(`Created user: ${email}`);
  } else {
    console.log(`User already exists: ${email}`);
  }

  let organization = await prisma.organization.findFirst({
    where: { slug: ADMIN_ORG_SLUG },
  });

  if (!organization) {
    organization = await prisma.organization.create({
      data: {
        id: crypto.randomUUID(),
        name: ADMIN_ORG_NAME,
        slug: ADMIN_ORG_SLUG,
        createdAt: new Date(),
      },
    });
    console.log(`Created organization: ${ADMIN_ORG_NAME}`);
  } else {
    console.log(`Organization already exists: ${organization.name}`);
  }

  const existingMember = await prisma.member.findFirst({
    where: { organizationId: organization.id, userId: user.id },
  });

  if (!existingMember) {
    await prisma.member.create({
      data: {
        id: crypto.randomUUID(),
        organizationId: organization.id,
        userId: user.id,
        role: "owner",
        createdAt: new Date(),
      },
    });
    console.log(`Added ${email} as organization owner.`);
  } else {
    console.log(`${email} is already a member (${existingMember.role}).`);
  }

  console.log("Bootstrap complete.");
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
