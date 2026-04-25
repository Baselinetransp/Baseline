import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia",
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const submissionId = searchParams.get("submissionId");
  const amount = searchParams.get("amount");
  const currency = searchParams.get("currency");

  if (!submissionId || !amount || !currency) {
    return NextResponse.redirect(
      new URL("/advertise?error=missing_params", request.url)
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: "Banner Advertisement",
              description: `Banner ad campaign - Submission #${submissionId}`,
            },
            unit_amount: Math.round(parseFloat(amount) * 100), // Convert to pence/cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.nextUrl.origin}/advertise/success?submissionId=${submissionId}&provider=stripe&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/advertise?cancelled=true`,
      metadata: {
        submissionId,
      },
    });

    if (session.url) {
      return NextResponse.redirect(session.url);
    }

    return NextResponse.redirect(
      new URL("/advertise?error=session_failed", request.url)
    );
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.redirect(
      new URL("/advertise?error=payment_failed", request.url)
    );
  }
}
