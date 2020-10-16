import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS
} from './../constants/userConstants';

export const authReducer = (state = {}, action) => { 
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true }
    case USER_LOGIN_SUCCESS:
      return {...state, loading: false, status: action.payload.status, message: action.payload.message, user: action.payload.user }
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload }
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true }
    case USER_REGISTER_SUCCESS:
      return {...state, loading: false, status: action.payload.status, message: action.payload.message, user: action.payload.user }
    case USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state;
  }
}