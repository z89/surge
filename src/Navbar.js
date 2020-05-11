import React from 'react';
import { useHistory, Link} from "react-router-dom";
//import Logo from'./assets/logos/business.svg';
import './assets/css/style.css'
import { Button } from 'reactstrap';

const Menu = (props) => {
  let history = useHistory();

  let userName = (localStorage.getItem("email")).substring(0, 25);

  if (localStorage.getItem("authenticated") === 'true') {
    return (
      <div>
        <nav class="navbar navbar-expand-lg">

          <a class="navbar-brand" href="/">luma.io</a>

          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
            <a class="nav-link" href="/"> <Link to="/">HOME</Link></a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="/stocks">  <Link to="/stocks">STOCKS</Link></a>
            </li>
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
        <nav class="navbar navbar-expand-lg ">
          
          <a class="navbar-brand" href="/">luma.io</a>

          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
            <a class="nav-link" href="/"> <Link to="/">HOME</Link></a>
            </li>
          </ul>

          <div className="row">
            <div className="col-sm-4 ">   <Button className="logout" color="success" onClick={() => {setTimeout(() => history.push("/login"))}}>login</Button> </div>
            <div className="col-sm-8 ">   <Button className="logout" color="primary" onClick={() => {setTimeout(() => history.push("/register"))}}>register</Button> </div>
          </div>

        </nav>

      </div>
    );    
  }  

}

export default Menu;