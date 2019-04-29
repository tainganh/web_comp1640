import { combineReducers } from "redux";
import user from "./user";
import category from "./category";
import product from "./product";
import report from "./report";
import topics from "./topics";
import users from "./users";
import student from "./student";
import coordinator from "./coordinator";
import manager from "./manager";
import guest from "./guest";
const rootReducer = combineReducers({
  user,
  category,
  product,
  report,
  topics,
  users,
  student,
  coordinator,
  manager,
  guest
});
export default rootReducer;
