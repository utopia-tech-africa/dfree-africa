import Link from "next/link";
import { redirect } from "next/navigation";
import { AcceptInvitationForm } from "@/app/admin/accept-invitation/[id]/accept-invitation-form";
import { getAdminSession } from "@/lib/admin/get-admin-session";

type AcceptInvitationPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AcceptInvitationPage({
  params,
}: AcceptInvitationPageProps) {
  const { id } = await params;
  const session = await getAdminSession();

  if (!session) {
    redirect(`/admin/login?callbackUrl=/admin/accept-invitation/${id}`);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-200 px-4">
      <div className="w-full max-w-md rounded-xl border border-neutral-300 bg-white p-8 shadow-sm">
        <h1 className="font-space-grotesk text-2xl font-bold text-primary-700">
          Accept invitation
        </h1>
        <p className="mt-2 text-sm text-neutral-700">
          Signed in as {session.user.email}. Confirm to join the organization.
        </p>
        <div className="mt-8">
          <AcceptInvitationForm invitationId={id} />
        </div>
        <p className="mt-6 text-center text-sm text-neutral-700">
          <Link href="/admin" className="text-primary-600 underline">
            Back to dashboard
          </Link>
        </p>
      </div>
    </div>
  );
}
