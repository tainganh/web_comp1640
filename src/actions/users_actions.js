import * as Types from "../constants/types";
import axios from "axios";
// Users
export const getUsers = () => {
  const request = axios
    .get("http://tinled.timhsoft.tk/userInfos")
    .then(res => res.data);
  return {
    type: Types.GET_USERS,
    payload: request
  };
};
export const editUser = (id, data) => {
  const request = axios
    .put(`http://tinled.timhsoft.tk/userInfos/${id}`, data)
    .then(res => res.data);
  return {
    type: Types.UPDATE_USER,
    payload: request
  };
};
export const deleteUser = id => dispatch => {  
  axios.delete(`http://tinled.timhsoft.tk/userInfos/${id}`).then(res =>
    dispatch({
      type: Types.DELETE_USER,
      payload: id
    })
  );
};
export const addUser = data => {   
  const request = axios
    .post("http://tinled.timhsoft.tk/userInfos", data)
    .then(res => res.data);
  return {
    type: Types.AUTH_USER,
    payload: request
  };
};
