import { jwtDecode } from "jwt-decode";
import { $authHost, $host } from ".";

export const createType = async (type) => {
  const { data } = await $authHost.post('/api/type', type);
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get('/api/type');
  return data;
};

export const createBrand = async (brand) => {
  const { data } = await $authHost.post('/api/brand', brand);
  return data;
};

export const fetchBrands  = async () => {
  const { data } = await $host.get('/api/brand');
  return data;
};

export const createProducts = async (products) => {
  const { data } = await $authHost.post('/api/product', products);
  return data;
};

export const fetchProducts = async () => {
  const { data } = await $host.get('/api/product');
  return data;
};


  
  
