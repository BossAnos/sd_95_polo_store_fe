import { adminClient } from "../http";

export const getAllDiscount = async (params) => {
  return await adminClient.get("http://localhost:8080/admin/discount", {
    params,
  });
};
