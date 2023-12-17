import { adminClient } from "../http";

export const getAllDiscount = async (params) => {
  return await adminClient.get("http://localhost:8080/admin/discount", {
    params,
  });
};

export const getDiscount = async (params) => {
  return await adminClient.get("http://localhost:8080/admin/discount/getAll", {
    params,
  });
};

export const addDiscountToProduct = async (params) => {
  return await adminClient.post("http://localhost:8080/admin/discount", params);
};
