import axios from 'axios';

import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  REMOVE_COMMENT,
  UPDATE_POST,
} from '../actions/types';
import { setAlert } from './alert';

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/posts');
    dispatch({
      type: GET_POSTS,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      data: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/posts/${postId}`);
    dispatch({
      type: GET_POST,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      data: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addOrRemoveLikes = (postId, action) => async (dispatch) => {
  try {
    const res = await axios.patch(`/posts/${action}/${postId}`);

    dispatch({
      type: UPDATE_POST,
      data: { postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      data: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/posts/${postId}`);

    dispatch({
      type: DELETE_POST,
      data: postId,
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      data: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addPost = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('/posts', formData);

    dispatch({ type: ADD_POST, data: res.data });
    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      data: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await axios.patch(`/posts/comment/${postId}`, formData);

    dispatch({ type: ADD_COMMENT, data: res.data });

    dispatch(setAlert('Comment Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      data: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const removeComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.patch(`/posts/comment/${postId}/${commentId}`);

    dispatch({ type: REMOVE_COMMENT, data: { commentId } });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      data: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
