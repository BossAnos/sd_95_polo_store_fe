import { adminClient } from "../http";

const getAllCategory = async () => {
  const res = await adminClient.get("http://localhost:8080/categories/getall");
  return res;
};

export { getAllCategory };
