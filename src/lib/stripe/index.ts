let stripeClient: import("stripe").default | null = null;

if (process.env.STRIPE_SECRET_KEY) {
  // Dynamically require to avoid bundling issues when key is absent
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Stripe = require("stripe");
  stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-04-30.basil",
  });
} else {
  console.warn(
    "[Stripe] STRIPE_SECRET_KEY not set — Stripe is disabled."
  );
}

export const stripe = stripeClient;
