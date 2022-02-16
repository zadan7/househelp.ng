
import React from "react";
import Header from "../Header";
import "./dashboard.css";
import Joblist from "./Joblist";
import Scroll from "./Scroll";
import {getDatabase,ref,onValue,query} from "firebase/database";
import Househelp from "./Househelp";




class  Cdashboard extends React.Component{
    constructor(){
  
          super();
          this.state ={
            jobs:{}
  
          }
         
      }
      
    
    
     
      componentDidMount(){
        var view = document.querySelector("#name")
        function load (){
          if(sessionStorage.getItem("cname")=="" || sessionStorage.getItem("cname")==null ){
            window.location.href="/Login";
          }
    
        console.log(view);
  
      }
        load();
  
   
     
    }
  
     render(){
     
      return(
        <div>
          <h3 style={{textAlign:"center",padding:""}}>Hello, welcome  <span id="name"> {sessionStorage.getItem("cname")}</span> </h3>
          <p className="names" id="nn3"> </p>
        <div id="container">
  
        
          <div className="personal information" style={{textAlign:"left"}}>
            <p className="pd">Fullname:{" "+sessionStorage.getItem("cname")+""}  {sessionStorage.getItem("clastname")}<br></br></p>
            <p className="pd">Phone Number: {""+sessionStorage.getItem("cemail")}</p>
  
  
  
          </div>
          <div id="data" style={{display:"none"}}></div>
  
          
  
          </div>
          <div id="available_jobs">
          <h3 style={{textAlign:"center"}} id="">LIST OF APPLICANTS</h3>
        
              
              {
                <HousehelpsList/>
              }
          
          
          </div>
        </div>
      );
     }
    }
  

    class HousehelpsList extends React.Component{

 
      constructor(){
        super()
        this.state ={
          data:[], 
          arrayofapplications:[] 
        }
        
       }
   
    
   
      
   
      componentDidMount(){
        const db = getDatabase();
        const starCountRef = ref(db, "applied_jobs");
        var arrayofapplications=[];
        onValue(starCountRef, (snapshot) => {
          
    
         snapshot.forEach((element)=>{ 
          
            var data =element.val();
            if (data.clientEmail ==sessionStorage.getItem("cemail")){

              arrayofapplications.push(data)
            }
           
          })
            
          console.log(arrayofapplications)
          this.setState({data:arrayofapplications})
    
        })
  









        var fulljobsarray =[];
       const dbs = getDatabase();
       const starCountRef2 = ref(dbs, "Fulltime_Request");
      //  onValue(starCountRef2, (snapshot) => 
      }
   
    
     render(){
   
       return(
         <div>
           {
             this.state.data.map((data,index)=>(
                 <Househelp
                 buttondata={data}
                 index={index}
                 firstname={data.helpName} 
                 lastname={data.helpName}
                 address={data.proposal} 
                 state={data.helpSOO}
                 pnumber={data.helpNumber}
                 jobtype={data.helpName}
                 email={data.helpNumber}
                 date={data.helpName}
                 Age={data.helpName}/> 
       ))
             
           }
          
          </div>
   
       )
     
     
       
      
     
   }
   }
   

    export default Cdashboard;