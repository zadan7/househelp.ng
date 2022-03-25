import { initializeApp } from 'firebase/app';
import { react } from '@babel/types';
import { getDatabase, ref ,push ,onValue} from "firebase/database";
import signcss from"./signup.css";
import Header from '../Header';
import React, { useEffect } from 'react';
import Login from './Login';
import reactDom from "react-dom";
import verified from "../imgs/check.png";
import { Guarantordetails } from '../request/Request';




const firebaseConfig = {
    apiKey: "AIzaSyBk-m6q2o1dKuggqoNxjoKZHmXeMSHhjsA",
    authDomain: "PROJECT_ID.firebaseapp.com",
    databaseURL: "https://househelps2-default-rtdb.firebaseio.com/",
    projectId: "househelps2",
    storageBucket: "househelps2.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID",
  
  };


  
  




 function Signup() {
  
  useEffect(()=>{
  const app = initializeApp(firebaseConfig);
  const db = getDatabase();
  var arrayofemails =[];
  var logologo= document.querySelector("#logo-logo");
    

  
  function writeUserData( firstname, lastname, email,password,DOB,SOO,jobtype,pnumber,Age,address) {
    
    

    push(ref(db, '/users'), {
      
      firstname: firstname,
      lastname: lastname,
      email:email,
      password:password,
      DOB:DOB,
      SOO:SOO,
      jobtype:jobtype,
      pnumber:pnumber,
      Age:Age ,  
      address:address
    }).then(()=>{
      console.log(firstname,lastname)
      document.querySelector("#firstname").value = "";
      document.querySelector("#lastname").value = "";
      document.querySelector("#email").value = "";
      document.querySelector("#password").value = "";
      document.querySelector("#n2").innerHTML ="Data Sent Successfully ";
      var logologo= document.querySelector("#logo-logo");

        renderGuarantor()
      
      
    }).catch((error)=>{
      
      
        

    })

  


  }
    const starCountRef = ref(db, 'users/');   
    onValue(starCountRef,(snapshot)=>{

    snapshot.forEach((element)=>{
      var data = element.val();

      arrayofemails.push(data.email)
     })
     console.log(arrayofemails)
   })
  



    
    logologo.style.display="none";

    function getformdata(arrayofemails){
     var firstname= document.querySelector("#firstname").value
      var lastname =document.querySelector("#lastname").value
      var email= document.querySelector("#email").value
      var password =document.querySelector("#password").value
      var DateOFBirth =document.querySelector("#date").value
      var SOO =document.querySelector("#state_of_origin").value
      var jobtype =document.querySelector("#job_type").value
      var pnumber =document.querySelector("#Pnumber").value
      var Age =document.querySelector("#Age").value
      var address = document.querySelector("#address").value
    
      
     
    
      if(firstname !=="" && lastname !=="" && email!=="" &&  email.includes('@') && email.includes('.') && password!=="" && Age !=="" && pnumber!=="" && SOO !=="" && DateOFBirth !==""){
    
        var boolean=0;

       for(var i=0;i<=arrayofemails.length;i++){
         if(arrayofemails[i]==email){
           boolean++;
         }
       }
            
      
       if (boolean==0){
        sessionStorage.setItem("Applicantname",firstname+" "+lastname)
        sessionStorage.setItem("Applicantemail",email)
        writeUserData(firstname,lastname,email,password,DateOFBirth,SOO,jobtype,pnumber,Age,address)
        logologo.style.display="block";
        
        

       }else{
        document.querySelector("#n2").style.color="red"
        document.querySelector("#n2").innerHTML ="Email Already in Use ";
       }
        
 
    
       
       }else{
         console.log("one of the fields is Empty")
         console.log(firstname,lastname,email,password)
         document.querySelector("#n2").style.color="red"
         document.querySelector("#n2").innerHTML ="failed to send one or more fields are left Blank or email is incorrect"
       
       }
     
     
    
    }
    

    var signup_submit_button =document.querySelector("#signup_submit_button")
    signup_submit_button.addEventListener("click",(e)=>{
      e.preventDefault(getformdata(arrayofemails));
      })
      
  })
  
 
  

  

  
    return (
      <div className="div" style={signcss}>
        

          <form style={{}} >
            <div id="signupform">

            
            <h1> Sign up</h1>
            <h2>Personal Information </h2>
              <p>Firstname</p><input type="text" id="firstname" required></input>
              
              
              <p> Lastname </p> <input type="text" id="lastname" required></input>
              <p> Address </p> <input type="text" id="address" placeholder="state,lga,bustop,street,house number" required></input>
              <p>Date Of Birth</p><input type="date" id="date" required></input>
              <p>State Of Origin</p>
              <select name="State Of Origin" id="state_of_origin" form="state_of_origin">
                <option value=" Abia"> Abia</option>
                <option value="Adamawa ">Adamawa </option>
                <option value=" Akwa-Ibom"> Akwa-Ibom</option>
                <option value="audi">Anambra</option>
                <option value="Bauchi">Bauchi</option>
                <option value="Bayelsa">Bayelsa</option>
                <option value="Benue ">Benue </option>
                <option value="Borno">Borno</option>
                <option value="Cross River"> Cross River </option>
                <option value="Delta ">Delta </option>
                <option value="Ebonyi ">Ebonyi  </option>
                <option value=" Edo "> Edo </option>
                <option value="Ekiti"> Ekiti</option>
                <option value="Enugu ">Enugu </option>
                <option value="Gombe ">Gombe </option>
                <option value="Imo">Imo</option>
                <option value=" Jigawa"> Jigawa</option>
                <option value="Kaduna">Kaduna</option>
                <option value="Kano">Kano</option>
                <option value="Katsina">Katsina</option>
                <option value=" Kebbi "> Kebbi </option>
                <option value="Kogi ">Kogi </option>
                <option value="Kwara">Kwara</option>
                <option value="Lagos">Lagos</option>
                <option value="Nasarawa"> Nasarawa</option>
                <option value="Niger">Niger</option>
                <option value="Ogun">Ogun</option>
                <option value="Ondo">Ondo</option>
                <option value=" Osun"> Osun</option>
                <option value="Oyo ">Oyo </option>
                <option value="Plateau">Plateau</option>
                <option value="Rivers ">Rivers </option>
                <option value=" Sokoto"> Sokoto</option>
                <option value="Taraba ">Taraba </option>
                <option value="Yobe">Yobe</option>
                <option value="Zamfara">Zamfara</option>

              </select>
                    <p>Job Type</p>            
              <select name="Job Type" id="job_type" form="job_type" required>
                <option value="Partime"> Partime</option>
                <option value="Fulltime">Fulltime</option>
                <option value="Both">Both</option>
                </select>

              <p>Phone Number</p><input type="number" id="Pnumber" required></input>
              <p>Age</p><input type="Number" id="Age" required></input>
              <p> Email </p><input type="email" id="email" required></input>
              <p>Password</p><input type="password" id="password" required></input> 
              <p></p>

              <button type="submit" value="Submit" id="signup_submit_button"  >Submit</button>
              </div>
              
          </form>

          

          <div id="n2">

          </div>
          <div id="data">

</div>
      </div>
    );
  }



  function renderLogin(){
    reactDom.render(
      <div>
        <Header />
    <Login />

      </div>
    ,document.querySelector("#root")
    )
  }

  function renderGuarantor(){
    reactDom.render(
      <div>
        <Header />
    <Guarantordetails />

      </div>
    ,document.querySelector("#root")
    )
  }
 

  export default Signup;
   