import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './styles.css'

// Web Components
import Header from './Header'
import Footer from "./Footer";
import Stocks from './components/Stocks'

// Web Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'




function App() {
  
  return (
    <Router>
         <div className="App">
      <Header />

   
        
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/stocks" component={Stocks} />
   

      <Footer />
      </div>
      
     
    </Router>
 
  );
  
}
export default App;

