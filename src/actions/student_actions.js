import * as Types from "../constants/types";
import axios from "axios";
// Students
export const getArticals = () => {
    const request = axios.get("http://tinled.timhsoft.tk/acticals").then(res => res.data);
    return {
      type: Types.GET_ACTICALS,
      payload: request
    };
};
export const editWord = (id, data) => {
  const request = axios
    .put(`http://tinled.timhsoft.tk/userInfos/${id}`, data)
    .then(res => res.data);
  return {
    type: Types.UPDATE_USER,
    payload: request
  };
};

export const addArticals = data => { 
  console.log(data);
    
  const request = axios
    .post("http://tinled.timhsoft.tk/acticals", data)
    .then(res => res.data);
  return {
    type: Types.ADD_ACTICALS,
    payload: request
  };
};
export const getCommentById = (id) => {
  const request = axios
    .get(`http://tinled.timhsoft.tk/commentsOfActical/${id}`)
    .then(res => res.data);
  return {
    type: Types.GET_COMMENT,
    payload: request
  };
};
