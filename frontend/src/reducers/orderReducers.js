import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_RESET,
	ORDER_CREATE_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DELIVER_FAIL,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_RESET,
	ORDER_DELIVER_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_LIST_MY_FAIL,
	ORDER_LIST_MY_REQUEST,
	ORDER_LIST_MY_RESET,
	ORDER_LIST_MY_SUCCESS,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_RESET,
	ORDER_PAY_SUCCESS,
	ORDER_CREATE_ERROR_RESET,
	ORDER_DETAILS_ERROR_RESET,
	ORDER_PAY_ERROR_RESET,
	ORDER_DELIVER_ERROR_RESET,
	ORDER_LIST_ERROR_RESET,
	ORDER_LIST_MY_ERROR_RESET,
} from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_CREATE_REQUEST:
			return { ...state, loading: true };
		case ORDER_CREATE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				order: action.payload,
			};
		case ORDER_CREATE_FAIL:
			return { ...state, loading: false, error: action.payload };
		case ORDER_CREATE_RESET:
			return {};
		case ORDER_CREATE_ERROR_RESET:
			return { ...state, error: undefined };
		default:
			return state;
	}
};

export const orderDetailsReducer = (
	state = { loading: true, orderItems: [], shippingAddress: {} },
	action
) => {
	switch (action.type) {
		case ORDER_DETAILS_REQUEST:
			return { ...state, loading: true };
		case ORDER_DETAILS_SUCCESS:
			return { ...state, loading: false, order: action.payload };
		case ORDER_DETAILS_FAIL:
			return { ...state, loading: false, error: action.payload };
		case ORDER_DETAILS_ERROR_RESET:
			return { ...state, error: undefined };
		default:
			return state;
	}
};

export const orderPayReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_PAY_REQUEST:
			return { ...state, loading: true };
		case ORDER_PAY_SUCCESS:
			return { ...state, loading: false, success: true };
		case ORDER_PAY_FAIL:
			return { ...state, loading: false, error: action.payload };
		case ORDER_PAY_ERROR_RESET:
			return { ...state, error: undefined };
		case ORDER_PAY_RESET:
			return {};

		default:
			return state;
	}
};

export const orderDeliverReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_DELIVER_REQUEST:
			return { ...state, loading: true };
		case ORDER_DELIVER_SUCCESS:
			return { ...state, loading: false, success: true };
		case ORDER_DELIVER_FAIL:
			return { ...state, loading: false, error: action.payload };
		case ORDER_DELIVER_RESET:
			return {};
		case ORDER_DELIVER_ERROR_RESET:
			return { ...state, error: undefined };
		default:
			return state;
	}
};

export const orderListMyReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case ORDER_LIST_MY_REQUEST:
			return { ...state, loading: true };
		case ORDER_LIST_MY_SUCCESS:
			return { ...state, loading: false, orders: action.payload };
		case ORDER_LIST_MY_FAIL:
			return { ...state, loading: false, error: action.payload };
		case ORDER_LIST_MY_RESET:
			return { orders: [] };
		case ORDER_LIST_MY_ERROR_RESET:
			return { orders: [], error: undefined };
		default:
			return state;
	}
};

export const orderListReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case ORDER_LIST_REQUEST:
			return { ...state, loading: true };
		case ORDER_LIST_SUCCESS:
			return { ...state, loading: false, orders: action.payload };
		case ORDER_LIST_FAIL:
			return { ...state, loading: false, error: action.payload };
		case ORDER_LIST_ERROR_RESET:
			return { ...state, error: undefined };
		default:
			return state;
	}
};
