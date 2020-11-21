import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// IMPORT REDUCERS

import { authReducer } from './reducers/userReducer';
import {
	productListReducer,
	productDetailsReducer,
	productCreateReviewReducer,
	productUpdateReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { productCreateReducer } from './reducers/productReducers';
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderDeliverReducer,
	orderListMyReducer,
	orderListReducer,
	orderPayReducer,
} from './reducers/orderReducers';

const reducers = combineReducers({
	auth: authReducer,
	productList: productListReducer,
	productDetails: productDetailsReducer,
	productCreateReview: productCreateReviewReducer,
	productUpdate: productUpdateReducer,
	productCreate: productCreateReducer,
	cart: cartReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderDeliver: orderDeliverReducer,
	orderListMy: orderListMyReducer,
	orderList: orderListReducer,
});

const userFromStorage = localStorage.getItem('user')
	? JSON.parse(localStorage.getItem('user'))
	: undefined;

const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: {};

const initialState = {
	auth: {
		user: userFromStorage,
	},
	cart: {
		cartItems: cartItemsFromStorage,
		shippingAddress: shippingAddressFromStorage,
	},
};

const middleware = [thunk];
const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
