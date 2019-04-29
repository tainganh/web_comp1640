import * as Types from "../constants/types";
import axios from "axios";
// Faculity
export const getTopics = () => {
  const request = axios.get("http://tinled.timhsoft.tk/topics").then(res => res.data);
  return {
    type: Types.GET_TOPICS,
    payload: request
  };
};
export const editTopic = (id, data) => {  
  const request = axios
    .put(`http://tinled.timhsoft.tk/topics/${id}`, data)
    .then(res => res.data);
  return {
    type: Types.UPDATE_TOPIC,
    payload: request
  };
};
export const deleteTopic = id => dispatch => {
  axios.delete(`http://tinled.timhsoft.tk/topics/${id}`).then(res =>
    dispatch({
      type: Types.DELETE_TOPIC,
      payload: id
    })
  );
};
export const addTopic= data => {
  const request = axios.post("http://tinled.timhsoft.tk/topics", data).then(res => res.data);
  return {
    type: Types.ADD_TOPIC,
    payload: request
  };
};

