import { adminClient } from "../http";
export const getOrders = async (params) => {
    return await adminClient.get("http://localhost:8080/admin/order", {
      params,
    });
  };

  export const changeStatusOrder = async (id, status) => {
    return await adminClient.put(
      `http://localhost:8080/admin/order/updateStatus/${id}`,
      {
        status: status,
      }
    );
  };