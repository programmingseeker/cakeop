import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import GetAllCakes from './pages/GetAllCakes';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import NotFound404 from './pages/NotFound404';
import AdminDashboard from './pages/AdminDashboard';
import AddProdForm from './components/TestAddProdForm';
import ProtectRoute from './components/ProtectRoute';
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
				<Route exact path='/cakes' component={GetAllCakes} />
				<Route exact path='/cakes/:id' component={ProductPage} />
				<Route exact path='/cart/:id?' component={Cart} />

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
					path='/addproduct'
					component={AddProdForm}
					restrictTo={['admin']}
				/>

				<Route path='*' component={NotFound404} />
			</Switch>
			<Footer />
		</Router>
	);
}

export default App;
