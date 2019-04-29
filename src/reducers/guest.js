import * as Types from "../constants/types";

export default function(state = {}, action) {
  switch (action.type) {
    case Types.GET_ACTICALS_GUEST:
      var loginUser = JSON.parse(localStorage.getItem("loginSuccess"));
      return {
        ...state,
        articals: action.payload.response.filter(
          item =>
            item.userInfo.faculity.id === loginUser.response.faculity.id &&
            item.status === "Public"
        )
      };
    
    default:
      return { ...state };
  }
}
