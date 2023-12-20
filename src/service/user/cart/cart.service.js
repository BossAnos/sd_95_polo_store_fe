import { userAuthService } from "../auth";
import { userClient } from "../http";

export const addProduct = async (id, form) => {
  return await userClient.post(`http://localhost:8080/cart/${id}`, form);
};

export const getProducts = async () => {
  const { id } = userAuthService.getAuthInfo();
  return await userClient.get(`http://localhost:8080/cart/${id}`);
};

export const changeQuantity = async (cartDetailId, params) => {
  return await userClient.put(
    `http://localhost:8080/cart/updateQuantity/${cartDetailId}`,

    params
  );
};

export const changeStatus = async (cartDetailId, status) => {
  return await userClient.put(
    `http://localhost:8080/cart/updateStatus/${cartDetailId}`,
    {
      status,
    }
  );
};

export const getCheckoutByStatus = async () => {
  const { id } = userAuthService.getAuthInfo();
  return await userClient.get(`http://localhost:8080/cart/order/${id}`);
};
