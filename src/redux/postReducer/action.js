import axios from "axios";
import {
  ADD_POST_FAILED,
  ADD_POST_PENDING,
  ADD_POST_SUCCESS,
  DELETE_POST_FAILED,
  DELETE_POST_PENDING,
  DELETE_POST_SUCCESS,
  GET_POST_FAILED,
  GET_POST_PENDING,
  GET_POST_SUCCESS,
  HIDE_POST_FAILED,
  HIDE_POST_PENDING,
  HIDE_POST_SUCCESS,
  UPDATE_POST_FAILED,
  UPDATE_POST_PENDING,
  UPDATE_POST_SUCCESS,
} from "./actionType";
import Swal from "sweetalert2";

//get all post actions
export const getAllPost = () => async (dispatch) => {
  try {
    dispatch({ type: GET_POST_PENDING });
    const responst = await axios.get(
      "http://localhost:6060/linkedinposts?_sort=id&_order=desc"
    );
    dispatch({ type: GET_POST_SUCCESS, payload: responst.data });
  } catch (error) {
    dispatch({ type: GET_POST_FAILED });
  }
};

//delete post action
export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_POST_PENDING });

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:6060/linkedinposts/${id}`);
        dispatch({ type: DELETE_POST_SUCCESS, payload: id });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  } catch (error) {
    dispatch({ type: DELETE_POST_FAILED });
  }
};

//ADD  post action
export const addNewPost = (data) => async (dispatch) => {
  try {
    dispatch({ type: ADD_POST_PENDING });
    const newData = await axios.post(
      "http://localhost:6060/linkedinposts",
      data
    );
    dispatch({ type: ADD_POST_SUCCESS, payload: newData.data });
  } catch (error) {
    dispatch({ type: ADD_POST_FAILED });
  }
};

//Update post action
export const updatePost = (data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_POST_PENDING });
    const respons = await axios.patch(
      `http://localhost:6060/linkedinposts/${data.id}`,
      data
    );
    const editData = respons.data;
    dispatch({ type: UPDATE_POST_SUCCESS, payload: editData });
  } catch (error) {
    dispatch({ type: UPDATE_POST_FAILED });
  }
};

//Hide linkedin Post
export const hideLinkedInPost = (id) => (dispatch) => {
  try {
    dispatch({ type: HIDE_POST_PENDING });
    dispatch({ type: HIDE_POST_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: HIDE_POST_FAILED });
  }
};
