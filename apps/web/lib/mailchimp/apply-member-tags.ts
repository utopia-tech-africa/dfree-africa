import type { MailchimpConfig } from "@/lib/mailchimp/config";

type MailchimpTagPayload = {
  tags: Array<{ name: string; status: "active" | "inactive" }>;
};

export async function applyMailchimpMemberTags({
  config,
  subscriberHash,
  tagNames,
}: {
  config: MailchimpConfig;
  subscriberHash: string;
  tagNames: string[];
}): Promise<boolean> {
  if (tagNames.length === 0) {
    return true;
  }

  const body: MailchimpTagPayload = {
    tags: tagNames.map((name) => ({ name, status: "active" })),
  };

  const response = await fetch(
    `https://${config.serverPrefix}.api.mailchimp.com/3.0/lists/${config.audienceId}/members/${subscriberHash}/tags`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    let detail: string | undefined;

    try {
      const errorBody = (await response.json()) as {
        detail?: string;
        title?: string;
      };
      detail = errorBody.detail ?? errorBody.title;
    } catch {
      detail = undefined;
    }

    console.error("[mailchimp] apply tags failed", {
      status: response.status,
      tags: tagNames,
      detail,
    });

    return false;
  }

  return true;
}
