import React from "react";
import '../assets/css/style.css'
import FetchData from "../components/StockAPI";

export default function Home() {
  let auth = localStorage.getItem("authenticated");

  return(
    <div>
        <FetchData auth={auth} page='true' link='true' info='false' request='symbols'/>
     </div>
 );
   
  
 
}
