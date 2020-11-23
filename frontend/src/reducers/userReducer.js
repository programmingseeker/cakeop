import {
	USER_INFO_REQUEST,
	USER_INFO_SUCCESS,
	USER_INFO_FAIL,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_GOOGLE_LOGIN_FAIL,
	USER_GOOGLE_LOGIN_REQUEST,
	USER_GOOGLE_LOGIN_SUCCESS,
	USER_ERROR_RESET,
} from './../constants/userConstants';

export const authReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { ...state, loading: true };
		case USER_LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				user: action.payload,
			};
		case USER_LOGIN_FAIL:
			return { ...state, loading: false, error: action.payload };
		case USER_REGISTER_REQUEST:
			return { ...state, loading: true };
		case USER_REGISTER_SUCCESS:
			return {
				...state,
				loading: false,
				user: action.payload,
			};
		case USER_REGISTER_FAIL:
			return { ...state, loading: false, error: action.payload };
		case USER_GOOGLE_LOGIN_REQUEST:
			return { ...state, loading: true };
		case USER_GOOGLE_LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				user: action.payload,
			};
		case USER_GOOGLE_LOGIN_FAIL:
			return { ...state, loading: false, error: action.payload };
		case USER_INFO_REQUEST:
			return { ...state, loading: true };
		case USER_INFO_SUCCESS:
			return { ...state, loading: false, user: action.payload };
		case USER_INFO_FAIL:
			return { ...state, loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};
		case USER_ERROR_RESET:
			return { ...state, error: undefined };
		default:
			return state;
	}
};
