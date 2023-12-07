import { adminClient } from "../http";

const getAllColors = async () => {
  const res = await adminClient.get("http://localhost:8080/admin/color");
  return res;
};

const getOne = async (id) => {
  const res = await adminClient.get(`http://localhost:8080/admin/color/${id}`);
  return res;
};

const deleteColor = async (id) => {
  const res = await adminClient.deleteCall(
    `/mv-core/v1/admin/color/delete/${id}`
  );
  return res;
};

export const createColor = async (form) => {
  return await adminClient.post(
    "http://localhost:8080/admin/color/add",
    form
  );
};



export { getAllColors, deleteColor, getOne };
