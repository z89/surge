import React from 'react';
import { useHistory, Link} from "react-router-dom";

import './assets/css/style.css'
import { Button } from 'reactstrap';

const Menu = (props) => {
  let history = useHistory();

  let userName = (localStorage.getItem("email")).substring(0, 25);

  if (localStorage.getItem("authenticated") === 'true') {
    return (
      <div>
        <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand" href="/">stocks.io</a>

          <ul className="navbar-nav mr-auto">
            <div className="row">
              <div className="col-sm-6">
              <li className="nav-item active">
                <Link to="/">HOME</Link>
              </li>
              </div>
              <div className="col-sm-6">
              <li className="nav-item">
              <Link to="/stocks">STOCKS</Link>
              </li>
              </div>
            </div>
          
          
          </ul>

          <div className="row welcomeText">
            <div className="col-sm-12"> Welcome <b>{userName}</b></div>
          </div>
          <div className="row">
        
            <div className="col-sm-8 "> <Button className="logout" color="primary" onClick={() => {localStorage.setItem("authenticated", false); setTimeout(() => history.push("/"))}}>LOGOUT</Button> </div>
            <div className="col-sm-4 "> </div>
          </div>
        </nav>

      </div>
    
  );
  }
  else {
    return (
      <div>
      <nav className="navbar navbar-expand-lg">
      <a className="navbar-brand" href="/">stocks.io</a>

        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
          <a className="nav-link" href="/"> <Link to="/">HOME</Link></a>
          </li>
        </ul>

        <div className="row">
      
         <div className="col-sm-4 ">   <Button className="logout" color="primary" onClick={() => {setTimeout(() => history.push("/login"))}}>LOGIN</Button> </div>
            <div className="col-sm-8 ">   <Button className="logout" color="primary" onClick={() => {setTimeout(() => history.push("/register"))}}>REGISTER</Button> </div>
        
         
        </div>
      </nav>

    </div>
          
    );    
  }  

}

export default Menu;