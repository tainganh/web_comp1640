import * as Types from "../constants/types";

export default function(state = {}, action) {
  switch (action.type) {
    
    case Types.GET_TYPES:
      return { ...state, types: action.payload.response };
    case Types.DELETE_TYPE:
     
      return {
        ...state,
        types: state.types.filter(type => type.id !== action.payload)
      };
    case Types.ADD_TYPE:
    
      return {
        ...state,
        addTypes: action.payload.types
      };
    case Types.UPDATE_TYPE:
      return {
        ...state,
        type: action.payload
      };
    
    default:
      return { ...state };
  }
}
