import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import NotFound404 from './pages/NotFound404';
import AdminDashboard from './pages/AdminDashboard';
import ProtectRoute from './components/ProtectRoute';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import ProductEditPage from './pages/ProductEditPage';
import ProductAddPage from './pages/ProductAddPage';

function App() {
	return (
		<Router>
			<Header />
			<Switch>
				<Route exact path='/' component={HomePage} />
				<Route
					exact
					path='/login'
					render={() => <LoginPage isPage={true} />}
				/>
				<Route exact path='/signup' component={SignupPage} />
				<Route exact path='/cakes' component={ProductsPage} />
				<Route exact path='/cakes/:id' component={ProductPage} />
				<Route exact path='/cart/:id?' component={CartPage} />
				<ProtectRoute
					exact
					path='/shipping'
					restrictTo={['admin', 'user']}
					component={ShippingPage}
				/>
				<ProtectRoute
					exact
					path='/payment'
					restrictTo={['admin', 'user']}
					component={PaymentPage}
				/>

				<ProtectRoute
					exact
					path='/profile'
					restrictTo={['admin', 'user']}
					component={ProfilePage}
				/>
				<ProtectRoute
					exact
					path='/admindash'
					component={AdminDashboard}
					restrictTo={['admin']}
				/>
				<ProtectRoute
					exact
					path='/cake/add'
					component={ProductAddPage}
					restrictTo={['admin']}
				/>
				<ProtectRoute
					exact
					path='/cake/edit/:id'
					component={ProductEditPage}
					restrictTo={['admin']}
				/>

				<Route path='*' component={NotFound404} />
			</Switch>
			<Footer />
		</Router>
	);
}

export default App;
