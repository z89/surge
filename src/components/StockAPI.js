
import React, { useState, useEffect } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import '../assets/css/style.css'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const API_URL = "http://131.181.190.87:3000"

let columnsDefs

function FetchData(props) {
  console.log("render");

  const [rowData, setRowData] = useState([]);

  if(props.request === 'symbols') {
    columnsDefs = [
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
  } else {
    if(props.auth === 'true') {
      columnsDefs = [
        {
          dataField: 'symbol',
          text: 'Symbol',  
        },
        {
          dataField: 'name',
          text: 'Stock',
        }, 
        {
          dataField: 'industry',
          text: 'Industry',
        },
        {
          dataField: 'open',
          text: 'Open',
        },
        {
          dataField: 'high',
          text: 'High',
        },
        {
          dataField: 'low',
          text: 'Low',
        },
        {
          dataField: 'close',
          text: 'Close',
        },
        {
          dataField: 'volumes',
          text: 'Volumes',
        },
      ];
    } else {
      columnsDefs = [
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
      if(props.request === 'symbols') {
        return {
          symbol: <a className="RowLinkA" href={'/stocks/' + stock.symbol}><div className="RowLink">{stock.symbol}</div></a>,
          name:  <a className="RowLinkA" href={'/stocks/' + stock.symbol}><div className="RowLink">{stock.name}</div></a>,
          industry: stock.industry,
        }
      } else {
        if(props.auth === 'true') {
          return {
            symbol: <a className="RowLinkA" href={'/stocks/' + stock.symbol}><div className="RowLink">{stock.symbol}</div></a>,
            name: <a className="RowLinkA" href={'/stocks/' + stock.symbol}><div className="RowLink">{stock.name}</div></a>,
            industry: stock.industry,
            open: stock.open,
            high: stock.high,
            low: stock.low,
            close: stock.close,
            volumes: stock.volumes
          }
        } else {
          return {
            symbol: <a className="RowLinkA" href={'/stocks/' + stock.symbol}><div className="RowLink">{stock.symbol}</div></a>,
            name:  <a className="RowLinkA" href={'/stocks/' + stock.symbol}><div className="RowLink">{stock.name}</div></a>,
            industry: stock.industry,
          }
        }
       
      }
     
    })
    )
    .then(stocks => {
       return setRowData(stocks);
    })
    .catch((err) => {
      console.log("fetch url function not working");
    });
      
  }, [props.request, props.auth]);
 
  if(localStorage.getItem("status") === '200') {
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="table table-striped">
            <BootstrapTable selectRow={ console.log("asd") } keyField='name' data={rowData} columns={ columnsDefs } pagination={ paginationFactory() } hover/>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div><p>Bad Request</p></div>

    )
  }
 
}

export default FetchData;