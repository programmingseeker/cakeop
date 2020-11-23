import store from '../store';
import {
	ORDER_CREATE_ERROR_RESET,
	ORDER_DELIVER_ERROR_RESET,
	ORDER_DETAILS_ERROR_RESET,
	ORDER_LIST_ERROR_RESET,
	ORDER_LIST_MY_ERROR_RESET,
	ORDER_PAY_ERROR_RESET,
} from '../constants/orderConstants';
import {
	PRODUCT_LIST_ERROR_RESET,
	PRODUCT_CREATE_ERROR_RESET,
	PRODUCT_CREATE_REVIEW_ERROR_RESET,
	PRODUCT_DELETE_ERROR_RESET,
	PRODUCT_DETAILS_ERROR_RESET,
	PRODUCT_UPDATE_ERROR_RESET,
} from '../constants/productConstants';
import { USER_ERROR_RESET } from '../constants/userConstants';

const itemError = {
	auth: USER_ERROR_RESET,
	productList: PRODUCT_LIST_ERROR_RESET,
	productDetails: PRODUCT_DETAILS_ERROR_RESET,
	productCreate: PRODUCT_CREATE_ERROR_RESET,
	productCreateReview: PRODUCT_CREATE_REVIEW_ERROR_RESET,
	productUpdate: PRODUCT_UPDATE_ERROR_RESET,
	productDelete: PRODUCT_DELETE_ERROR_RESET,
	orderCreate: ORDER_CREATE_ERROR_RESET,
	orderDetails: ORDER_DETAILS_ERROR_RESET,
	orderPay: ORDER_PAY_ERROR_RESET,
	orderList: ORDER_LIST_ERROR_RESET,
	orderListMy: ORDER_LIST_MY_ERROR_RESET,
	orderDeliver: ORDER_DELIVER_ERROR_RESET,
};
export const clearErrors = () => (dispatch, getState) => {
	const state = store.getState();
	for (const item in state) {
		if (state[item].error != undefined) {
			dispatch({ type: itemError[item] });
		}
	}
};
