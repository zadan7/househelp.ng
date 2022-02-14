// import { initializeApp } from 'firebase/app';
import { getDatabase, ref ,push ,onValue,set} from "firebase/database";
import Header from '../Header';
import React from 'react';
import reactDom from 'react-dom';
import Signup from './Signup';
import Home from './Home';
import "./login.css";
import Cdashboard from "../dashboard/Cdashboard";
import Dashboard from '../dashboard/dashboard';
import { CSSTransition } from "react-transition-group";



 function insertdata_dashboard(data){
  sessionStorage.setItem("name",data.firstname)
  sessionStorage.setItem("lastname",data.lastname)
  sessionStorage.setItem("SOO",data.SOO)
  sessionStorage.setItem("age",data.age)
  sessionStorage.setItem("jobtype",data.jobtype)
  sessionStorage.setItem("pnumber",data.pnumber)
  sessionStorage.setItem("email",data.email)
  console.log(data)
  renderDashboard()
 }

 function insertdata_cdashboard(data){
  sessionStorage.setItem("cname",data.firstname)
  sessionStorage.setItem("clastname",data.lastname)
  sessionStorage.setItem("cemail",data.email)
  sessionStorage.setItem("age",data.age)
  sessionStorage.setItem("jobtype",data.jobtype)
  sessionStorage.setItem("pnumber",data.pnumber)
  sessionStorage.setItem("cemail",data.email)
  renderCdashboard();
 }

  const getformdata2=(e)=>{
   

    var email= document.querySelector("#email").value
    var password =document.querySelector("#password").value

    console.log(email,password)

    if(email !=="" && password !==""){
      document.querySelector("#data").innerHTML ="waiting For Network";
      getDatabasedatausers(email,password);
      
      
      
      document.querySelector("#email").value= "";
    document.querySelector("#password").value="";
    }else{

      document.querySelector("#data").innerHTML ="incorrect username && password";
    }
    

  }
  const getDatabasedatacustomer=(email,password)=>{

    console.log("passed data "+email,password);


        const db = getDatabase();
        const starCountRefcustomers = ref(db, 'customers/');
        

        onValue(starCountRefcustomers, (snapshot) => {
        snapshot.forEach((element)=>{
            

            const data =element.val();

           if(data.email === email && data.password === password ){

             
           insertdata_cdashboard(data)
              renderCdashboard()
           }else{
             console.log("incorrect password or email.")
             document.querySelector("#data").innerHTML="incorrect password or email.";
             document.querySelector("#data").innerHTML ="incorrect password or email.";
           }


          

          })

          

        
        })

          }
  const getDatabasedatausers=(email,password)=>{

    console.log("passed data "+email,password);


        const db = getDatabase();
        const starCountRefusers = ref(db, 'users/');
        

        onValue(starCountRefusers, (snapshot) => {
        snapshot.forEach((element)=>{
            

            const data =element.val();

           if(data.email === email && data.password === password){

             console.log(data.email, " " ,"data matched")
             insertdata_dashboard(data);
           }else{
            getDatabasedatacustomer(email,password)
             
           }


          

          })

          

        
        })

          }

 
      var submit2 = document.querySelector("#sumbit_button_l")
         
  
      

class Login extends React.Component{
 

  componentDidMount(){
   
      var span= document.querySelector(".spnn").addEventListener("click",()=>{
      
        renderSignup();
    
      })
    
      var logologo= document.querySelector("#logo-logo");
      logologo.style.display="none";
    
  }

 
    


   
render(){
  return(
    <div className="div">  
      <CSSTransition
           timeout={500}
          transitionname="carousel"
          transitionappear="true"
          >
            <div>
     <h1 style={{textAlign:'center'}}>Login</h1>
        <form name="Login">
       
            <p>Email</p>
            <input type="email" id="email" required></input>

            <p>Password</p>
            <input type="password" id="password" required>
            </input>

            <input type="submit" value="Submit" id="submit_button_l" onClick={getformdata2} style={{}}></input>
          <div id="data" style={{color:"red"}}> </div>
          
          <div >
          <span className="spnn" >Don't have an Account , {" "+"   "+" "} <span style={{color:"green"}}> Signup now</span></span>
          </div>
        </form>
        </div>
        </CSSTransition> 
        
    </div>
    
)


}
 
    
  }
  function renderSignup(){
    reactDom.render(
      <div>
    <Header />
    <Signup />
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

  function renderCdashboard(Props){
    reactDom.render(
      <React.StrictMode>
    <Header />
    <Cdashboard />
  </React.StrictMode>,document.querySelector("#root")
    )
  }
  
  
export default Login;  