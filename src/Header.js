import house from "./imgs/logo.png";
import logo from "./imgs/house.png";
import  Home from "./home/Home";
import React from "react";
import reactDom from "react-dom";
import headStyle from "./header.css"
function Header() {


    return (
      <div className="Header14" style={{headStyle}}>
            <div id="header14" > 
            <div id="divdivdiv">
            <img onClick={renderHome} src={logo}></img>
            </div>
               
            </div>

            <div id="logo-logo" onClick={renderHome} style={{width: "150px", height: "auto", marginLeft: "auto", marginRight: "auto"}}>
                  <img src={house} width="100%" height="auto" ></img>
            </div>

     </div>
    );
  }

  function renderHome(){
    reactDom.render(
      <React.StrictMode>
    <Header />
    <Home />
  </React.StrictMode>,document.querySelector("#root")
    )
  }
  
  export default Header;
  