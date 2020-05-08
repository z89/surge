import React, { useState, useEffect } from "react";
import { Button } from 'reactstrap';
import { AgGridReact } from "ag-grid-react";

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
    .then(stocks => setRowData(stocks));
  }, []);
      
      
  return (
    <div className="ag-theme-balham" style={{ height: "600px", width: "1200px"}}>
      <AgGridReact columnDefs={columns} rowData={rowData} pagination={true}/>
      <Button color="danger">Register</Button>
    </div>
  );
}

export default Stocks;

