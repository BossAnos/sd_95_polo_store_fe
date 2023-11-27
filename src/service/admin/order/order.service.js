import { adminClient } from "../http";
export const getOrders = async (params) => {
    return await adminClient.get("http://localhost:8080/admin/order", {
      params,
    });
  };