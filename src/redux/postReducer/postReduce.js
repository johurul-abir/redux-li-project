import {
  GET_POST_FAILED,
  GET_POST_PENDING,
  GET_POST_SUCCESS,
  DELETE_POST_PENDING,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILED,
  ADD_POST_PENDING,
  ADD_POST_SUCCESS,
  ADD_POST_FAILED,
  UPDATE_POST_PENDING,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILED,
  HIDE_POST_FAILED,
  HIDE_POST_SUCCESS,
  HIDE_POST_PENDING,
} from "./actionType";
import { initialState } from "./initialState";

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST_PENDING:
      return {
        ...state,
        loading: true,
      };

    case GET_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
        msg: "Post data get successfully done",
      };

    case GET_POST_FAILED:
      return {
        ...state,
        loading: false,
        error: "Post data get failed",
      };

    case DELETE_POST_PENDING:
      return {
        ...state,
        loading: true,
      };

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((data) => data.id !== action.payload),
        msg: "Post data delete successfully done",
      };

    case DELETE_POST_FAILED:
      return {
        ...state,
        loading: false,
        error: "Post data delete failed",
      };

    case ADD_POST_PENDING:
      return {
        ...state,
        loading: true,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, action.payload],
        msg: "update post successfully done",
      };
    case ADD_POST_FAILED:
      return {
        ...state,
        loading: false,
        error: "update post failed",
      };

    case UPDATE_POST_PENDING:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((item) => {
          if (item.id == action.payload.id) {
            return action.payload;
          } else {
            return item;
          }
        }),

        msg: "update post successfully done",
      };

    case UPDATE_POST_FAILED:
      return {
        ...state,
        loading: false,
        error: "update post failed",
      };

    case HIDE_POST_PENDING:
      return {
        ...state,
        loading: true,
      };
    case HIDE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((data) => data.id !== action.payload),

        msg: "update post successfully done",
      };

    case HIDE_POST_FAILED:
      return {
        ...state,
        loading: false,
        error: "update post failed",
      };
    default:
      return state;
  }
};

//export
export default postReducer;
