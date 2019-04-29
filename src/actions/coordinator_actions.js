import * as Types from "../constants/types";
import axios from "axios";
// coordinator
export const updateAcept = id => {
  const request = axios
    .put(`http://tinled.timhsoft.tk/acticalsAccepted/${id}`)
    .then(res => res.data);
  return {
    type: Types.UPDATE_ACEPT,
    payload: request
  };
};
export const getActicalsCor = () => {
  const request = axios
    .get("http://tinled.timhsoft.tk/acticals")
    .then(res => res.data);
  return {
    type: Types.GET_ACTICALS_COR,
    payload: request
  };
};
export const updateReject = id => {
  const request = axios
    .put(`http://tinled.timhsoft.tk/acticalsRejected/${id}`)
    .then(res => res.data);
  return {
    type: Types.UPDATE_RECHECK,
    payload: request
  };
};
export const comments = id => {
  const request = axios
    .get(`http://tinled.timhsoft.tk/commentsOfActical/${id}`)
    .then(res => res.data);
  return {
    type: Types.COMMENT_COR,
    payload: request
  };
};
export const addComments = data => {
  const request = axios
    .post("http://tinled.timhsoft.tk/comments", data)
    .then(res => res.data);
  return {
    type: Types.ADD_COMMENT_COR,
    payload: request
  };
};
