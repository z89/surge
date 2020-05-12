
import React, { useState, useEffect } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import '../assets/css/style.css'

import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { MDBDataTable } from 'mdbreact';


const API_URL = "http://131.181.190.87:3000"

let columnsDefs

function FetchData(props) {
  console.log("render");

  const [rowData, setRowData] = useState([]);

  if(props.request === 'symbols') {
    columnsDefs = [
      {
        label: 'Symbol',
        field: 'symbol',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Stock',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Industry',
        field: 'industry',
        sort: 'asc',
        width: 150
      },
    ];
  } else {
    if(props.auth === 'true') {
      columnsDefs = [
        {
          label: 'Symbol',
          field: 'symbol',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Stock',
          field: 'name',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Industry',
          field: 'industry',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Open',
          field: 'open',
          sort: 'asc',
          width: 150
        },
        {
          label: 'High',
          field: 'high',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Low',
          field: 'low',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Close',
          field: 'close',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Volumes',
          field: 'volumes',
          sort: 'asc',
          width: 150
        },
      ];
    } else {
      columnsDefs = [
        {
          label: 'Symbol',
          field: 'symbol',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Stock',
          field: 'name',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Industry',
          field: 'industry',
          sort: 'asc',
          width: 150
        },
      ];
    }
   
  }
  
  useEffect(() => {
    fetch(`${API_URL}/stocks/` + props.request)
    .then(results => {
     
      localStorage.setItem("status", results.status);
       return results.json();
    })
    .then(data => {
      if(props.request === 'symbols') {
        return data;
      } else {
       return [data];
      }
    }
    )
    .then(data => data.map((stock, index) => {
      if(props.request === 'symbols' && props.link === 'true') {
        /*
         symbol: <a className="RowLinkA" href={'/stocks/' + stock.symbol}><div className="RowLink">{stock.symbol}</div></a>,
          name:  <a className="RowLinkA" href={'/stocks/' + stock.symbol}><div className="RowLink">{stock.name}</div></a>,
        */
        return {
          symbol: <a className="RowLinkA" href={'/stocks/' + stock.symbol}><div className="RowLink">{stock.symbol}</div></a>,
          name:  <a className="RowLinkA" href={'/stocks/' + stock.symbol}><div className="RowLink">{stock.name}</div></a>,
          industry: stock.industry,
        }
      } else if(props.request === 'symbols' && props.link === 'false') {
        return {
          symbol: stock.symbol,
          name:  stock.name,
          industry: stock.industry,
        }
      }
      else if (props.auth === 'true' && props.request !== 'symbols') {
          localStorage.setItem("symbol", stock.symbol);
          localStorage.setItem("name", stock.name);
          localStorage.setItem("industry", stock.industry);
          localStorage.setItem("open", stock.open);
          localStorage.setItem("high", stock.high);
          localStorage.setItem("low", stock.low);
          localStorage.setItem("close", stock.close);
          localStorage.setItem("volumes", stock.volumes);
          return {
            symbol: stock.symbol,
            name: stock.name,
            industry: stock.industry,
            open: stock.open,
            high: <div className="high">{stock.high + ' ▲'}</div>,
            low: <div className="low">{stock.low + ' ▼'}</div>,
            close: <div className={stock.open < stock.close ? 'high' : 'low'}>{stock.open < stock.close ? stock.close + ' ▲' : stock.close + ' ▼'}</div>,
            volumes: stock.volumes
          }
        } if (props.auth === 'false' && props.request !== 'symbols') {
          localStorage.setItem("symbol", stock.symbol);
          localStorage.setItem("name", stock.name);
          localStorage.setItem("industry", stock.industry);
          return {
            symbol: stock.symbol,
            name: stock.name,
            industry: stock.industry,
          }
        }
      }
    ))
    .then(stocks => {
       return setRowData(stocks);
    })
    .catch((err) => {
      console.log("fetch url function not working");
    });
      
  }, [props.request, props.auth, props.link]);
  
  const data = {
    columns: columnsDefs,
    rows: rowData
  }
    

  if(props.info === 'true') {
    return (
      <div className="container-fluid" >
        <div className="row stockTitle">
        <div className="col-sm-1"></div>
        <div className="col-sm-2 stock-symbol ">
          <h1>{localStorage.getItem("symbol")} - </h1>
        </div>
        <div className="col-sm-9 stock-title ">
        <h5>{localStorage.getItem("name")}</h5> 
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
      <div className="container-fluid" >
        <div className="row">
        <div className="col-sm-1"></div>
        <div className="col-sm-2 stock-symbol ">
          <h1>Stocks -</h1>
        </div>
        <div className="col-sm-9 stock-title ">
        <h5>INDEX S&P 500</h5> 
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
  }
 
}

export default FetchData;