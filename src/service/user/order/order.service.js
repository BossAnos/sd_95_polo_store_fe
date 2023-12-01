import { userAuthService } from "../auth";
import { userClient } from "../http";

export const getOrderForUser = async () => {
  const { id } = userAuthService.getAuthInfo();
  return await userClient.get(`http://localhost:8080/customer/order/${id}`);
};

export const getOneOrderForUser = async (id) => {
  return await userClient.get(
    `http://localhost:8080/customer/order/getOne/${id}`
  );
};

export const addOrder = async (id, form) => {
  return await userClient.post(
    `http://localhost:8080/customer/order/${id}`,
    form
  );
};
