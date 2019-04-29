import * as Types from "../constants/types";
import axios from "axios";
// Faculity
export const getFaculities = () => {
  const request = axios.get("http://tinled.timhsoft.tk/faculities").then(res => res.data);
  return {
    type: Types.GET_TYPES,
    payload: request
  };
};
export const editFaculity = (id, data) => {  
  const request = axios
    .put(`http://tinled.timhsoft.tk/faculities/${id}`, data)
    .then(res => res.data);
  return {
    type: Types.UPDATE_TYPE,
    payload: request
  };
};
export const deleteFaculity = id => dispatch => {
  axios.delete(`http://tinled.timhsoft.tk/faculities/${id}`).then(res =>
    dispatch({
      type: Types.DELETE_TYPE,
      payload: id
    })
  );
};
export const addFaculity= data => {
  const request = axios.post("http://tinled.timhsoft.tk/faculities", data).then(res => res.data);
  return {
    type: Types.ADD_TYPE,
    payload: request
  };
};

