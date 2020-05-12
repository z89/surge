import React from "react";
import '../assets/css/style.css'
import FetchData from "../components/StockAPI";

export default function Home() {
  let auth = localStorage.getItem("authenticated");

  if(auth === 'true') {
    return(
       <div>
           <FetchData auth={auth} request='symbols'/>
        </div>
    );
  } else if (auth === 'false') {
    return (
      <div>
         <FetchData auth={auth} request='symbols'/>
      </div>
    )
  }
 
}
