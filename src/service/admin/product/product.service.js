import { adminClient } from "../http";

export const getAllProducts = async (params) => {
  return await adminClient.get("http://localhost:8080/admin/product", {
    params,
  });
};
