import React from "react";
import reactDom from "react-dom";
import downarrow from "../imgs/down-arrow.png";
import homestyle from "./home.css";
import Login from "./Login";
import Signup from "./Signup";
import Header from "../Header";
import Dashboard from "../dashboard/dashboard";
import {Request,Fulltime,Partime} from "../request/Request";
import { CSSTransition } from 'react-transition-group';




class Home extends React.Component {
  constructor(){

    super()
    this.state ={
      style:homestyle
    }
    
  
    
  }
  componentDidMount(){
    var logologo= document.querySelector("#logo-logo");
    logologo.style.display="Block";
 
  }
  
    render(){
      return (
        <div className="Home container" style={this.state.style} >
           <CSSTransition
           timeout={500}
          transitionname="carousel"
          transitionappear="true"
          >
            
          
        
            
            <div id="container" >
                  <h1>Welcome !</h1>
                <button id="btn-1" onClick={renderSignup}>Register As a Househelp</button>
                  {/* <hr style={{width: "65%", marginLeft: "auto" , marginRight: "auto" ,marginBottom:"5%",color:"eee"}}></hr> */}
                  <p style={{fontsize: "1.5em"}}>Or</p>
                  <button id="btn-2" onClick={renderLogin}>Login</button>
                 {/* <hr style={{width: "65%", marginLeft: "auto", marginRight: "auto",marginBottom:"5%" }}></hr> */}
                 <p style={{fontSize: "1em" }}>Click to Order Househelp </p>
                 <p style={{textalign: "center"}}><img src={downarrow} style={{width: "30px", height: "auto"}} ></img> </p>
                 
                 <button id="btn-3"onClick={renderRequest}>Order Househelp Now</button>
                 
  
  
              </div>
  
            
              </CSSTransition>
  
       </div>
      );
    }

   
  }
  
  function renderSignup(){
  //       reactDom.render(
  //     <React.StrictMode>
  //   <Header />
  //   <Signup />
  // </React.StrictMode>,document.querySelector("#root")
  //   )
    window.location.href="/Signup";
  }

  function renderLogin(){
    reactDom.render(
      <React.StrictMode>
    <Header />
    <Login function={renderSignup}/>
  </React.StrictMode>,document.querySelector("#root")
    )
  }

  function renderRequest(){
    reactDom.render(
      <div>
        <Header />
        <Request />
      </div>
      
     
  ,document.querySelector("#root")
    )
  }



  function renderDashboard(Props){
    reactDom.render(
      <React.StrictMode>
    <Header />
    <Dashboard />
  </React.StrictMode>,document.querySelector("#root")
    )
  }
  export default Home;