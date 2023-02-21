import { initializeApp } from "firebase/app";
import "./form.css";
import Cdashboard from "./dashboard/Cdashboard";
import {
  Administrator,
  Donate,
  LoginA,
} from "./Administrator/Administrator.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import React from "react";
import house from "./imgs/househelp1.png";
import Header from "./Header";
import { FullPaymentPage } from "./request/Request";
import { PaymentPage } from "./request/customer_details/Customer";
import Home from "./home/Home.js";
// import { GuarantorDetails ,Signup } from './home/Signup';
import { Signup, SignupPaymentPage } from "./home/Signup";
import Dashboard from "./dashboard/dashboard";
import Login from "./home/Login";
import { Customer } from "./request/customer_details/Customer";
import {
  Request,
  Fulltime,
  Partime,
  FullPaymentComplete,
  Guarantordetails,
  HelpRegistrationPayment,
} from "./request/Request";
import Location from "./Administrator/Location";
import { getDatabase, ref, push, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBk-m6q2o1dKuggqoNxjoKZHmXeMSHhjsA",
  authDomain: "PROJECT_ID.firebaseapp.com",
  databaseURL: "https://househelps2-default-rtdb.firebaseio.com/",
  projectId: "househelps2",
  storageBucket: "househelps2.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
};

const app = initializeApp(firebaseConfig);
// const database = getDatabase();

var submit = document.querySelector("#sumbit_button");

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/Signup">
            <Signup />
          </Route>
          <Route path="/Signuppay">
            <SignupPaymentPage />
          </Route>
          <Route path="/donate">
            <Donate />
          </Route>
          <Route path="/guarantor">
            <Guarantordetails />
          </Route>

          <Route path="/Admin">
            <LoginA />
          </Route>
          <Route path="/location">
            <Location />
          </Route>
          <Route path="/Payment">
            <PaymentPage />
          </Route>
          <Route path="/fullPayment">
            <FullPaymentPage />
          </Route>
          <Route path="/fullPaymentcomplete">
            <FullPaymentComplete />
          </Route>

          <Route path="/Cdashboard">
            <Cdashboard />
          </Route>

          <Route path="/customer">
            <Customer />
          </Route>

          <Route path="/partime">
            <Partime />
          </Route>

          <Route path="/Login">
            <Login />
          </Route>

          <Route path="/Dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/request">
            <Request />
          </Route>
          <Route exact path="/fulltime">
            <Fulltime />
          </Route>
          <Route exact path="/fulltime">
            <Partime />
          </Route>

          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
