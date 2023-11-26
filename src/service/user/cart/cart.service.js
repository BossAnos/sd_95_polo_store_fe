import { userAuthService } from "../auth";
import { userClient } from "../http";

export const addProduct = async (id, form) => {
  return await userClient.post(`http://localhost:8080/cart/${id}`, form);
};
