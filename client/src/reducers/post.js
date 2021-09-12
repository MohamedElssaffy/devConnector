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

const initialState = {
  post: null,
  posts: [],
  loading: true,
  error: {},
};

const postReducer = (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case GET_POST:
      return {
        ...state,
        post: data,
        loading: false,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: data,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [data, ...state.posts],
        loading: false,
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === data.postId ? { ...post, likes: data.likes } : post
        ),
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== data),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: data },
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== data.commentId
          ),
        },
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: data,
        loading: false,
      };
    default:
      return state;
  }
};

export default postReducer;
