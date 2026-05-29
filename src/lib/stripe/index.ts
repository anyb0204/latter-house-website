let stripeClient: import("stripe").default | null = null;

if (process.env.STRIPE_SECRET_KEY) {
  const Stripe = require("stripe"); // eslint-disable-line
  stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-04-30.basil",
  });
} else {
  console.warn(
    "[Stripe] STRIPE_SECRET_KEY not set — Stripe is disabled."
  );
}

export const stripe = stripeClient;
