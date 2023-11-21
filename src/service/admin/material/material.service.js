import { adminClient } from "../http";

const getAllMaterial = async () => {
  const res = await adminClient.get("http://localhost:8080/admin/material");
  return res;
};

export { getAllMaterial };
