import Stripe from "stripe";
import catchAsync from "../../utils/catchAsync";
import { PaymentServices } from "./payment.service";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-09-30.acacia",
});
const checkout = catchAsync(async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Tech & Tips Premium Subscription",
            },
            unit_amount: 2000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      customer_email: req.body.email,

      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
    });
    console.log(session);

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const savePaymentData = catchAsync(async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    // Verify the event with Stripe's webhook secret
    event = stripe.webhooks.constructEvent(
      req.body,
      sig as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error("⚠️ Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("Payment was successful:", session);

    // Save payment data to the database
    const isSaved = await PaymentServices.savePaymentDataToDB(session);
    if (isSaved) {
      console.log("Payment data saved successfully.");
    } else {
      console.error("Failed to save payment data.");
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });

  res.json({ received: true });
});

export const PaymentControllers = { checkout, savePaymentData };
