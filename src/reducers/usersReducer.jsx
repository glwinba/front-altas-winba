import { DELETE_USER_DATA, SET_DATAUSERS, SET_LOADING } from "../actions/types";

const initialState = {
  loading: false,
  data_users: []
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };

    case SET_DATAUSERS:
      return { ...state, data_users: action.payload };

    case DELETE_USER_DATA:
      const deleteUser = state.data_users.find((user) => user.RFCPROVEEDOR === action.payload);
      return state.data_users.splice(state.data_users.indexOf(deleteUser), 1);
    
    default:
      return state;
  }
};
