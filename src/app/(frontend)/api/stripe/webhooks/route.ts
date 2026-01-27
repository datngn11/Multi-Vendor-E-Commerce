import type { Stripe } from "stripe";

import { NextResponse } from "next/server";
import { getPayload } from "payload";

import { ExpandedLineItem } from "@/features/checkout/types";
import { stripe } from "@/lib/stripe";
import config from "@/payload.config";

export async function POST(req: Request) {
  let event: null | Stripe.Event = null;

  try {
    event = stripe.webhooks.constructEvent(
      await (await req.blob()).text(),
      req.headers.get("stripe-signature") || "",
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    if (error instanceof Error) {
      console.error(`Webhook error: ${error}`);
    }

    return NextResponse.json(
      { message: `Webhook error: ${message}` },
      { status: 400 }
    );
  }
  console.log("Webhook event success: ", event);

  const permittedEvents = ["checkout.session.completed"];

  const payload = await getPayload({ config });

  if (permittedEvents.includes(event.type)) {
    let data;

    try {
      switch (event.type) {
        case "checkout.session.completed":
          data = event.data.object;

          if (!data.metadata?.userId) {
            throw new Error("User ID not found");
          }

          const user = await payload.findByID({
            collection: "users",
            id: data.metadata.userId,
          });

          if (!user) {
            throw new Error("User not found");
          }

          const expandedSession = await stripe.checkout.sessions.retrieve(
            data.id,
            { expand: ["line_items.data.price.product"] }
          );

          if (
            !expandedSession.line_items?.data ||
            !expandedSession.line_items.data.length
          ) {
            throw new Error("No line items found");
          }

          const lineItems = expandedSession.line_items
            .data as ExpandedLineItem[];

          for (const item of lineItems) {
            await payload.create({
              collection: "orders",
              data: {
                name: item.price.product.metadata.name,
                product: item.price.product.metadata.id,
                stripeCheckoutSessionId: data.id,
                tenant: data.metadata.tenantId,
                user: user.id,
              },
            });
          }

          break;
        default:
          throw new Error(`Invalid event type: ${event.type}`);
      }
    } catch (error) {
      console.error("Error processing webhook:", error);

      return NextResponse.json(
        { message: "Error processing webhook" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(
    { message: "Webhook processed successfully" },
    { status: 200 }
  );
}
