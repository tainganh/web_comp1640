import * as Types from "../constants/types";

export default function(state = {}, action) {
  switch (action.type) {
    case Types.GET_ACTICALS_MANAGER:
      return {
        ...state,
        articals: action.payload.response.filter(
          item => item.status !== "Rejected" && item.status !== "Processing"
        )
      };
    case Types.UPDATE_PUBLISH:
      return { ...state, publish: action.payload.response };
    case Types.ZIP_FILE:
      return { ...state, filezip: action.payload.response };
    default:
      return { ...state };
  }
}
