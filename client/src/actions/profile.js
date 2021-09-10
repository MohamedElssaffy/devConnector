import axios from 'axios';
import {
  CLEAR_PROFILE,
  DELETE_ACCCOUNT,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from './types';
import { setAlert } from './alert';

export const getAuthUserProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/profile/me');

    dispatch({
      type: GET_PROFILE,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      data: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

// For Create and Update Profile

export const createProfile =
  (data, history, edit = false) =>
  async (dispatch) => {
    try {
      const res = await axios.post('/profile', data);

      dispatch({ type: GET_PROFILE, data: res.data });
      dispatch(
        setAlert(!edit ? 'Profile created' : 'Profile updated', 'success')
      );

      if (!edit) {
        history.push('/dashboard');
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_ERROR,
        data: { msg: err.response.data.msg, status: err.response.status },
      });
    }
  };

// For add experience or education

export const addFeatures = (data, history, feature) => async (dispatch) => {
  try {
    const res = await axios.patch(`/profile/${feature.toLowerCase()}`, data);

    dispatch({ type: UPDATE_PROFILE, data: res.data });
    dispatch(setAlert(`${feature} Added`, 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      data: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

export const deleteFeatures = (id, feature) => async (dispatch) => {
  try {
    const res = await axios.delete(`/profile/${feature}/${id}`);

    dispatch({ type: UPDATE_PROFILE, data: res.data });
    dispatch(
      setAlert(
        `${feature[0].toUpperCase() + feature.slice(1)} Removed`,
        'success'
      )
    );
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      data: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete('/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: DELETE_ACCCOUNT });

      dispatch(setAlert('Your account has been deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        data: { msg: err.response.data.msg, status: err.response.status },
      });
    }
  }
};
