import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Header from './components/Header';
import Footer from './components/Footer';
import AllCakes from './components/AllCakes';
function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/login' render={()=><LoginPage isPage={true}/>} />
        <Route exact path='/signup' component={SignupPage} />
        <Route exact path='/cakes' component={AllCakes} />
        <Route exact path='/cakes/settings' render={()=><AllCakes tab={'settings'}/>} />
        <Route exact path='/cakes/reviews' render={()=><AllCakes tab={'reviews'}/>} />
        <Route exact path='/cakes/bookings' render={()=><AllCakes tab={'bookings'}/>} />
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;