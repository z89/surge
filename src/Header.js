import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

function Header() {
  
  return (
    
      <div>
        <h1>SURGE</h1>
        <Link to={'/'}>Home</Link>
        <Link to={'/login'}>Login</Link>
        <Link to={'/register'}>Register</Link>
        <Link to={'/stocks'}>Stocks</Link>
        <hr/>
      </div>

  );
  
}
export default Header;

