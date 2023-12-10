import { adminClient } from "../http";

const getAllSizes = async () => {
  const res = await adminClient.get("http://localhost:8080/admin/size");
  return res;
};
export const createSize = async (form) => {
  return await adminClient.post(
    "http://localhost:8080/admin/size/add",
    form
  );
};
const getOne = async (id) => {
  const res = await adminClient.get(`http://localhost:8080/admin/size/${id}`);
  return res;
};
const changeStatus = async (id) => {
  const res = await adminClient.put(
    `http://localhost:8080/admin/size/changeStatus/${id}`
  );
};

export { getAllSizes,getOne,changeStatus };
