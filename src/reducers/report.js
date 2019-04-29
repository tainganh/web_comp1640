import * as Types from "../constants/types";

export default function(state = {}, action) {
  switch (action.type) {
    case Types.REPORT:
      return { ...state, report: action.payload.response };
    default:
      return { ...state };
  }
}
