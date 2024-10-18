import Stripe from "stripe";
import catchAsync from "../../utils/catchAsync";
import { PaymentServices } from "./payment.service";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
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
  let event;

  try {
    // Directly parse the incoming request body as JSON
    event = req.body;
    console.log(req.body);
  } catch (err: any) {
    console.error("Error parsing webhook request body.", err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event type
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      try {
        // Fetch the session details from Stripe to verify the payment status
        const stripeSession = await stripe.checkout.sessions.retrieve(
          session.id
        );

        // Ensure that the payment was completed successfully
        if (stripeSession.payment_status === "paid") {
          // Save the payment data to the database
          await PaymentServices.savePaymentDataToDB(stripeSession);
          console.log("Payment data saved successfully:", stripeSession);
        } else {
          console.error(
            "Payment was not completed. Payment status:",
            stripeSession.payment_status
          );
        }
      } catch (error) {
        console.error(
          "Error retrieving payment session or saving data:",
          error
        );
      }
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

export const PaymentControllers = { checkout, savePaymentData };
