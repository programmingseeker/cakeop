import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors } from '../actions/appActions';

const ProtectRoute = ({ component: Component, restrictTo, ...rest }) => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	let isAuthenticated = false;
	if (user) {
		const { userType } = user;
		if (restrictTo.includes(userType)) {
			isAuthenticated = true;
		}
	}
	dispatch(clearErrors());
	return (
		<Route
			{...rest}
			render={(props) => {
				if (isAuthenticated) {
					return <Component {...props} />;
				} else {
					return <Redirect to='/' />;
				}
			}}
		/>
	);
};

export default ProtectRoute;
