import { adminClient } from "../http";

const getAllColors = async () => {
  const res = await adminClient.get("http://localhost:8080/admin/color");
  return res;
};

const getAllColorsByStatus = async () => {
  const res = await adminClient.get("http://localhost:8080/admin/color/getAll");
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
  return await adminClient.post("http://localhost:8080/admin/color/add", form);
};

const changeStatus = async (id) => {
  const res = await adminClient.put(
    `http://localhost:8080/admin/color/changeStatus/${id}`
  );
};

export {
  getAllColors,
  deleteColor,
  getOne,
  changeStatus,
  getAllColorsByStatus,
};
