import { NextRequest, NextResponse } from "next/server";

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
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.round(parseFloat(amount) * 100), // Convert to kobo
        currency: currency,
        callback_url: `${request.nextUrl.origin}/advertise/success?submissionId=${submissionId}&provider=paystack`,
        metadata: {
          submissionId,
          custom_fields: [
            {
              display_name: "Submission ID",
              variable_name: "submission_id",
              value: submissionId,
            },
          ],
        },
      }),
    });

    const data = await response.json();

    if (data.status && data.data?.authorization_url) {
      return NextResponse.redirect(data.data.authorization_url);
    }

    console.error("Paystack initialization failed:", data);
    return NextResponse.redirect(
      new URL("/advertise?error=payment_failed", request.url)
    );
  } catch (error) {
    console.error("Paystack checkout error:", error);
    return NextResponse.redirect(
      new URL("/advertise?error=payment_failed", request.url)
    );
  }
}
