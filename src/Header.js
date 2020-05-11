import React from "react";
import { useHistory, Link} from "react-router-dom";

export default function Header() {
    let history = useHistory();

    if (localStorage.getItem("authenticated") === 'true') {
      return (
          <div>
            <h1>SURGE</h1>
            <p>
              Welcome!{" "}
              <Link to="/">Home</Link>
              <Link to="/stocks">Stocks</Link>
              <button onClick={() => {localStorage.setItem("authenticated", false); setTimeout(() => history.push("/"))}}> Sign out </button> 
            </p>
          </div>
      );
    } else {
      return (
        <div>
          <h1>SURGE</h1>
          <Link to="/" >Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      );    
    }  
}