import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Header from './components/Header';


function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/login' render={()=>{return(<LoginPage isPage={true}/>)}} />
        <Route exact path='/signup' component={SignupPage} />
      </Switch>
    </Router>
  );
}

export default App;