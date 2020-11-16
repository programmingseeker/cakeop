import axios from 'axios';
import {
	USER_INFO_FAIL,
	USER_INFO_REQUEST,
	USER_INFO_RESET,
	USER_INFO_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_GOOGLE_LOGIN_FAIL,
	USER_GOOGLE_LOGIN_SUCCESS,
	USER_GOOGLE_LOGIN_REQUEST,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
} from './../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });
		const { data } = await axios.post('/api/user/login', {
			email,
			password,
		});
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
		localStorage.setItem('user', JSON.stringify(data.user));
		dispatch(getUserInfo());
	} catch (err) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const signup = (username, email, password, confirmPassword) => async (
	dispatch
) => {
	try {
		dispatch({ type: USER_REGISTER_REQUEST });
		const { data } = await axios.post('/api/user/signup', {
			username,
			email,
			password,
			confirmPassword,
		});
		dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
		localStorage.setItem('user', JSON.stringify(data.user));
		dispatch(getUserInfo());
	} catch (err) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const googleAuth = (tokenId) => async (dispatch) => {
	try {
		dispatch({ type: USER_GOOGLE_LOGIN_REQUEST });
		const { data } = await axios.post('/api/user/login/google', {
			tokenId,
		});
		dispatch({ type: USER_GOOGLE_LOGIN_SUCCESS, payload: data });
		localStorage.setItem('user', JSON.stringify(data.user));
		dispatch(getUserInfo());
	} catch (err) {
		dispatch({
			type: USER_GOOGLE_LOGIN_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const logout = () => async (dispatch) => {
	localStorage.removeItem('user');
	dispatch({ type: USER_LOGOUT });
	dispatch(clearUserInfo());
};

export const getUserInfo = () => async (dispatch) => {
	try {
		dispatch({ type: USER_INFO_REQUEST });
		const { data } = await axios.get('/api/user/me');
		dispatch({ type: USER_INFO_SUCCESS, payload: data });
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (err) {
		dispatch({
			type: USER_INFO_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const clearUserInfo = () => async (dispatch) => {
	localStorage.removeItem('userInfo');
	dispatch({ type: USER_INFO_RESET });
};
