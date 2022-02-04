import React from "react";
import reactDom from "react-dom";
import Dashboard from "./dashboard";
import Header from "../Header";
import leftarrow from "../imgs/rr_left.png";
import { Fulltime } from "../request/Request";
import jobliststyle from "./joblist.css";
import { useEffect } from "react";
import {getDatabase,ref,onValue} from "firebase/database";




const Joblist=({firstname,state,address,lastname,pnumber,jobtype,email,middlename,index,date,Description,kidsnum,buttondata})=>{

 
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
                renderApply(buttondata)
                }} id="" className="job-apply-btn" style={{width:"100%",margin:"0"}}>Apply</button>
              </div>
              
              <div id="card-details">
                <table>
                 <th></th>
                  <tr>
                  <td>FullName:</td>
                    <td>{firstname +"  "+ " "+lastname+" "+" "+ middlename}</td>
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
                    <td>Application Date:</td>
                    <td>{date }</td>
                    
                  </tr>
                  <tr>
                    <td>Jobtype</td>
                    <td>{jobtype}</td>
                  </tr>

                  <tr>
                    <td>job Description</td>
                    <td>{Description}</td>
                  </tr>
                  <tr>
                    <td>Number Of kids</td>
                    <td>{kidsnum}</td>
                  </tr>
                </table>
              </div>
              
              
            </div>
          )
    
  
    
  
    
  
}

const Apply =({data})=>{

  useEffect(()=>{
    const db = getDatabase();
    const starCountRefcustomers = ref(db, 'customers/');
    
    var customerdata =[]
function findwheretopostdata(){
    onValue(starCountRefcustomers, (snapshot) => {
      snapshot.forEach((element)=>{
          

          const data =element.val();

          if(data.email=="sadam@gmail.com"){
            console.log(data.email)
            element={cpassword: "1234567890",
            date: "2022-1-25 0:10:19",
            email: "sadam@gmail.com",
            firstname: "gandan",
            lastname: "umaru",
            middlename: "love",
            password: "1234567890",
            type: "customer"}

            element.value={cpassword: "1234567890",
            date: "2022-1-25 0:10:19",
            email: "sadam@gmail.com",
            firstname: "gandan",
            lastname: "umaru",
            middlename: "love",
            password: "1234567890",
            type: "customer"}
            console.log(element)
            console.log()
          }else{
            console.log("null")
          }

      customerdata.push(data)


        

        })

        

      
      })
    }







    var proposalbtn = document.querySelector("#proposalbtn")
    proposalbtn.addEventListener("click",(e)=>{
      e.preventDefault()
      var proposal = document.querySelector("#textbtn").value
      if (proposal.length<100){
        console.log("you need to add more words ")
        findwheretopostdata()
      }else{
        console.log(customerdata)
        console.log(proposal)
      }
     
    })
  })

  return(
    <div>
      <div style={{width:"100px",height:"auto", marginLeft:"auto",marginRight:"auto"}}onClick={renderDashboard} >
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
                    <td>{data.firstname +"  "+ " "+data.lastname+" "+" "+ data.middlename}</td>
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
                    <td>job Description</td>
                    <td>{data.Description}</td>
                  </tr>
                  <tr>
                    <td>Number Of kids</td>
                    <td>{data.kidsnum}</td>
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

              <textarea id="textbtn" rows="15" style={{padding:"5px"}}></textarea>
                <button id="proposalbtn" type="submit">Submit proposal</button>
              </form>

            </div>
            
    </div>
     
  )
}

function renderApply(data) {
  reactDom.render(
    <div>
      <Header/>
      <Apply data={data}/>

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
export default Joblist;