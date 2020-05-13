import React from 'react';
import { Button } from 'reactstrap';
import { useHistory, Link} from "react-router-dom";

import './assets/css/style.css'

const Menu = (props) => {
  let history = useHistory();
  let title = 'stock.io';

  if (localStorage.getItem("authenticated") === 'true') {
    let userName = (localStorage.getItem("email")).substring(0, 25);

    // Render authenticated Menu
    return (
      <div>
        <nav className="navbar navbar-expand-lg">  
          <a className="navbar-brand" href="/">{title}</a>

          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
            <a className="nav-link" href="/"> <Link to="/">STOCK LIST</Link></a>
            </li>
          </ul>

          <div className="row welcomeText">
            <div className="col-sm-12"> Welcome <b>{userName}</b></div>
          </div>
          <div className="row">
            <div className="col-sm-8 "> <Button className="logout" onClick={() => {localStorage.setItem("authenticated", false); setTimeout(() => {window.location.href = '/login'})}}>LOGOUT</Button> </div>
            <div className="col-sm-4 "></div>
          </div>
        </nav>
      </div>
  );
  }
    else {
      // Render unathenticated Menu
      return (
        <div>
          <nav className="navbar navbar-expand-lg">
            <a className="navbar-brand" href="/">{title}</a>
    
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
              <a className="nav-link" href="/"> <Link to="/">STOCK LIST</Link></a>
              </li>
            </ul>
    
            <div className="row">
              <div className="col-sm-4 ">  
                <Button className="logout"  onClick={() => {setTimeout(() => history.push("/login"))}}>LOGIN</Button> 
              </div>
              <div className="col-sm-8 ">  
                <Button className="logout"  onClick={() => {setTimeout(() => history.push("/register"))}}>REGISTER</Button>
              </div>
            </div>
          </nav>
      </div>
      );    
    }  
}

export default Menu;