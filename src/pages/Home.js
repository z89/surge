import React from "react";
import '../assets/css/style.css'
import FetchData from "../components/StockAPI";

export default function Home() {
    return (

      <div className="page">
      <FetchData request='symbols'/>
      </div>
      
    );
 
}
