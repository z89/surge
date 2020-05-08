import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import logo from './logo.svg';
//import './App.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { Router } from 'react-router-dom';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
const rootElement = document.getElementById('root');

ReactDOM.render(
  <Router history={history}>
    <React.StrictMode>
    <App />
  </React.StrictMode>,
  </Router>,
  
  rootElement
  
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
