import React from 'react'
import FetchData from "../components/StockAPI";

// Pass props in to identify URL (a.k.a {match})
function Stocks({match}) {
  if(localStorage.getItem("authenticated") !== null) {

    // Get current user authentication
    let auth = localStorage.getItem("authenticated");

    if(auth === 'true') {  
      // If the requested stock table should be filtered
      if(localStorage.getItem('filter') === 'true') {
        return(
          <div>
             <FetchData auth={auth} info='true' symbol={match.params.id} request="authed"/>
          </div>
        ); 
      } else {
        return(
          <div>
             <FetchData auth={auth} info='true' symbol={match.params.id} request="authed"/>
          </div>
        );
      }
    } 
    else if (auth === 'false') {
      return (
        <div>
          <FetchData auth={auth} symbol={match.params.id} request="authed"/>
        </div>
      )
    }
  } else {
    localStorage.setItem("authenticated", 'false');
  }
}

export default Stocks;
