import { adminClient } from "../http";

export const getAllRole = async (params) => {
  return await adminClient.get("http://localhost:8080/admin/role", {
    params,
  });
};

const getOne = async (id) => {
  const res = await adminClient.get(`http://localhost:8080/admin/role/${id}`);
  return res;
};



export const createColor = async (form) => {
  return await adminClient.post("http://localhost:8080/admin/role/add", form);
};

const changeStatus = async (id) => {
  const res = await adminClient.put(
    `http://localhost:8080/admin/role/changeStatus/${id}`
  );
};export {  getOne, changeStatus };

