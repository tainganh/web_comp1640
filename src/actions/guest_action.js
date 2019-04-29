import * as Types from "../constants/types";
import axios from "axios";
// guest

export const getActicalsGuest = () => {
  const request = axios
    .get("http://tinled.timhsoft.tk/acticals")
    .then(res => res.data);
  return {
    type: Types.GET_ACTICALS_GUEST,
    payload: request
  };
};
