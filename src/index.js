import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Form';
import Form from './Form';
import Home from './home/Home';
import reportWebVitals from './reportWebVitals';
import Header from "./Header";
import reactDom from "react-dom";
import Signup from './home/Signup';

reactDom.render(
  <div>
    <Header/>
        <App/>
  </div>
  
 
,document.querySelector("#root")
)

// ReactDOM.render( <Home/>,document.querySelector("#root")
// )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
