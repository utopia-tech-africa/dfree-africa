import { createHash } from "node:crypto";

import { applyMailchimpMemberTags } from "@/lib/mailchimp/apply-member-tags";
import { getMailchimpConfig } from "@/lib/mailchimp/config";
import { splitNameForMailchimp } from "@/lib/mailchimp/split-name";
import {
  resolveTagForSource,
  type NewsletterSource,
} from "@/lib/mailchimp/tag-mapping";

export type { NewsletterSource };

export type SubscribeMemberInput = {
  name: string;
  email: string;
  source?: NewsletterSource;
};

export type SubscribeMemberResult =
  | { ok: true; status: "subscribed" }
  | { ok: false; reason: "not_configured" | "mailchimp_error" };

type MailchimpErrorBody = {
  title?: string;
  detail?: string;
};

function getSubscriberHash(email: string): string {
  return createHash("md5").update(email.trim().toLowerCase()).digest("hex");
}

export async function subscribeMemberToMailchimp({
  name,
  email,
  source,
}: SubscribeMemberInput): Promise<SubscribeMemberResult> {
  const config = getMailchimpConfig();

  if (!config) {
    return { ok: false, reason: "not_configured" };
  }

  const subscriberHash = getSubscriberHash(email);
  const mergeFields = splitNameForMailchimp(name);

  const body = {
    email_address: email.trim().toLowerCase(),
    status_if_new: "subscribed",
    merge_fields: mergeFields,
  };

  const response = await fetch(
    `https://${config.serverPrefix}.api.mailchimp.com/3.0/lists/${config.audienceId}/members/${subscriberHash}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  if (response.ok) {
    const tagName = resolveTagForSource(source);

    if (tagName) {
      const tagsApplied = await applyMailchimpMemberTags({
        config,
        subscriberHash,
        tagNames: [tagName],
      });

      if (!tagsApplied) {
        console.warn("[mailchimp] member subscribed but tag was not applied", {
          email: email.trim().toLowerCase(),
          tagName,
        });
      }
    }

    return { ok: true, status: "subscribed" };
  }

  let errorBody: MailchimpErrorBody | null = null;

  try {
    errorBody = (await response.json()) as MailchimpErrorBody;
  } catch {
    errorBody = null;
  }

  console.error("[mailchimp] subscribe failed", {
    status: response.status,
    title: errorBody?.title,
    detail: errorBody?.detail,
  });

  return { ok: false, reason: "mailchimp_error" };
}
