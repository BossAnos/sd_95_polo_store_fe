import { adminClient } from "../http";

const getAllBrands = async () => {
  const res = await adminClient.get("http://localhost:8080/admin/brand");
  return res;
};

export { getAllBrands };
