import React from "react";
import reactDom from "react-dom";
import Header from "../Header";
import leftarrow from "../imgs/rr_left.png";
import { Fulltime } from "../request/Request";
import jobliststyle from "./../dashboard/joblist.css";
import { useEffect } from "react";
 import Administrator from "./Administrator";




const Fulltime_Request =({firstname,state,address,lastname,pnumber,jobtype,email,index,buttondata})=>{

 
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
                    <td>{firstname+"  "+ " "+lastname+" "+" "}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{}</td>
                  </tr>
                  <tr>
                    <td>address</td>
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
    
  })

  return(
    <div>
      <div style={{width:"100px",height:"auto", marginLeft:"auto",marginRight:"auto"}}onClick={renderCdashboard} >
            <img src={leftarrow} style={{width:"100%", color:"green"}}></img>
            </div>

            <div id="joblistdiv" style={jobliststyle} >
              <div id="cardheader" style={{width:"100%", color:"green",gridTemplateColumns:"1fr"}}> 
              <h2 style={{textAlign:"left"}}>State: {data.helpSOO}</h2>
              </div>
              
              <div id="card-details">
                <table>
                 <th></th>
                  <tr>
                  <td>FullName:</td>
                    <td>{data.firstname +" "+ data.lastname }</td>
                  </tr>
                  <tr>
                    <td>Phone Number</td>
                    <td>{data.pnumber}</td>
                  </tr>
                  <tr>
                    <td>address</td>
                    <td>{data.address+"  "+" "}</td>
                    
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
               
             

            </div>
            
    </div>
     
  )
}



const Applied_jobs =({index,buttondata})=>{

 
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
              <h2 style={{textAlign:"left"}}>Applied Jobs( {buttondata.proposalDate}) </h2>
              <button onClick={()=>{
                
                console.log(buttondata)
                 renderCApply(buttondata)
                }} id="" className="job-apply-btn" style={{width:"100%",margin:"0"}}>view profile</button>
              </div>
              
              <div id="card-details">
                <table>
                 <th></th>
                  <tr>
                  <td>Help Name:</td>
                    <td>{buttondata.helpName+"  "+ " "+" "+" "}</td>
                  </tr>
                  <tr>
                    <td>Help phoneNumber</td>
                    <td>{buttondata.helpNumber}</td>
                  </tr>
                  <tr>
                    <td>Client Email</td>
                    <td>{buttondata.clientEmail+"  "+" "}</td>
                    
                  </tr>
                  
                  <tr>
                    <td>Client PhoneNumber</td>
                    <td>{buttondata.clientPnumber}</td>
                  </tr>
                  <tr>
                    <td>Help SOO</td>
                    <td>{buttondata.helpSOO}</td>
                  </tr>

                  <tr>
                    <td>proposal</td>
                    <td>{buttondata.proposal}</td>
                  </tr>
                  <tr>
                    <td>proposal Date</td>
                    <td>{buttondata.proposalDate}</td>
                  </tr>
                 
                </table>
              </div>
              
              
            </div>
          )
    
  
    
  
    
  
}


// const Customers =({index,buttondata})=>{

 
//   useEffect(() => {
//   var btns = Array.from(document.querySelectorAll(".job-apply-btn"))
//    var joblistdiv= Array.from(document.querySelectorAll("#joblistdiv"));
  
//    joblistdiv.forEach((element,i)=>{
//      var newclassname ="job-apply-btn-"+i;
//      element.classList.add(newclassname)
    
//    })


    



//     })

//     var appliedjobs =[]
  

//         return(
//             <div id="joblistdiv" style={jobliststyle} key={index}>
//               <div id="cardheader" style={{width:"100%", color:"green"}}> 
//               <h2 style={{textAlign:"left"}}>State: {state}</h2>
//               <button onClick={()=>{
                
//                 console.log(buttondata)
//                  renderCApply(buttondata)
//                 }} id="" className="job-apply-btn" style={{width:"100%",margin:"0"}}>view profile</button>
//               </div>
              
//               <div id="card-details">
//                 <table>
//                  <th></th>
//                   <tr>
//                   <td>FullName:</td>
//                     <td>{firstname+"  "+ " "+lastname+" "+" "}</td>
//                   </tr>
//                   <tr>
//                     <td>Email</td>
//                     <td>{}</td>
//                   </tr>
//                   <tr>
//                     <td>address</td>
//                     <td>{address +"  "+" "}</td>
                    
//                   </tr>
                  
