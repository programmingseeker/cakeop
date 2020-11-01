import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// IMPORT REDUCERS

import { authReducer } from './reducers/userReducer';
import {
	productListReducer,
	productDetailsReducer,
} from './reducers/productReducers';

const reducers = combineReducers({
	auth: authReducer,
	productList: productListReducer,
	productDetails: productDetailsReducer,
});

const userFromStorage = localStorage.getItem('user')
	? JSON.parse(localStorage.getItem('user'))
	: undefined;
const initialState = {
	auth: {
		user: userFromStorage,
	},
};

const middleware = [thunk];
const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
