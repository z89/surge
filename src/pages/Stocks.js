import React, { useState, useEffect, Suspense } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import '../assets/css/style.css'

const API_URL = "http://131.181.190.87:3000"

function Stocks() {

  const [rowData, setRowData] = useState([]);

  const columns = [
    { headerName: "Stock", field: "name", sortable: true, filter: "text"},
    { headerName: "Symbol", field: "symbol"},
    { headerName: "Industry", field: "industry"}
  ]

  useEffect(() => {
    fetch(`${API_URL}/stocks/symbols`)
    .then(results => results.json())
    .then(data => data.map((stock, index) => {
      return {
        name: stock.name,
        symbol: stock.symbol,
        industry: stock.industry
      };
    })
    )
    .then(stocks => setRowData(stocks))
    .catch((err) => {
      console.log("fetch url function not working");
      
    });
    
  }, []);
      
  if(rowData.length > 0) {
    return (
      <div className="page">
       <div className="ag-theme-alpine" style={{ height: "600px", width: "600px"}}>
          <Suspense fallback={<h1>Loading profile...</h1>}>
            <AgGridReact columnDefs={columns} rowData={rowData} pagination={true}/>
          </Suspense>
        </div>
      </div>
    
    );
  } else {
    return (
      <div className="ag-theme-alpine page" style={{ height: "600px", width: "1200px"}}>
        <div>
          <h4>Fetching data from stock api...</h4>
        </div>
      </div>
    );
    
  }
 
}

export default Stocks;
