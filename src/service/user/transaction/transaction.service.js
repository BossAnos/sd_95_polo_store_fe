import { userClient } from "../http";

export const getAllTransaction = async () => {
  return await userClient.get(`http://localhost:8080/transaction`);
};

export const TransactionUrl = async ({ orderId, totalPrice }) => {
  return await userClient.post(
    "http://localhost:8080/transaction/vnpay",
    {},
    {
      params: {
        orderInfo: orderId,
        amount: totalPrice,
      },
    }
  );
};
