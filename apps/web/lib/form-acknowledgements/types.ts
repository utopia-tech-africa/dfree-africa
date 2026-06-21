export type FormAcknowledgementType =
  | "contact"
  | "fellowship-application"
  | "fellowship-sponsor";

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
