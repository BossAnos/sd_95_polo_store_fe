import { adminClient } from "../http";

const getAllMaterial = async () => {
  const res = await adminClient.get("http://localhost:8080/admin/material");
  return res;
};

export const createMaterial = async (form) => {
  return await adminClient.post(
    "http://localhost:8080/admin/material/add",
    form
  );
};
const getOne = async (id) => {
  const res = await adminClient.get(`http://localhost:8080/admin/material/${id}`);
  return res;
};


export { getAllMaterial , getOne};
