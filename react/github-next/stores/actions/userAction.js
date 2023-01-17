import axios from 'axios';
import { LOGOUT } from '../constants/ActionTypes';

// action creactors
export const logout = () => {
  // type: LOGOUT,
  return (dispatch) => {
    axios
      .post('/logout')
      .then((resp) => {
        if (resp.status === 200) {
          dispatch({ type: LOGOUT });
        } else {
          console && console.log('logout failed', resp);
        }
      })
      .catch((err) => console && console.error(err));
  };
};
