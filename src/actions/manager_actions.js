import * as Types from "../constants/types";
import axios from "axios";

export const getActicalsManager = () => {
  const request = axios
    .get("http://tinled.timhsoft.tk/acticals")
    .then(res => res.data);
  return {
    type: Types.GET_ACTICALS_MANAGER,
    payload: request
  };
};
export const updatePublish = id => {
  const request = axios
    .put(`http://tinled.timhsoft.tk/acticalsPublic/${id}`)
    .then(res => res.data);
  return {
    type: Types.UPDATE_PUBLISH,
    payload: request
  };
};

export const zipFile = data => {
  const request = axios
    .post("http://tinled.timhsoft.tk/fileZip/",data)
    .then(res => res.data);
  return {
    type: Types.ZIP_FILE,
    payload: request
  };
};


