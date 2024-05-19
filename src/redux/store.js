import { applyMiddleware, createStore } from "redux";
import rootRedux from "./rootRedux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";

const store = createStore(
  rootRedux,
  composeWithDevTools(applyMiddleware(thunk))
);

//export default
export default store;
