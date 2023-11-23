import { adminClient } from "../http";

export const getAllProducts = async (params) => {
  return await adminClient.get("http://localhost:8080/admin/product", {
    params,
  });
};

export const getProductById = async (productId) => {
  return await adminClient.get(
    `http://localhost:8080/admin/product/${productId}`
  );
};

export const createProduct = async (createProductForm) => {
  return await adminClient.post(
    "http://localhost:8080/admin/product/add",
    createProductForm
  );
};
