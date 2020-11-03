import axios from 'axios';

import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_CREATE_REVIEW_FAIL,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_SUCCESS,
} from './../constants/productConstants';

export const listProducts = (
	price = { minimum: 0, maximum: 950 },
	weight = 1000
) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });
		const { data } = await axios.get(
			`/api/cake?price[gte]=${price.minimum}&price[lte]=${price.maximum}&weight[gte]=${weight}`
		);

		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listProductDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST });
		const { data } = await axios.get(`/api/cake/${id}`);

		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const createProductReview = (productId, review) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: PRODUCT_CREATE_REVIEW_REQUEST,
		});
		const {
			auth: { user },
		} = getState();

		await axios.post(`/api/cake/${productId}/review`, review);

		dispatch({
			type: PRODUCT_CREATE_REVIEW_SUCCESS,
		});
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({
			type: PRODUCT_CREATE_REVIEW_FAIL,
			payload: message,
		});
	}
};

export const createProduct = async (productInfo) => {
	await axios.post(`/api/products`, productInfo);
};

export const updateProduct = async (productInfo) => {
	await axios.patch(`/api/products/${productInfo._id}`, productInfo);
};

export const deleteProduct = async (id) => {
	await axios.delete(`/api/products/${id}`);
};
