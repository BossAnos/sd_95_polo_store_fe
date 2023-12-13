import { userAuthService } from "../auth";
import { userClient } from "../http";

export const AddAddress = async (id, form) => {
  return await userClient.post(`http://localhost:8080/address/${id}`, form);
};
