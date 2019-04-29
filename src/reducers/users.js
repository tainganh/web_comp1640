import * as Types from "../constants/types";

export default function(state = {}, action) {
  switch (action.type) {
    
    case Types.GET_USERS:
      return { ...state, users: action.payload.response };
    case Types.DELETE_USER:
  
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload)
      };
    case Types.ADD_USER:
    
      return {
        ...state,
        addUser: action.payload.types
      };
    case Types.UPDATE_USER:
      return {
        ...state,
        user: action.payload
      };
    
    default:
      return { ...state };
  }
}