//                   <tr>
//                     <td>Jobtype</td>
//                     <td>{jobtype}</td>
//                   </tr>
//                   <tr>
//                     <td>phone number</td>
//                     <td>{pnumber}</td>
//                   </tr>
                 
//                 </table>
//               </div>
              
              
//             </div>
//           )
    
  
    
  
    
  
// }


const Guarantors =({index,buttondata})=>{

 
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
              <h2 style={{textAlign:"left"}}>Guarantor State:{buttondata.gstate}</h2>
              <button onClick={()=>{
                
                console.log(buttondata)
                 renderCApply(buttondata)
                }} id="" className="job-apply-btn" style={{width:"100%",margin:"0"}}>view profile</button>
              </div>
              
              <div id="card-details">
                <table>
                 <th></th>
                  <tr>
                  <td>Guarantor Name:</td>
                    <td>{buttondata.gfirstname+"  "+ " "+buttondata.glastname+" "+" "}</td>
                  </tr>
                  <tr>
                    <td>gEmail</td>
                    <td>{buttondata.gemail}</td>
                  </tr>
                  <tr>
                    <td>Gaddress</td>
                    <td>{buttondata.gaddress +"  "+" "}</td>
                    
                  </tr>
                  
                  <tr>
                    <td>gJobtype</td>
                    <td>{buttondata.gjobtype}</td>
                  </tr>
                  <tr>
                    <td>gphone number</td>
                    <td>{buttondata.gpnumber}</td>
                  </tr>
                  <tr>
                    <td>Applicant Name</td>
                    <td>{buttondata.Applicantname}</td>
                  </tr>
                  <tr>
                    <td>Applicant Email</td>
                    <td>{buttondata.Applicantemail}</td>
                  </tr>
                  <tr>
                    <td>Grelationship</td>
                    <td>{buttondata.grelationship}</td>
                  </tr>
                  
                 
                </table>
              </div>
              
              
            </div>
          )
    
  
    
  
    
  
}


const PartimeRequest =({buttondata,index})=>{

 
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
              <h2 style={{textAlign:"left"}}>Partime Request</h2>
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
                    <td>{buttondata.customerName+"  "+ " "+" "+" "}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{buttondata.customerEmail}</td>
                  </tr>
                  <tr>
                    <td>address</td>
                    <td>{buttondata.customerAddress +"  "+" "}</td>
                    
                  </tr>
                  
                  <tr>
                    <td>Jobtype</td>
                    <td>Partime</td>
                  </tr>
                  <tr>
                    <td>phone number</td>
                    <td>{buttondata.customerNumber}</td>
                  </tr>
                  <tr>
                    <td>Request  Date</td>
                    <td>{buttondata.Request_date}</td>
                  </tr>

                  <tr>
                    <td>Amount Paid</td>
                    <td>{buttondata.amountPaid}</td>
                  </tr>
                  <tr>
                    <td>Apartment Type</td>
                    <td>{buttondata.apartmenType}</td>
                  </tr>
                  <tr>
                    <td>Selected Chorse</td>
                    <td>{buttondata.selectedChorse}</td>
                  </tr>
                  <tr>
                    <td>Time Stamp</td>
                    <td>{buttondata.timeStamp}</td>
                  </tr>
                 
                </table>
              </div>
              
              
            </div>
          )
    
  
    
  
    
  
}


const Users =({Age,DOB,address,index,SOO,email,firstname,jobtype,lastname,password,pnumber,buttondata})=>{

 
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
              <h2 style={{textAlign:"left"}}>State: Worker</h2>
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
                    <td>{buttondata.firstname+"  "+ " "+buttondata.lastname+" "+" "}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{buttondata.email}</td>
                  </tr>
                  <tr>
                    <td>address</td>
                    <td>{buttondata.address +"  "+" "}</td>
                    
                  </tr>
                  
                  <tr>
                    <td>Jobtype</td>
                    <td>{buttondata.jobtype}</td>
                  </tr>
                  <tr>
                    <td>phone number</td>
                    <td>{buttondata.pnumber}</td>
                  </tr>

                  <tr>
                    <td>password</td>
                    <td>{buttondata.password}</td>
                  </tr>
                 
                </table>
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
  {/* <Dashboard /> */}
</React.StrictMode>,document.querySelector("#root")
  )
}
function renderCdashboard(){
  reactDom.render(
    <React.StrictMode>
  <Header />
  <Administrator></Administrator>
</React.StrictMode>,document.querySelector("#root")
  )
}
export  {Fulltime_Request,Users,PartimeRequest,Guarantors,Applied_jobs};