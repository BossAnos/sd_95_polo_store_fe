import { adminClient } from "../http";

export const changeStatusImage = async (id) => {
  return await adminClient.put(`http://localhost:8080/admin/image/${id}`);
};
