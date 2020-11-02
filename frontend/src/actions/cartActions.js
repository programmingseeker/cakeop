import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from './../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/cake/${id}`);
	const Productdata = data.data;

	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: Productdata.id,
			name: Productdata.name,
			image: Productdata.images[0],
			price: Productdata.price,
			quantity: qty,
			weight: Productdata.weight,
			theme: Productdata.theme,
		},
	});

	localStorage.setItem(
		'cartItems',
		JSON.stringify(getState().cart.cartItems)
	);
};

export const removeFromCart = (id) => (dispatch, getState) => {
	dispatch({
		type: CART_REMOVE_ITEM,
		payload: id,
	});
	localStorage.setItem(
		'cartItems',
		JSON.stringify(getState().cart.cartItems)
	);
};
