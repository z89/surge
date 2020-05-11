import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './Navbar'
import './assets/css/style.css'

export default function Header() {

    if (localStorage.getItem("authenticated") === 'true') {
      return (
          <div className="App">
      
              <Navbar />
          </div>
      );
    } else {
      return (
        <div className="App">
       
          <Navbar />
        
      </div>
      );    
    }  
}