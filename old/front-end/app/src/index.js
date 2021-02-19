import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './pages/Login'
import Home from './pages/Home'
import Stocks from './pages/Stocks'
import Register from './pages/Register'
import Header from './Header'
import Footer from './Footer'


import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/style.css'

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';


function del() {
  localStorage.removeItem("authenticated", 'false');
  localStorage.removeItem("email", '');
  localStorage.removeItem("password", '');
  localStorage.removeItem("status", '200');
  localStorage.removeItem("init", '');
  localStorage.removeItem("start", '');
  localStorage.removeItem("end", '');
  localStorage.removeItem("token", '');
  localStorage.removeItem("symbol", '');
  localStorage.removeItem("name", '');
  localStorage.removeItem("industry", '');
  localStorage.removeItem("timestamp", '');
  localStorage.removeItem("open", '');
  localStorage.removeItem("high", '');
  localStorage.removeItem("low", '');
  localStorage.removeItem("close", '');
  localStorage.removeItem("volumes", '');
  localStorage.removeItem("filter", 'false');
  localStorage.removeItem("errormsg", '');
}
export default function App() {
  
  // Detect if data in localstorage has been initalized
  // (Note: init not needed but ran out of time to add proper deletion & handling off localStorage)
  if(localStorage.getItem('email') === null) {
    localStorage.setItem("authenticated", 'false');
    localStorage.setItem("email", '');
    localStorage.setItem("password", '');
    localStorage.setItem("status", '200');
    localStorage.setItem("init", '');
    localStorage.setItem("start", '');
    localStorage.setItem("end", '');
    localStorage.setItem("token", '');
    localStorage.setItem("symbol", '');
    localStorage.setItem("name", '');
    localStorage.setItem("industry", '');
    localStorage.setItem("timestamp", '');
    localStorage.setItem("open", '');
    localStorage.setItem("high", '');
    localStorage.setItem("low", '');
    localStorage.setItem("close", '');
    localStorage.setItem("volumes", '');
    localStorage.setItem("filter", 'false');
    localStorage.setItem("errormsg", '');
    
    // Return a homepage that has no data initalized (First homepage load)
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
    )
  } else {
    // Return a homepage with initalized data
    // <button onClick={del}>asdasd</button>
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
        <Footer />
      </Router>
      </div>
    );
  } 
}

ReactDOM.render(
  <BrowserRouter>
  <App />
  </BrowserRouter>,
  document.getElementById('root')
);


