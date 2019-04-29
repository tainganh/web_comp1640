import * as Types from "../constants/types";
import axios from "axios";

export const getProducts = () => {
  const request = axios.get("/api/product/products").then(res => res.data);
  return {
    type: Types.GET_PRODUCTS,
    payload: request
  };
};
export const updateProduct = (id, data) => {
  const request = axios
    .post(`/api/product/update/${id}`, data)
    .then(res => res.data);
  return {
    type: Types.UPDATE_PRODUCT,
    payload: request
  };
};
export const addProduct = datatoSubmit => {
  const request = axios
    .post(`/api/product/article`, datatoSubmit)
    .then(response => response.data);

  return {
    type: Types.ADD_PRODUCT,
    payload: request
  };
};

export const clearProduct = () => {
  return {
    type: Types.CLEAR_PRODUCT,
    payload: ""
  };
};
export const deleteProduct = id => dispatch => {
  axios.get(`/api/product/delete/${id}`).then(res =>
    dispatch({
      type: Types.DELETE_PRODUCT,
      payload: id
    })
  );
};
