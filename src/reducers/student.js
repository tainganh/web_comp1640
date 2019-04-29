import * as Types from "../constants/types";

export default function(state = {}, action) {
  switch (action.type) {
    case Types.GET_ACTICALS:
      var loginUser = JSON.parse(localStorage.getItem("loginSuccess"));
      return {
        ...state,
        articals: action.payload.response.filter(
          item => item.userInfo.id === loginUser.response.id
        )
      };
    case Types.DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload)
      };
    case Types.ADD_ACTICALS:
      return {
        ...state,
        addActicals: action.payload
      };
    case Types.UPDATE_USER:
      return {
        ...state,
        user: action.payload
      };
    case Types.GET_COMMENT:
      return {
        ...state,
        comment: action.payload
      };
    default:
      return { ...state };
  }
}
