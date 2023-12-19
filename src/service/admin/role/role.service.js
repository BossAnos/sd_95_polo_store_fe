import { adminClient } from "../http";

export const getAllRole = async (params) => {
  return await adminClient.get("http://localhost:8080/admin/role", {
    params,
  });
};
