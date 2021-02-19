import React, { useState, useEffect } from "react";
import "../assets/css/style.css";

// Import line graph component
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

// Import table components
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { MDBDataTable } from "mdbreact";

let columnsDefs, method, headers, api_url;
const API_URL = "http://127.0.0.1:4000/";
// Chart options & data
const chartData = {
  labels: [],
  datasets: [
    {
      data: [],
      label: ["asd"],
      fill: true,
      lineTension: 0.3,
      backgroundColor: "rgba(225, 204,230, .3)",
      borderColor: "#FFF",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgb(205, 130,1 58)",
      pointBackgroundColor: "rgb(255, 255, 255)",
      pointBorderWidth: 10,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgb(0, 0, 0)",
      pointHoverBorderColor: "rgba(220, 220, 220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
    },
  ],
};

function FetchData(props) {
  // Declare states
  const [rowData, setRowData] = useState([]);
  const [start, setStart] = useState(localStorage.getItem("start"));
  const [filter, setFilter] = useState(localStorage.getItem("filter"));
  const [end, setEnd] = useState(localStorage.getItem("end"));

  useEffect(() => {
    localStorage.setItem("start", start);
  }); // Store the starting date for filter
  const updateStart = (props) => {
    setStart(props.target.value);
  }; // Update the starting date

  useEffect(() => {
    localStorage.setItem("filter", filter);
  }); // Store the boolean 'filter' which determines if a filter occured

  useEffect(() => {
    localStorage.setItem("end", end);
  }); // Store the ending date for filter
  const updateEnd = (props) => {
    setEnd(props.target.value);
  }; // Update the end date

  // Determine the props requested by the API & set correct the params for fetch
  if (props.request === "symbols") {
    if (props.all === "true") {
      method = "GET";
      headers = { aceept: "application/json", "Content-Type": "application/json" };

      api_url = API_URL + "stocks/" + props.request;

      columnsDefs = [
        { label: "Symbol", field: "symbol", sort: "asc", width: 150 },
        { label: "Stock", field: "name", sort: "asc", width: 150 },
        { label: "Industry", field: "industry", sort: "asc", width: 150 },
      ];
    } else {
      method = "GET";
      headers = { aceept: "application/json", "Content-Type": "application/json" };

      api_url = API_URL + "stocks/" + props.request;

      columnsDefs = [
        { label: "Timestamp", field: "timestamp", sort: "asc", width: 150 },
        { label: "Symbol", field: "symbol", sort: "asc", width: 150 },
        { label: "Stock", field: "name", sort: "asc", width: 150 },
        { label: "Industry", field: "industry", sort: "asc", width: 150 },
        { label: "Open", field: "open", sort: "asc", width: 150 },
        { label: "High", field: "high", sort: "asc", width: 150 },
        { label: "Low", field: "low", sort: "asc", width: 150 },
        { label: "Close", field: "close", sort: "asc", width: 150 },
        { label: "Volumes", field: "volumes", sort: "asc", width: 150 },
      ];
    }
  } else if (props.request === "authed") {
    if (props.auth === "true") {
      const token = localStorage.getItem("token");
      method = "GET";
      headers = { aceept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${token}` };

      if (localStorage.getItem("filter") === "true") {
        api_url =
          API_URL +
          "stocks/authed/" +
          localStorage.getItem("symbol") +
          "?from=" +
          localStorage.getItem("start") +
          "T00:00:00.000Z&to=" +
          localStorage.getItem("end") +
          "T00:00:00.000Z";
        console.log(api_url);
      } else {
        api_url = API_URL + "stocks/" + props.symbol;
      }

      columnsDefs = [
        { label: "Timestamp", field: "timestamp", sort: "asc", width: 150 },
        { label: "Symbol", field: "symbol", sort: "asc", width: 150 },
        { label: "Stock", field: "name", sort: "asc", width: 150 },
        { label: "Industry", field: "industry", sort: "asc", width: 150 },
        { label: "Open", field: "open", sort: "asc", width: 150 },
        { label: "High", field: "high", sort: "asc", width: 150 },
        { label: "Low", field: "low", sort: "asc", width: 150 },
        { label: "Close", field: "close", sort: "asc", width: 150 },
        { label: "Volumes", field: "volumes", sort: "asc", width: 150 },
      ];
    } else {
      method = "GET";
      headers = { aceept: "application/json", "Content-Type": "application/json" };

      api_url = API_URL + "stocks/" + props.symbol;

      columnsDefs = [
        { label: "Symbol", field: "symbol", sort: "asc", width: 150 },
        { label: "Stock", field: "name", sort: "asc", width: 150 },
        { label: "Industry", field: "industry", sort: "asc", width: 150 },
      ];
    }
  }

  // Fetch requested API data
  useEffect(() => {
    fetch(`${api_url}`, { method, headers })
      .then((results) => {
        localStorage.setItem("status", results.status);
        return results.json();
      })
      .then((data) => {
        //  Return data based on single object or array of objects
        if (props.request === "authed" && props.auth === "false") {
          return [data];
        } else if (props.request === "authed" && props.auth === "true") {
          if (localStorage.getItem("filter") === "true") {
            return data;
          } else {
            return [data];
          }
        } else {
          return data;
        }
      })
      .then((data) =>
        data.map((stock, index) => {
          // Give data from fetch to chart object
          let tempTimeStamp = new Date(stock.timestamp).toLocaleDateString("en-GB").substring(0, 10);
          chartData.labels.push(tempTimeStamp);
          chartData.datasets[0].data.unshift(data[index].close);
          chartData.datasets[0].label = [stock.name];

          // Determine which localStorage data gets stored based on reques
          if (props.request === "symbols") {
            switch (props.link) {
              case "true": {
                return {
                  symbol: (
                    <a className="RowLinkA" href={"/stocks/" + stock.symbol}>
                      <div className="RowLink">{stock.symbol}</div>
                    </a>
                  ),
                  name: (
                    <a className="RowLinkA" href={"/stocks/" + stock.symbol}>
                      <div className="RowLink">{stock.name}</div>
                    </a>
                  ),
                  industry: stock.industry,
                };
              }
              case "false": {
                return {
                  symbol: stock.symbol,
                  name: stock.name,
                  industry: stock.industry,
                };
              }
              default: {
                return {};
              }
            }
          } else if (props.request === "authed") {
            switch (props.auth) {
              case "true": {
                // Parse timestamp into proper format
                stock.timestamp = new Date(stock.timestamp).toLocaleDateString("en-GB").substring(0, 10);

                // Set localStorage data
                localStorage.setItem("timestamp", stock.timestamp);
                localStorage.setItem("symbol", stock.symbol);
                localStorage.setItem("name", stock.name);
                localStorage.setItem("industry", stock.industry);
                localStorage.setItem("open", stock.open);
                localStorage.setItem("high", stock.high);
                localStorage.setItem("low", stock.low);
                localStorage.setItem("close", stock.close);
                localStorage.setItem("volumes", stock.volumes);

                // Return data in an object
                return {
                  timestamp: stock.timestamp,
                  symbol: stock.symbol,
                  name: stock.name,
                  industry: stock.industry,
                  open: stock.open,
                  high: <div className="high">{stock.high + " ▲"}</div>,
                  low: <div className="low">{stock.low + " ▼"}</div>,
                  close: (
                    <div className={stock.open < stock.close ? "high" : "low"}>
                      {stock.open < stock.close ? stock.close + " ▲" : stock.close + " ▼"}
                    </div>
                  ),
                  volumes: stock.volumes,
                };
              }
              case "false": {
                // If not authentciated set localStorage data
                localStorage.setItem("symbol", stock.symbol);
                localStorage.setItem("name", stock.name);
                localStorage.setItem("industry", stock.industry);

                return {
                  symbol: stock.symbol,
                  name: stock.name,
                  industry: stock.industry,
                };
              }
              default: {
                // No authentication given do nothing
                return {};
              }
            }
          }
          // Arrow function expect a return though case is never met
          return <div></div>;
        })
      )
      .then((stocks) => {
        return setRowData(stocks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.request, props.auth, props.link, props.filter]);

  // Declare data for table
  const data = {
    columns: columnsDefs,
    rows: rowData,
  };

  // Return requested API data in table and chart
  if (props.home === "true") {
    return (
      <div className="container-fluid">
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
              <MDBDataTable striped bordered small data={data} />
            </div>
          </div>
          <div className="col-sm-2"></div>
        </div>
      </div>
    );
  } else {
    if (props.auth === "true") {
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
            <div className="col-sm-2"></div>
            <div className="col-sm-2">
              <form>
                <label>From: </label>
                <input className="form-control" type="date" onChange={updateStart} value={start} />
              </form>
            </div>
            <div className="col-sm-2">
              <form>
                <label>To: </label>
                <input className="form-control" type="date" onChange={updateEnd} value={end} />
              </form>
            </div>
            <div className="col-sm-2">
              <label style={{ opacity: "0%" }}>sddsd</label>
              <br />
              <button
                color="info"
                onClick={() => {
                  setFilter("true");
                  window.location.href = window.location.href;
                }}
              >
                filter
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8">
              <div className="table table-striped">
                <MDBTable>
                  <MDBTableHead columns={columnsDefs} />
                  <MDBTableBody rows={rowData} />
                </MDBTable>
              </div>
            </div>
            <div className="col-sm-2"></div>
          </div>

          {localStorage.getItem("filter") === "true" ? (
            <div className="row">
              <div className="col-sm-12">
                <MDBContainer>
                  <h3 className="mt-5">Line chart</h3>
                  <Line data={chartData} options={{ responsive: true }} />
                </MDBContainer>
              </div>
            </div>
          ) : null}
        </div>
      );
    } else {
      // Unauthorised view of stocks
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
          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-4">
              <h5 class="authorised-only">Login to view the authorised data</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8">
              <div className="table table-striped">
                <MDBTable>
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
