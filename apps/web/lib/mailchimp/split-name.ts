export type MailchimpNameFields = {
  FNAME: string;
  LNAME: string;
};

export function splitNameForMailchimp(fullName: string): MailchimpNameFields {
  const trimmed = fullName.trim();
  const parts = trimmed.split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return { FNAME: "", LNAME: "" };
  }

  if (parts.length === 1) {
    return { FNAME: parts[0] ?? "", LNAME: "" };
  }

  return {
    FNAME: parts[0] ?? "",
    LNAME: parts.slice(1).join(" "),
  };
}
