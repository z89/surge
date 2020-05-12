import React from 'react'
import FetchData from "../components/StockAPI";

function Stocks({match}) {
  let auth = localStorage.getItem("authenticated");
  if(auth === 'true') {
    return(
       <div>
        
           <FetchData auth={auth} page='false' link='false' info='true' request={match.params.id}/>
        </div>
    );
  } else if (auth === 'false') {
    return (

      <div>
        <p>Auth to see more data</p>
        <FetchData auth={auth} page='false' link='false' info='true' request={match.params.id}/>
      </div>
    )
  }
 
}

export default Stocks;

/*import React, { useState, useEffect} from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import '../assets/css/style.css'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const API_URL = "http://131.181.190.87:3000"

function Stocks() {
  const [rowData, setRowData] = useState([]);

  const columnsDefs = [
    {
      dataField: 'symbol',
      text: 'Symbol',
      style: (column) => {
        return {
          width: '100px'
        }
      }
    },
    {
      dataField: 'name',
      text: 'Stock',
    }, 
    {
      dataField: 'industry',
      text: 'Industry',
    },
  ];

  useEffect(() => {
    fetch(`${API_URL}/stocks/symbols`)
    .then(results => results.json())
    .then(data => data.map((stock, index) => {
      return {
        name: stock.name,
        symbol: stock.symbol,
        industry: stock.industry,
        open: stock.open
      };
    })
    )
    .then(stocks => setRowData(stocks))
    .catch((err) => {
      console.log("fetch url function not working");
      
    });
    
  }, []);


  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="table table-striped">
          <BootstrapTable keyField='symbol' data={ rowData } columns={ columnsDefs } pagination={ paginationFactory() } />
        </div>
      </div>
    </div>
  );
}

export default Stocks;
*/