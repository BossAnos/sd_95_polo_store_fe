import { adminClient } from "../http";

const getAllCategory = async () => {
  const res = await adminClient.get("http://localhost:8080/admin/category");
  return res;
};

export { getAllCategory };
