import type { PaymentMethodValue } from "@/lib/forms/schemas/leadership-institute-sponsor";
import type { SponsorPaymentStatus } from "@/lib/fellowship-sponsors/types";
import { formatSponsorshipCurrency } from "@/lib/fellowship-sponsors/sponsorship-pricing";

const paymentMethodLabels: Record<PaymentMethodValue, string> = {
  check_ach: "Check / ACH",
  credit_card: "Credit card (Stripe)",
  wire_transfer: "Wire transfer",
  pledge_invoice: "Pledge / invoice",
};

const paymentStatusLabels: Record<SponsorPaymentStatus, string> = {
  pending: "Pending",
  paid: "Paid",
  cancelled: "Cancelled",
};

export function formatPaymentMethod(value: PaymentMethodValue): string {
  return paymentMethodLabels[value];
}

export function formatPaymentStatus(status: SponsorPaymentStatus): string {
  return paymentStatusLabels[status];
}

export function formatPaymentAmountCents(amountCents: number): string {
  return formatSponsorshipCurrency(amountCents / 100);
}
