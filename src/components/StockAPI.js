
import React, { useState, useEffect } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import '../assets/css/style.css'

import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { MDBDataTable } from 'mdbreact';

let columnsDefs, method, headers, API_URL;


function FetchData(props) {
  const [rowData, setRowData] = useState([]);
  const [start, setStart] = useState('2020-03-20'); 
  const [filter, setFilter] = useState(localStorage.getItem('filter')); 
  const [end, setEnd] = useState('2020-03-24');

  useEffect(() => {localStorage.setItem('start', start)})  // Use useEffect to store email value in localStorage
  const updateStart = props => {setStart(props.target.value)} // update the email with the event (props) argument 

  useEffect(() => {localStorage.setItem('filter', filter)})  // Use useEffect to store email value in localStorage
  const updateFilter = props => {setFilter(props)} // update the email with the event (props) argument 


  useEffect(() => {localStorage.setItem('end', end)})  // Use useEffect to store email value in localStorage
  const updateEnd = props => {setEnd(props.target.value)} // update the email with the event (props) argument 

  if (props.request === 'symbols') {
    if(props.all === 'true') {
      method = "GET";
      headers =  {aceept: "application/json", "Content-Type": "application/json"};

      API_URL = "http://131.181.190.87:3000/stocks/" + props.request;
      
      columnsDefs = [ 
        {label: 'Symbol', field: 'symbol', sort: 'asc', width: 150},
        {label: 'Stock', field: 'name', sort: 'asc', width: 150},
        {label: 'Industry', field: 'industry', sort: 'asc', width: 150},
      ];
    } else {
      method = "GET";
      headers =  {aceept: "application/json", "Content-Type": "application/json"};

      API_URL = "http://131.181.190.87:3000/stocks/" + props.request;
      
      columnsDefs = [ 
        {label: 'Timestamp', field: 'timestamp', sort: 'asc', width: 150},
        {label: 'Symbol', field: 'symbol', sort: 'asc', width: 150},
        {label: 'Stock', field: 'name', sort: 'asc', width: 150},
        {label: 'Industry', field: 'industry', sort: 'asc', width: 150},
        {label: 'Open', field: 'open', sort: 'asc', width: 150},
        {label: 'High', field: 'high', sort: 'asc', width: 150},
        {label: 'Low', field: 'low', sort: 'asc', width: 150},
        {label: 'Close', field: 'close', sort: 'asc', width: 150},
        {label: 'Volumes', field: 'volumes', sort: 'asc', width: 150},
      ];

    }
  } else if (props.request === 'authed') {
    if(props.auth === 'true') {
      const token = localStorage.getItem("token");
      method = "GET";
      headers =  {aceept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${token}`};
    
      if(localStorage.getItem("filter") === 'true') {
         API_URL = "http://131.181.190.87:3000/stocks/authed/AAL?from=" + localStorage.getItem('start') + "T00:00:00.000Z&to=" + localStorage.getItem('end') + "T00:00:00.000Z";
      } else {
        API_URL = "http://131.181.190.87:3000/stocks/" + props.symbol;
      }

      columnsDefs = [ 
        {label: 'Timestamp', field: 'timestamp', sort: 'asc', width: 150},
        {label: 'Symbol', field: 'symbol', sort: 'asc', width: 150},
        {label: 'Stock', field: 'name', sort: 'asc', width: 150},
        {label: 'Industry', field: 'industry', sort: 'asc', width: 150},
        {label: 'Open', field: 'open', sort: 'asc', width: 150},
        {label: 'High', field: 'high', sort: 'asc', width: 150},
        {label: 'Low', field: 'low', sort: 'asc', width: 150},
        {label: 'Close', field: 'close', sort: 'asc', width: 150},
        {label: 'Volumes', field: 'volumes', sort: 'asc', width: 150},
      ];
    } else {
      method = "GET";
      headers =  {aceept: "application/json", "Content-Type": "application/json"};

      API_URL = "http://131.181.190.87:3000/stocks/" + props.symbol;

      columnsDefs = [ 
        {label: 'Symbol', field: 'symbol', sort: 'asc', width: 150},
        {label: 'Stock', field: 'name', sort: 'asc', width: 150},
        {label: 'Industry', field: 'industry', sort: 'asc', width: 150},
      ];
    }
  }

  useEffect(() => {
      fetch(`${API_URL}`, {method, headers})
      .then(results => {
        localStorage.setItem("status", results.status);
       
        return results.json();
      })
      .then(data => {   
   
        if(props.request === 'authed' && props.auth === 'false') {
      
          return [data];
        } else if (props.request === 'authed' && props.auth === 'true') {
         if(localStorage.getItem('filter') === 'true') {
         
          return data;
          
         } else {
  
          return [data];
         }
        
      
        } else {
     
          return data;
        }  
      }
      )
      .then(data => data.map((stock, index) => {
        
        if(props.request === 'symbols') {
          switch(props.link) {
            case 'true': {
              return {
                symbol: <a className="RowLinkA" href={'/stocks/' + stock.symbol}><div className="RowLink">{stock.symbol}</div></a>,
                name:  <a className="RowLinkA" href={'/stocks/' + stock.symbol}><div className="RowLink">{stock.name}</div></a>,
                industry: stock.industry,
              }
            }
            case 'false': {
              return {
                symbol: stock.symbol,
                name:  stock.name,
                industry: stock.industry,
              }
            }
            default: {
              return {
                
              };
            }
          }
        }  else if (props.request === 'authed') {
          switch(props.auth) {
            case 'true': {
              stock.timestamp = new Date(stock.timestamp).toLocaleDateString('en-GB').substring(0, 10);
              localStorage.setItem("init", (stock.timestamp).split("/").reverse().join("-"));

              
              localStorage.setItem("timestamp", stock.timestamp);
              localStorage.setItem("symbol", stock.symbol);
              localStorage.setItem("name", stock.name);
              localStorage.setItem("industry", stock.industry);
              localStorage.setItem("open", stock.open);
              localStorage.setItem("high", stock.high);
              localStorage.setItem("low", stock.low);
              localStorage.setItem("close", stock.close);
              localStorage.setItem("volumes", stock.volumes);
              return {
                timestamp: stock.timestamp,
                symbol: stock.symbol,
                name: stock.name,
                industry: stock.industry,
                open: stock.open,
                high: <div className="high">{stock.high + ' ▲'}</div>,
                low: <div className="low">{stock.low + ' ▼'}</div>,
                close: <div className={stock.open < stock.close ? 'high' : 'low'}>{stock.open < stock.close ? stock.close + ' ▲' : stock.close + ' ▼'}</div>,
                volumes: stock.volumes
              }
            }
            case 'false': {
              localStorage.setItem("symbol", stock.symbol);
              localStorage.setItem("name", stock.name);
              localStorage.setItem("industry", stock.industry);
              return {
                symbol: stock.symbol,
                name: stock.name,
                industry: stock.industry,
              }
            }
            default: {
              return {

              };
            }
          }
        }
        return (
          <div>
            ret
          </div>
        )
        
      } 
      ))
      .then(stocks => {

        return setRowData(stocks);
      })
      .catch((err) => {
        console.log("fetch url function not working");
      });
    
      
  }, [props.request, props.auth, props.link, props.filter]);

  const data = {
    columns: columnsDefs,
    rows: rowData
  }
  
    
  if(props.home === 'true') {
    return (
      <div className="container-fluid" >
        <div className="row">
        <div className="col-sm-1"></div>
        <div className="col-sm-2 stock-symbol ">
          <h1>Stocks -</h1>
        </div>
        <div className="col-sm-9 stock-title ">
        <h5>CURRENT LIST OF STOCKS</h5> 
        </div>
      </div>
      
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8">
            <div className="table table-striped">
            <MDBDataTable
      striped
      bordered
      small
      data={data}
    />
            </div>
          </div>
          <div className="col-sm-2"></div>
        </div>
      </div>
    );
  }  else {
    if(props.auth === 'true') {
          return (
        <div>
          <div className="row stockTitle">
            <div className="col-sm-1"></div>
            <div className="col-sm-2 stock-symbol ">
              <h1>{localStorage.getItem("symbol")} - </h1>
            </div>
            <div className="col-sm-9 stock-title ">
              <h5>{localStorage.getItem("name")}</h5> 
            </div>
          </div>
          
          <div className="row ">
  
          <div className="col-sm-6"></div>
          <div className="col-sm-3">
          <form>
            <label >From: </label>
            <input type="date" onChange={updateStart} value={start} />
            </form>
          </div>
         <div className="col-sm-3">
           <form>
           <label >To: </label>
            <input type="date" onChange={updateEnd} value={end}/>
           </form>
          <button onClick={() => {setFilter('true'); window.location.href = window.location.href}}>filter</button>
          </div>
          
       
           </div>

          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8">
              <div className="table table-striped">
                <MDBTable >
                  <MDBTableHead columns={columnsDefs} />
                  <MDBTableBody rows={rowData} />
                </MDBTable>
              </div>
            </div>
            <div className="col-sm-2"></div>
          </div>
      

        </div>
      );
    } else {
      
      return (
        <div>
          <div className="row stockTitle">
            <div className="col-sm-1"></div>
            <div className="col-sm-2 stock-symbol ">
              <h1>{localStorage.getItem("symbol")} - </h1>
            </div>
            <div className="col-sm-9 stock-title ">
              <h5>{localStorage.getItem("name")}</h5> 
            </div>
          </div>
          <p>not auth</p>
          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8">
              <div className="table table-striped">
                <MDBTable >
                  <MDBTableHead columns={columnsDefs} />
                  <MDBTableBody rows={rowData} />
                </MDBTable>
              </div>
            </div>
            <div className="col-sm-2"></div>
          </div>
        </div>
      );

    }


    
  }
  
}

export default FetchData;