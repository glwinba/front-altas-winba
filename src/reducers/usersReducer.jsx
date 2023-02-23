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
      // console.log(action.payload)
      // let deleteUser = state.data_users.find((user) => user.RFCPROVEEDOR === action.payload);
      // let estado = state.data_users.splice(state.data_users.indexOf(deleteUser), 1);
      // console.log(estado)

      return { ...state, data_users: state.data_users.filter(({ RFCPROVEEDOR }) => RFCPROVEEDOR !== action.payload) }
    default:
      return state;
  }
};
