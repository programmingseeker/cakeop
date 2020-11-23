import React from 'react';
import { Route } from 'react-router-dom';
import { clearErrors } from '../actions/appActions';
import { useDispatch } from 'react-redux';

const RouteMiddleware = ({ component: Component, restrictTo, ...rest }) => {
	const dispatch = useDispatch();
	dispatch(clearErrors());
	return (
		<Route
			{...rest}
			render={(props) => {
				return <Component {...props} />;
			}}
		/>
	);
};

export default RouteMiddleware;
