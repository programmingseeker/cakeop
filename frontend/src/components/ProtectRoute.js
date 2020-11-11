import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectRoute = ({ component: Component, restrictTo, ...rest }) => {
	let isAuthenticated = false;
	const { user } = useSelector((state) => state.auth);
	if (user) {
		const { userType } = user;
		if (restrictTo.includes(userType)) {
			isAuthenticated = true;
		}
	}
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
