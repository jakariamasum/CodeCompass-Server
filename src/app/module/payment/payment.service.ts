import { Payment } from "./payment.model";

const savePaymentDataToDB = async (session: any) => {
  try {
    const paymentData = {
      paymentId: session.id,
      amount: session.amount_total,
      currency: session.currency,
      customerEmail: session.customer_details.email,
      status: session.payment_status,
      subscriptionId: session.subscription,
      productId: session.client_reference_id,
      createdAt: new Date(),
    };

    await Payment.create(paymentData);
    console.log("Payment data saved successfully:", paymentData);
    return true;
  } catch (error) {
    console.error("Error saving payment data to the database:", error);
  }
};

const getAllPaymentsFromDB = async () => {
  const result = await Payment.find();
  return result;
};
const getUserPaymentsFromDB = async (email: string) => {
  const result = await Payment.find({ email: email });
  return result;
};

export const PaymentServices = {
  savePaymentDataToDB,
  getAllPaymentsFromDB,
  getUserPaymentsFromDB,
};
