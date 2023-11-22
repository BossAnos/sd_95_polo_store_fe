import { adminClient } from "../http";

const getAllSizes = async () => {
  const res = await adminClient.get("http://localhost:8080/admin/size");
  return res;
};

export { getAllSizes };
