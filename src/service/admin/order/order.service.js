import { adminClient } from "../http";
export const getOrders = async (params) => {
  return await adminClient.get("http://localhost:8080/admin/order", {
    params,
  });
};

export const getOrdersByTimeRange = async (params) => {
  return await adminClient.get(
    "http://localhost:8080/admin/order/byTimeRange",
    {
      params,
    }
  );
};

export const changeStatusOrder = async (id, params) => {
  return await adminClient.put(
    `http://localhost:8080/admin/order/updateStatus/${id}`,
    params
  );
};
export const addOrder = async (id, form) => {
  return await adminClient.post(
    `http://localhost:8080/admin/order/${id}`,
    form
  );
};
