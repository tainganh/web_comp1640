import * as Types from "../constants/types";

export default function(state = {}, action) {
  switch (action.type) {
    case Types.GET_ACTICALS_COR:
      var loginUser = JSON.parse(localStorage.getItem("loginSuccess"));
      return {
        ...state,
        articals: action.payload.response.filter(
          item =>
            item.userInfo.faculity.id === loginUser.response.faculity.id &&
            item.status !== "Publish"
        )
      };
    case Types.UPDATE_ACEPT:
      return { ...state, accept: action.payload.response };
    case Types.UPDATE_RECHECK:
      return {
        ...state,
        rejeck: action.payload.types
      };
    case Types.COMMENT_COR:
      return {
        ...state,
        commentCor: action.payload.response
      };
    case Types.ADD_COMMENT_COR:
      return {
        ...state,
        addCommentCor: action.payload
      };
    default:
      return { ...state };
  }
}
