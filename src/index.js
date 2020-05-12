import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './pages/Login'
import Home from './pages/Home'
import Stocks from './pages/Stocks'
import Register from './pages/Register'
import Header from './Header'

import 'bootstrap/dist/css/bootstrap.css';

import './assets/css/style.css'

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';


export default function App() {

  return (
    <div className="App container-fluid">
    <Router>
      
        <Header />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/stocks" component={Stocks} />
          <Route exact path="/stocks/:id" component={Stocks} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>

   
 
    </Router>
    </div>
  );

  }

ReactDOM.render(
  <BrowserRouter>
  <App />
  </BrowserRouter>,

  document.getElementById('root')
);


