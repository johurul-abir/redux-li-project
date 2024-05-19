import { combineReducers } from "redux";
import postReducer from "./postReducer/postReduce";

const rootRedux = combineReducers({
  post: postReducer,
});

//export default
export default rootRedux;
