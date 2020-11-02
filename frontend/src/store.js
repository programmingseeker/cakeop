import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// IMPORT REDUCERS

import { authReducer } from './reducers/userReducer';
import {
	productListReducer,
	productDetailsReducer,
	productCreateReviewReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

const reducers = combineReducers({
	auth: authReducer,
	productList: productListReducer,
	productDetails: productDetailsReducer,
	productCreateReview: productCreateReviewReducer,
	cart: cartReducer,
});

const userFromStorage = localStorage.getItem('user')
	? JSON.parse(localStorage.getItem('user'))
	: undefined;

const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const initialState = {
	auth: {
		user: userFromStorage,
	},
	cart: {
		cartItems: cartItemsFromStorage,
	},
};

const middleware = [thunk];
const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
