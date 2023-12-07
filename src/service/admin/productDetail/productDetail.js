import { adminClient } from "../http";

export const getAllProductDetailsByProductId = async (productId) => {
  return adminClient.get(`http://localhost:8080/ProductDetail/${productId}`);
};

export const getAllProductDetail = async () => {
  return adminClient.get(`http://localhost:8080/ProductDetail`);
};
