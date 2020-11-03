import axios from 'axios';
import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
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

export const logout = () => async (dispatch) => {
	localStorage.removeItem('user');
	dispatch({ type: USER_LOGOUT });
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
