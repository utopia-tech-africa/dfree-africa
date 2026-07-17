import Stripe from "stripe";

import { getStripeSecretKey } from "./config";

let stripeClient: Stripe | null = null;

export function getStripeClient(): Stripe {
  const secretKey = getStripeSecretKey();

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }

  if (!stripeClient) {
    stripeClient = new Stripe(secretKey, {
      apiVersion: "2026-06-24.dahlia",
      typescript: true,
    });
  }

  return stripeClient;
}
