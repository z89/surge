import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './pages/Login'
import Home from './pages/Home'
import Stocks from './pages/Stocks'
import Register from './pages/Register'
import ProtectedRoute from './components/AuthRoute'
import Header from './Header'
import Footer from './Footer'

import './style.css'

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
    <Router>
      
        <Header />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <ProtectedRoute exact path="/stocks" component={Stocks} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>

        <Footer />
 
    </Router>
    </div>
  );

  }

ReactDOM.render(
<React.StrictMode>
  <BrowserRouter>
  <App />
  </BrowserRouter>
  
  </React.StrictMode>,
  document.getElementById('root')
);


