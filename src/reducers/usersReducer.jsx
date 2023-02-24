import { DELETE_USER_DATA, EDIT_USER_DATA, SET_DATAUSERS, SET_LOADING } from "../actions/types";

const initialState = {
  loading: false,
  data_users: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };

    case SET_DATAUSERS:
      return { ...state, data_users: action.payload };

    case DELETE_USER_DATA:
      return {
        ...state,
        data_users: state.data_users.filter(
          ({ RFCPROVEEDOR }) => RFCPROVEEDOR !== action.payload
        ),
      };

    case EDIT_USER_DATA:
      const { RFCPROVEEDOR, RAZONSOCIALPROVEEDOR, EMAIL } = action.payload;
      const findUser = state.data_users.find((user) => user.RFCPROVEEDOR === RFCPROVEEDOR)
      findUser.RFCPROVEEDOR = RFCPROVEEDOR;
      findUser.RAZONSOCIALPROVEEDOR = RAZONSOCIALPROVEEDOR;
      findUser.EMAIL = EMAIL;
      return { ...state, data_users: findUser };

    default:
      return state;
  }
};
