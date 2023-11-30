import { adminClient } from "../http";

const getAllColors = async () => {
  const res = await adminClient.get("http://localhost:8080/admin/color");
  return res;
};

const getOne = async (id) => {
  const res = await adminClient.get(`/mv-core/v1/admin/color/${id}`);
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

const updateColor = async (form) => {
  const res = await adminClient.post(
    `/mv-core/v1/admin/color/update/${form.id}`,
    form
  );
  return res;
};

export { getAllColors, deleteColor, updateColor, getOne };
