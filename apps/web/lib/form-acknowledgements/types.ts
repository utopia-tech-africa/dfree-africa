export type FormAcknowledgementType =
  | "contact"
  | "fellowship-application"
  | "fellowship-sponsor"
  | "fellowship-application-pending"
  | "fellowship-application-under-review"
  | "fellowship-application-accepted"
  | "fellowship-application-rejected"
  | "fellowship-application-waitlisted";

export type FormAcknowledgementTemplate = {
  formType: FormAcknowledgementType;
  subject: string;
  bodyText: string;
  updatedAt: Date | null;
  isCustom: boolean;
};

export type FormAcknowledgementTemplateClient = Omit<
  FormAcknowledgementTemplate,
  "updatedAt"
> & {
  updatedAt: string | null;
};
