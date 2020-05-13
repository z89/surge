import React from "react";
import '../assets/css/style.css'
import FetchData from "../components/StockAPI";

export default function Home() {
  if(localStorage.getItem("authenticated") !== null) {
    let auth = localStorage.getItem("authenticated");

    return(
      <div>
          <FetchData auth={auth} link='true' home='true' request='symbols' all='true'/>
       </div>
   );
  } else {
    localStorage.setItem("authenticated", 'false');
    
  }

   
  
 
}
