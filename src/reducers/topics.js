import * as Types from "../constants/types";

export default function(state = {}, action) {
  switch (action.type) {
    
    case Types.GET_TOPICS:
      return { ...state, topics: action.payload.response };
    case Types.DELETE_TOPIC:
     
      return {
        ...state,
        topics: state.topics.filter(topic => topic.id !== action.payload)
      };
    case Types.ADD_TOPIC:
    
      return {
        ...state,
        addTopic: action.payload.types
      };
    case Types.UPDATE_TOPIC:
      return {
        ...state,
        topic: action.payload
      };
    
    default:
      return { ...state };
  }
}
