import * as Types from "../constants/types";
import axios from "axios";

export const report = year => {
  const request = axios
    .get("http://tinled.timhsoft.tk/report")
    .then(res => res.data);
  return {
    type: Types.REPORT,
    payload: request
  };
};
