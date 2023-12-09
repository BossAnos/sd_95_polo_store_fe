import { adminClient } from "../http";
export const getAllAdmin = async (params) => {
  return await adminClient.get("http://localhost:8080/admin/manger", {
    params,
  });
};
