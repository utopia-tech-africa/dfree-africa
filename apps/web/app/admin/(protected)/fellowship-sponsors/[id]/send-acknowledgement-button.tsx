"use client";

import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { sendSponsorAcknowledgementEmail } from "@/lib/fellowship-sponsors/actions";

type SendAcknowledgementButtonProps = {
  submissionId: string;
  alreadySent: boolean;
};

export function SendAcknowledgementButton({
  submissionId,
  alreadySent,
}: SendAcknowledgementButtonProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSend = () => {
    setError(null);
    setMessage(null);

    startTransition(async () => {
      const result = await sendSponsorAcknowledgementEmail(submissionId);

      if (!result.success) {
        setError(result.error);
        return;
      }

      setMessage(
        alreadySent
          ? "Acknowledgement email resent."
          : "Acknowledgement email sent.",
      );
      router.refresh();
    });
  };

  return (
    <div className="space-y-2 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-space-grotesk text-lg font-semibold text-primary-700">
            Acknowledgement email
          </h2>
          <p className="mt-1 text-sm text-neutral-700">
            {alreadySent
              ? "An acknowledgement was already sent. You can resend it if needed."
              : "No acknowledgement has been sent yet for this inquiry."}
          </p>
        </div>

        <Button
          type="button"
          variant={alreadySent ? "outline" : "default"}
          onClick={handleSend}
          disabled={isPending}
          className="shrink-0"
        >
          <Mail className="size-4" aria-hidden />
          {isPending
            ? "Sending…"
            : alreadySent
              ? "Resend acknowledgement"
              : "Send acknowledgement"}
        </Button>
      </div>

      {message ? (
        <p className="text-sm text-primary-700" role="status">
          {message}
        </p>
      ) : null}

      {error ? (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
