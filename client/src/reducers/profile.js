import {
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  error: {},
  loading: true,
};

const profileReducer = (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: data,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: data,
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: data,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: true,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: data,
        loading: false,
      };

    default:
      return state;
  }
};

export default profileReducer;
