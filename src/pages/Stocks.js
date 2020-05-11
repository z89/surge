import React from 'react';
import {Line} from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

export default function Stocks() {


    return (
      <div>
        <h2>Line Example</h2>
        <Line data={data} />
      </div>
    );
  
};

/*import React, { useState, useEffect, Suspense } from "react";
import { Button } from 'reactstrap';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";


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


    return (
      <div className="ag-theme-balham" style={{ height: "600px", width: "1200px"}}>
        <Suspense fallback={<h1>Loading profile...</h1>}>
          <AgGridReact columnDefs={columns} rowData={rowData} pagination={true}/>
        </Suspense>
        <Button color="danger">Register</Button>
      </div>
    );
  
    
  
}

export default Stocks;
*/