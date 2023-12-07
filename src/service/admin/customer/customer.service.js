import { adminClient } from "../http";

const getAllCustomer = async () => {
  const res = await adminClient.get("http://localhost:8080/admin/customer");
  return res;
};

export const createCustomer = async (Form) => {
  return await adminClient.post(
    "http://localhost:8080/admin/customer/add",
    Form
  );
};
export { getAllCustomer };
