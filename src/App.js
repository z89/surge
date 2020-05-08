import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './components/Home'
import Login from './components/Auth'
import Register from './components/Auth'
import Stocks from './components/Stocks'


function App() {

  return (
    <Router>
      <div>
        <h1>SURGE</h1>
        <Link to={'/'}>Home</Link>
        <Link to={'/login'}>Login</Link>
        <Link to={'/register'}>Register</Link>
        <Link to={'/stocks'}>Stocks</Link>
        <hr/>
      </div>
     
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/stocks" component={Stocks} />
      </div>
     
      
     
    </Router>
  );
}

export default App;
