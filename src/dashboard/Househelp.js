import React from "react";
import reactDom from "react-dom";
import Dashboard from "./dashboard";
import Header from "../Header";
import leftarrow from "../imgs/rr_left.png";
import { Fulltime } from "../request/Request";
import jobliststyle from "./joblist.css";
import { useEffect } from "react";
import Cdashboard from "./Cdashboard";




const Househelp =({firstname,state,address,lastname,pnumber,jobtype,email,index,buttondata})=>{

 
  useEffect(() => {
  var btns = Array.from(document.querySelectorAll(".job-apply-btn"))
   var joblistdiv= Array.from(document.querySelectorAll("#joblistdiv"));
  
   joblistdiv.forEach((element,i)=>{
     var newclassname ="job-apply-btn-"+i;
     element.classList.add(newclassname)
    
   })


    



    })

    var appliedjobs =[]
  

        return(
            <div id="joblistdiv" style={jobliststyle} key={index}>
              <div id="cardheader" style={{width:"100%", color:"green"}}> 
              <h2 style={{textAlign:"left"}}>State: {state}</h2>
              <button onClick={()=>{
                
                console.log(buttondata)
                 renderCApply(buttondata)
                }} id="" className="job-apply-btn" style={{width:"100%",margin:"0"}}>view profile</button>
              </div>
              
              <div id="card-details">
                <table>
                 <th></th>
                  <tr>
                  <td>FullName:</td>
                    <td>{firstname +"  "+ " "+lastname+" "+" "}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{email}</td>
                  </tr>
                  <tr>
                    <td>Address:</td>
                    <td>{address +"  "+" "}</td>
                    
                  </tr>
                  
                  <tr>
                    <td>Jobtype</td>
                    <td>{jobtype}</td>
                  </tr>
                  <tr>
                    <td>phone number</td>
                    <td>{pnumber}</td>
                  </tr>
                 
                </table>
              </div>
              
              
            </div>
          )
    
  
    
  
    
  
}

const CApply =({data})=>{

  useEffect(()=>{
    var proposalbtn = document.querySelector("#proposalbtn")
    proposalbtn.addEventListener("click",(e)=>{
      e.preventDefault()
    })
  })

  return(
    <div>
      <div style={{width:"100px",height:"auto", marginLeft:"auto",marginRight:"auto"}}onClick={renderCdashboard} >
            <img src={leftarrow} style={{width:"100%", color:"green"}}></img>
            </div>

            <div id="joblistdiv" style={jobliststyle} >
              <div id="cardheader" style={{width:"100%", color:"green",gridTemplateColumns:"1fr"}}> 
              <h2 style={{textAlign:"left"}}>State: {data.state}</h2>
              </div>
              
              <div id="card-details">
                <table>
                 <th></th>
                  <tr>
                  <td>FullName:</td>
                    <td>{data.firstname +"  "+ " "+data.lastname+" "+" "}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{data.email}</td>
                  </tr>
                  <tr>
                    <td>Address:</td>
                    <td>{data.address +"  "+" "}</td>
                    
                  </tr>
                  <tr>
                    <td>Application Date:</td>
                    <td>{data.date }</td>
                    
                  </tr>
                  <tr>
                    <td>Jobtype</td>
                    <td>{data.jobtype}</td>
                  </tr>

                
                  <tr>
                    <td>phone number</td>
                    <td>{data.pnumber}</td>
                  </tr>
                </table>
              </div>
              
              
            </div>          
            
            <div>
               
              <form>
              <p>write Your Proposal</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
                <div>
                <table>
                  <tr>
                    <td>name</td>
                    <td>{" "+sessionStorage.getItem("name")+""}  {sessionStorage.getItem("lastname")}</td>
                  </tr>
                </table>
                </div>

                <div>

                </div>
              </div>

              <textarea rows="15" style={{padding:"5px"}}></textarea>
                <button id="proposalbtn" type="submit">Submit proposal</button>
              </form>

            </div>
            
    </div>
     
  )
}

function renderCApply(data) {
  reactDom.render(
    <div>
      <Header/>
      <CApply data={data}/>

    </div>,document.querySelector("#root")
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
function renderCdashboard(){
  reactDom.render(
    <React.StrictMode>
  <Header />
  <Cdashboard />
</React.StrictMode>,document.querySelector("#root")
  )
}
export default Househelp;