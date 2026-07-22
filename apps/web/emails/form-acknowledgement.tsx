import * as React from "react";
import { Fragment } from "react";
import { Text } from "react-email";
import { DfreeEmailLayout } from "@/emails/components/dfree-layout";
import { emailBrand } from "@/lib/email/brand";

export type FormAcknowledgementEmailProps = {
  title: string;
  preview: string;
  paragraphs: string[];
};

export function FormAcknowledgementEmail({
  title,
  preview,
  paragraphs,
}: FormAcknowledgementEmailProps) {
  return (
    <DfreeEmailLayout preview={preview} title={title}>
      {paragraphs.map((paragraph, index) => (
        <Text key={index} style={styles.paragraph}>
          {paragraph.split("\n").map((line, lineIndex, lines) => (
            <Fragment key={lineIndex}>
              {line}
              {lineIndex < lines.length - 1 ? <br /> : null}
            </Fragment>
          ))}
        </Text>
      ))}
    </DfreeEmailLayout>
  );
}

FormAcknowledgementEmail.PreviewProps = {
  title: "Your fellowship application was received",
  preview: "We received your fellowship application",
  paragraphs: [
    "Hi Jamal,",
    "Thank you for applying to the DFREE Leadership Institute. Our team will review your application and follow up soon.",
    "If you have questions in the meantime, reply to this email or visit our website.",
  ],
} satisfies FormAcknowledgementEmailProps;

const styles = {
  paragraph: {
    margin: "0 0 16px",
    fontFamily: emailBrand.fontBody,
    fontSize: "16px",
    lineHeight: "1.65",
    color: emailBrand.text,
  },
} as const;

export default FormAcknowledgementEmail;
