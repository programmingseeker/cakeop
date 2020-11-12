import axios from 'axios';
import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DELIVER_FAIL,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_LIST_MY_FAIL,
	ORDER_LIST_MY_REQUEST,
	ORDER_LIST_MY_SUCCESS,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
} from '../constants/orderConstants';
import { CART_CLEAR_ITEMS } from '../constants/cartConstants';

export const createOrder = (order) => async (dispatch) => {
	try {
		dispatch({ type: ORDER_CREATE_REQUEST });
		const { data } = await axios.post(`/api/order`, order);
		dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
		dispatch({ type: CART_CLEAR_ITEMS });
		localStorage.removeItem('cartItems');
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({ type: ORDER_CREATE_FAIL, payload: message });
	}
};

export const getOrderDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: ORDER_DETAILS_REQUEST });
		const { data } = await axios.get(`/api/order/${id}`);
		dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
	}
};

export const payOrder = (orderId) => async (dispatch) => {
	try {
		dispatch({ type: ORDER_PAY_REQUEST });
		const { data } = await axios.put(`/api/order/${orderId}/pay`);
		dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({ type: ORDER_PAY_FAIL, payload: message });
	}
};

export const deliverOrder = (order) => async (dispatch) => {
	try {
		dispatch({ type: ORDER_DELIVER_REQUEST });
		const { data } = await axios.put(`/api/order/${order._id}/deliver`);
		dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({ type: ORDER_DELIVER_FAIL, payload: message });
	}
};

export const listMyOrders = () => async (dispatch) => {
	try {
		dispatch({ type: ORDER_LIST_MY_REQUEST });
		const { data } = await axios.get(`/api/order/myorders`);
		dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({ type: ORDER_LIST_MY_FAIL, payload: message });
	}
};

export const listOrders = () => async (dispatch) => {
	try {
		dispatch({ type: ORDER_LIST_REQUEST });
		const { data } = await axios.get(`/api/order`);
		dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({ type: ORDER_LIST_FAIL, payload: message });
	}
};
