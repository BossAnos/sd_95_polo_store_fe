import { adminClient } from "../http";

const getAllCategory = async () => {
  const res = await adminClient.get("http://localhost:8080/admin/category");
  return res;
};

const getAllCategoryByStatus = async () => {
  const res = await adminClient.get(
    "http://localhost:8080/admin/category/getAll"
  );
  return res;
};

export const createCategory = async (form) => {
  return await adminClient.post(
    "http://localhost:8080/admin/category/add",
    form
  );
};
const getOne = async (id) => {
  const res = await adminClient.get(
    `http://localhost:8080/admin/category/${id}`
  );
  return res;
};
const changeStatus = async (id) => {
  const res = await adminClient.put(
    `http://localhost:8080/admin/category/changeStatus/${id}`
  );
};
export { getAllCategory, getOne, changeStatus, getAllCategoryByStatus };
