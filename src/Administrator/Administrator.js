
import React from "react";
import Header from "../Header";
import "./adminstrator.css";
import {Fulltime_Request,Users,PartimeRequest, Guarantors,Applied_jobs} from "./List";

// import Scroll from "./Scroll";
import {getDatabase,ref,onValue} from "firebase/database";
import { Partime } from "../request/Request";










class  Administrator extends React.Component{
  constructor(){

        super();
        this.state ={
          jobs:{}

        }
       
    }
    
  
  
   
    componentDidMount(){
      var view = document.querySelector("#name")
      function load (){
        sessionStorage.setItem("name","sadam")
        if(sessionStorage.getItem("name")=="" || sessionStorage.getItem("name")==null ){
          window.location.href="/Login";
        }
  
      console.log(view);

    }
      load();


  
    

   
  }

   render(){
   
    return(
      <div>
        <h3 style={{textAlign:"center",padding:""}}>Hello, welcome Agent <span id="name"> {sessionStorage.getItem("name")}</span> </h3>
        <p className="names" id="nn3"> </p>
      <div id="container">

      
        <div className="personal information" style={{textAlign:"left"}}>
          <p className="pd">Fullname:{" "+sessionStorage.getItem("name")+" "}  {sessionStorage.getItem("lastname")}<br></br></p>
          <p className="pd">State Of Origin: {""+sessionStorage.getItem("SOO")}</p>
          <p className="pd">Age: {""+sessionStorage.getItem("age")}</p>
          <p className="pd">Jobtype: {""+sessionStorage.getItem("jobtype")}</p>
          <p className="pd">Status: Unemployed</p>
          <p className="pd">Phone Number: {""+sessionStorage.getItem("pnumber")}</p>



        </div>
        <div id="data" style={{display:"none"}}></div>

        

        </div>
        <div id="available_jobs">
        <h2 style={{textAlign:"center"}} id="">Available Jobs Near You</h2>
       {/* <Scroll> */}
       <Fulljobs />
       {/* </Scroll> */}
            
            
        
        
        </div>
      </div>
    );
   }
  }


  class Fulljobs extends React.Component{

 
    constructor(){
      super()
      this.state ={
      Fulltime_Request:[],
      selectedJObs:[],
      applied_jobs:[],
      customers:[],
      guarantors:[],
      partimeRequest:[],
      users:[]
      }

      function searchfunction (){

        console.log("input")
      }
      
     }
 
  
 
    
 
    componentDidMount(){
      
      var fulljobsarray =[];
      var applied_jobsarray=[];
      var customersarray=[];
      var guarantorsarray=[];
      var partimearray =[];
      var usersarray=[];

     const db = getDatabase();
     const starCountRefF = ref(db, 'Fulltime_Request/');

     const starCountRefA = ref(db, 'applied_jobs/');
     const starCountRefC = ref(db, 'customers/');
     const starCountRefG = ref(db, 'guarantors/');
     const starCountRefP = ref(db, 'partimeRequest/');
     const starCountRefU = ref(db, 'users/');

  
     onValue(starCountRefF, (snapshot) => {
       snapshot.forEach((element)=>{ 
         fulljobsarray.push(element.val())  
       })
      
      })
      onValue(starCountRefA, (snapshot) => {
        snapshot.forEach((element)=>{ 
          applied_jobsarray.push(element.val())  
        })
      
       })
       onValue(starCountRefC, (snapshot) => {
        snapshot.forEach((element)=>{ 
          customersarray.push(element.val())  
        })
       
      
       })
       onValue(starCountRefG, (snapshot) => {
        snapshot.forEach((element)=>{ 
          guarantorsarray.push(element.val())  
        })
       
      
       })
       onValue(starCountRefP, (snapshot) => {
        snapshot.forEach((element)=>{ 
          partimearray.push(element.val())  
        })
       
       })
       onValue(starCountRefU, (snapshot) => {
        snapshot.forEach((element)=>{ 
          usersarray.push(element.val())  
        })
       
       
       })
    
     
     var fulljobsarray_reverse = fulljobsarray.reverse()
     this.setState({
       selectedJObs:fulljobsarray_reverse,
       Fulltime_Request:fulljobsarray,
       applied_jobs:applied_jobsarray,
       customers:customersarray,
       guarantors:guarantorsarray,
      partimeRequest:partimearray,
      users:usersarray
    })
    
    

    }
    
  
   render(){
 
     return(
       <div>
         <div  style={{width:"300px",display:"block",textAlign:"center",margin:"0px auto"}}>
          <div style={{width:"100%",display:"inline-flex"}}>

         
           <input id="searchinput" type="search" placeholder="search " onInput={()=>{
             var searchparams =document.querySelector("#searchinput").value
             
            //  console.log(searchparams)
            
            var newlist = this.state.Fulltime_Request;
            var newlist2 =[]


              function collectsearchresults(joblist){
                if(joblist.firstname.toLowerCase().includes(searchparams) || joblist.state.toLowerCase().includes(searchparams.toLowerCase())){
                  
                  return newlist2;
                }
              }

            const selectedJObs = newlist.filter(collectsearchresults)

            this.setState({selectedJObs:selectedJObs})
            
           }}></input>
           <br></br>
           <input style={{width:"40%"}} type="submit"></input>
           </div>
         </div>


{/* <Scroll> */}
{
           this.state.partimeRequest.map((data,index)=>(
               <PartimeRequest
               buttondata={data}
               index={index}
               /> 
     ))
           
         }

{
           this.state.applied_jobs.map((data,index)=>(
               <Applied_jobs
               buttondata={data}
               index={index}
               /> 
     ))
           
         }

{
           this.state.selectedJObs.map((data,index)=>(
               <Fulltime_Request
               buttondata={data}
               kidsnum={data.kidsnum}
               index={index}
               firstname={data.firstname} 
               lastname={data.lastname}
               address={data.address} 
               state={data.state}
               pnumber={data.pnumber}
               jobtype={data.jobtype}
               email={data.email}
               date={data.date}
               Description={data.description}
               middlename={data.middlename}/> 
     ))
           
         }

{
           this.state.users.map((data,index)=>(
               <Users
               buttondata={data}
               /> 
     ))
           
         }



{
           this.state.guarantors.map((data,index)=>(
               <Guarantors
               buttondata={data}
               index={index}
               /> 
     ))
           
         }


{/* </Scroll> */}

        
        
        </div>
 
     )
   
   
     
    
   
 }
 }
 

  export default Administrator;