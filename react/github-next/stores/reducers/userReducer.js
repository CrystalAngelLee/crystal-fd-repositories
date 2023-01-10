import { LOGOUT } from '../constants/ActionTypes';
export const defaultUserState = {};

const UserReducer = (state = defaultUserState, action) => {
  switch (action.type) {
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default UserReducer;
