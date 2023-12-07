import { adminClient } from "../http";

const getAllBrands = async () => {
  const res = await adminClient.get("http://localhost:8080/admin/brand");
  return res;
};

const changeStatus = async (id) => {
  const res = await adminClient.put(
    `http://localhost:8080/admin/brand/changeStatus/${id}`
  );
};

export const createBrands = async (form) => {
  return await adminClient.post(
    "http://localhost:8080/admin/brand/add",
    form
  );
};

const getOne = async (id) => {
  const res = await adminClient.get(`http://localhost:8080/admin/brand/${id}`);
  return res;
};
export { getAllBrands, changeStatus ,getOne};
