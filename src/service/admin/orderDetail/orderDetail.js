import { adminClient } from "../http";

export const getOneOrder = async (id) => {
  return await adminClient.get(
    `http://localhost:8080/customer/order/getOne/${id}`
  );
};
