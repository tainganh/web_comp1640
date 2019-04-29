import * as Types from "../constants/types";
import axios from "axios";
export const loginUser = dataToSubmit => {
  const request = axios
    .get(`http://tinled.timhsoft.tk/adminLogin/${dataToSubmit.email}/${dataToSubmit.password}`)
    .then(res => res.data);
  return {
    type: Types.LOGIN,
    payload: request
  };
};
export const auth = () => {
  const request = axios.get("/api/users/auth").then(res => res.data);
  return {
    type: Types.AUTH_USER,
    payload: request
  };
};
export const logout = () => {
  const request = axios.get("/api/users/logout").then(res => res.data);
  return {
    type: Types.LOGOUT,
    payload: request
  };
};
