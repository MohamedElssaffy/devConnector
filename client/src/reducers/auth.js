import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_FAIL,
  AUTH_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  DELETE_ACCCOUNT,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: false,
  user: null,
  loading: true,
};

const authReducer = (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        user: data,
        isAuth: true,
        loading: false,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', data.token);

      return {
        ...state,
        ...data,
        isAuth: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
    case DELETE_ACCCOUNT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
