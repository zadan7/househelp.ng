import React from "react";
import signcss from"../home/signup.css";
import requestcss from "./request.css";
import leftarrow from "../imgs/rr_left.png";
import verified from "../imgs/check.png";
import Header from "../Header";
import Home from "../home/Home";
import reactDom from "react-dom";
import { useFlutterwave } from "flutterwave-react-v3";
import { closePaymentModal } from "flutterwave-react-v3";
import {Customer,Apartment} from "./customer_details/Customer";
import { getDatabase, ref ,push ,onValue} from "firebase/database";
import { initializeApp } from 'firebase/app';
import { render } from "@testing-library/react";
import { useEffect } from "react";


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
const database = getDatabase();
  


function writeUserData( firstname, lastname,pnumber,address,state,jobtype,email,middlename,date,Description,kidsnum,password,cpassword) {
  
  const db = getDatabase();
  push(ref(db, '/customers'), {
    firstname: firstname,
    lastname: lastname,
    middlename:middlename,
    email:email,
    password:password,
    cpassword:cpassword,
    date:date,
    type:"customer"
    
  })

  push(ref(db, '/Fulltime_Request'), {
    kidsnum:kidsnum,
    date:date,
    description:Description,
    middlename:middlename,
    email:email,
    jobtype:jobtype,
    firstname: firstname,
    lastname: lastname,
    pnumber:pnumber,
    address:address,
    state:state ,
    password:password,
    cpassword:cpassword 
  }).then(()=>{
    console.log(firstname,lastname,pnumber,address,state)
    
    document.querySelector("#firstname").value=""
        document.querySelector("#lastname").value=""
        document.querySelector("#phonenumber").value=""
        document.querySelector("#address").value=""
        document.querySelector("#state").value=""
       document.querySelector("#jobtype").value=""
       document.querySelector("#email2").value=""
       document.querySelector("#middlename").value=""
       document.querySelector("#Description").value=""
       
    document.querySelector("#labels").innerHTML ="<h1>Data Sent Successfully</h1>"
    // setTimeout(()=>{
    //   window.location.href="/"
    // },2000)
    
  }).catch((error)=>{
    
      console.log("data was not sent ",error)
    
      

  })




}


 
function Guarantordetails (){

  useEffect(()=>{
    document.querySelector("#gsignupform").style.display = "block";
    document.querySelector("#gdatadiv").style.display = "none";

    function writeguarantorData( gfirstname, glastname,gpnumber,gaddress,gstate,gjobtype,gemail,grelationship) {
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      const db = getDatabase();
    
      push(ref(db, '/guarantors'), {
    
        Applicantname:sessionStorage.getItem("Applicantname"),
        Applicantemail:sessionStorage.getItem("Applicantemail"),
        gfirstname: gfirstname,
        glastname:glastname,
        gpnumber:gpnumber,
        grelationship:grelationship,
        gstate:gstate,
        gjobtype:gjobtype,
        gdate:dateTime,   
        
        gaddress:gaddress,
        gemail:gemail,
         
      }).then(()=>{
        document.querySelector("#gsignupform").style.display = "none";
        document.querySelector("#gdatadiv").style.display = "block";
        console.log(gfirstname,glastname,gpnumber,gaddress,gstate)
        
        // document.querySelector("#gfirstname").value=""
        //     document.querySelector("#glastname").value=""
        //     document.querySelector("#gphonenumber").value=""
        //     document.querySelector("#gaddress").value=""
        //     document.querySelector("#gstate").value=""
        //    document.querySelector("#gjob_type").value=""
        //    document.querySelector("#gemail").value=""
        
        
      }).catch((error)=>{
        
          console.log("data was not sent ",error)
        
          
    
      })
    
    
    
    
    }
    
    function getgformdata(){
                var gfirstname= document.querySelector("#gfirstname").value
                var glastname =document.querySelector("#glastname").value
                var gemail= document.querySelector("#gemail").value
                var grelationship= document.querySelector("#grelationship").value
                var gemail= document.querySelector("#gemail").value
                var gSOO =document.querySelector("#gstate_of_origin").value
                var gjobtype =document.querySelector("#gjob_type").value
                var gpnumber =document.querySelector("#gpnumber").value
                var gaddress=document.querySelector("#gaddress").value
                //  var gage =document.querySelector("#gage").value
                var Applicantname= sessionStorage.getItem("Applicantname")
                var Applicantemail= sessionStorage.getItem("Applicantemail")
                var today = new Date();
                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date+' '+time;
              
                
                console.log(gfirstname,glastname,gemail,gpnumber,gSOO,)
              
                if(gfirstname !=="" && glastname !=="" && gemail!=="" &&  gpnumber!==""){

                  writeguarantorData(gfirstname,glastname,gpnumber,gaddress,gSOO,gjobtype,gemail,grelationship,sessionStorage.getItem("Applicantname"),sessionStorage.getItem("Applicantemail"))
                              
                  }else{
                    console.log("one of the fields is Empty")
                    console.log(gfirstname,glastname,gemail,grelationship)
                    document.querySelector("#gn2").style.color="red"
                    document.querySelector("#gn2").innerHTML ="failed to send one or more fields are left Blank or email is incorrect"
                  
                  }
     
     }


    document.querySelector("#gsignup_submit_button").addEventListener("click",(e)=>{
    // document.querySelector("#gsignupform").style.display = "none";
    // document.querySelector("#gdatadiv").style.display = "block";

      e.preventDefault();
      getgformdata()
    })
  

  })
      

  return (
    <div className="div" style={signcss}>
      

        <form style={{}} >
          <div id="gsignupform">
            <h2>Guarantor Personal Information </h2>

            
            <p>Guarantor Firstname</p><input type="text" id="gfirstname" required></input>            
            <p>Guarantor Lastname </p> <input type="text" id="glastname" required></input>
            <p>Guarantor Relationship with Applicant</p> 
            <select name="State Of Origin" id="grelationship" form="grelationship" required>
            <option value=" "> </option>
              <option value=" Father"> Father</option>
              <option value="Mother ">Mother </option>
              <option value="Uncle ">Uncle </option>
              <option value="Aunty">Aunty </option>
              <option value=" Sister"> Sister</option>
              <option value="Brother">Brother</option>
              <option value="Guardian">Guardian</option>
              </select>
            <p>Guarantor Full Address </p> <input type="text" id="gaddress" placeholder="state,lga,bustop,street,house number" required></input>
            <p>Guarantor Workplace <span style={{color:"red"}}> <br></br>(Work address, name of company or name of Job )</span></p><input type="text" id="gjob_type" required></input>
           
            <p>Guarantor State Of Origin</p>
            <select name="State Of Origin" id="gstate_of_origin" form="state_of_origin" required>
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
                  
            <p>Guarantor Phone Number</p><input type="number" id="gpnumber" required></input>
            <p>Guarantor Email </p><input type="email" id="gemail" required></input>
            
            <br></br>
            <button type="submit" value="Submit" id="gsignup_submit_button"  >Submit</button>
            </div>
            <div id="gdatadiv">
              <img width="60px" src={verified} alt="verified" style={{textAlign:"center",marginBottom:"15px"}}></img><br></br>
              
              <h2 style={{lineHeight:"1.5em"}}>You Have Successfully Registered <br></br> 
                you can Now Login to Your Dashboard.
              </h2>
            </div>
        </form>

        

        <div id="gn2">

        </div>
        <div id="gdata">

</div>
    </div>
  );
}

class Request extends React.Component{

componentDidMount(){
  
    var a = document.querySelector("#logo-logo")
    a.style.display="block";
  
}



    

    render(){
      return(
        <div>
          <div style={{width:"100px",height:"auto", marginLeft:"auto",marginRight:"auto"}}onClick={renderHome} >
                    <img src={leftarrow} style={{width:"100%", color:"green"}}></img>
                    </div>
            <div id="request" style={{requestcss}}>
                    
               
    
                    <div id="request_buttons_container" >
                         <h2 style={{fontSize:"1.5em"}}>make your choice</h2>
                        <button className="btn-1" onClick={renderFulltime}>
                            Request Fulltime Househelp
                        </button>
    
                        <button className="btn-2" onClick={renderApartment} style={{borderRadius:"25px"}} >
                            Request Part-time Househelp
                        </button>
                    </div>
                    <div>
           
        </div>
    
                  
    
                  
            </div>
            </div>
        )
    }
   
}

class Fulltime extends React.Component{
  

  componentDidMount() {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase();
    var arrayofemails=[];
    const starCountRef = ref(db, 'Fulltime_Request/');  
    
    

    onValue(starCountRef,(snapshot)=>{

    snapshot.forEach((element)=>{
      var data = element.val();

      arrayofemails.push(data.email)
     })
     console.log(arrayofemails)
   })
    
     var fullbtn = document.querySelector("#full-btn")
     
    //  console.log(fullbtn)
   
     fullbtn.addEventListener("click",(e)=>{
       e.preventDefault()
       console.log("click")
       var Firstname,lastname,Phonenumber,Address,State,Jobtype,email,middlename,Description,kidsnum,password,cpassword;
       var labels   = document.querySelector("#labels")
       Firstname   = document.querySelector("#firstname").value
       kidsnum   = document.querySelector("#kidsnum").value
       lastname    = document.querySelector("#lastname").value
       Phonenumber = document.querySelector("#phonenumber").value
       Address     = document.querySelector("#address").value
       Description     = document.querySelector("#Description").value
       State       = document.querySelector("#state").value
       Jobtype       = document.querySelector("#jobtype").value
       email      = document.querySelector("#email2").value
       middlename      = document.querySelector("#middlename").value
       password = document.querySelector("#password").value
       cpassword = document.querySelector("#cpassword").value

       var boolean=0;

       for(var i=0;i<=arrayofemails.length;i++){
         if(arrayofemails[i]==email){
           boolean++;
         }

       }
       console.log(boolean)

       if(Firstname !=="" && lastname !=="" && Phonenumber !=="" && Address !=="" && State!=="" && email !=="" && cpassword == password){
        console.log(Firstname,lastname,Phonenumber,Address,State,kidsnum,email)

        
        if (boolean<=2){
          
          var today = new Date();
          var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          var dateTime = date+' '+time;
          sessionStorage.setItem("name1", document.querySelector("#firstname").value +" "+ document.querySelector("#lastname").value)
          sessionStorage.setItem("pnumber1", document.querySelector("#phonenumber").value)
          sessionStorage.setItem("email1", document.querySelector("#email2").value)



          


      writeUserData( Firstname, lastname,Phonenumber,Address,State,Jobtype,email,middlename,dateTime,Description,kidsnum,password,cpassword)
      renderFullPaymentpage()
          
  
         }else{
          labels.style.color="red"
          labels.textContent ="email already in use";
         }




       
       }else{
         labels.style.color="red"
         labels.textContent ="empty field detected";

         setTimeout(()=>{
          labels.textContent ="";
         },2000)
       }
       
     })
  }
  





  


 
render(){
  return(
    <div>
        <div className="container" id="fulltime-container">
        <div style={{width:"100px",height:"auto", marginLeft:"auto",marginRight:"auto"}}onClick={renderRequest} >
            <img src={leftarrow} style={{width:"100%", color:"green"}}></img>
            </div>
       

        
    <form style={{display:"block"}} name="Application Requests for Fulltime Househelps" netlify>
      <label id="labels"> </label>
        <label>Firstname</label><input type="text" id="firstname" required></input>
        <label>Lastname</label><input type="text" id="lastname" required></input>
        <label>Middle name</label><input type="text" id="middlename" required></input>
        <label>Phone Number</label><input type="text" id="phonenumber" required></input>
        <label>Email</label><input type="Email" id="email2" required></input>
        <label>Password</label><input type="password" id="password" required></input>
        <label>Confirm Password</label><input type="password" id="cpassword" required></input>
        <label>Residential State</label><select style={{border:"1px solid green"}} name="State Of Origin" id="state" required>
          <option > </option>
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
        <label>Full House Address</label><input type="text" id="address" required></input>
        <label>Request type</label><select   name="jobtype" id="jobtype" required>
          
          <option value="Fulltime">Fulltime</option>
          <option value="Partime">Part-time</option>
          </select>
          <label>Do You Have Kids </label>
          <div style={{textAlign:"center"}}>
          <label>Yes<input type="radio" name="Kids" value="Yes"></input></label>
          <label>No <input type="radio" name="Kids" value="No"></input></label>
          </div>
         
          <label>Number Of Children</label><select  name="kidsnum" id="kidsnum" style={{border:"1px solid green"}} required>
          
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          
          </select>
          <label>Description(<span style={{color:"red"}}> describe exactly why and what you need the Househelp for, also add resuption time and closing time.</span>)</label><textarea width="70%" type="text" id="Description" required rows="5"></textarea>
        
        <label >i have Agreed to all &copy Househelp Terms & Conditions <input type="checkbox"></input> </label>
        <button id="full-btn" type="Submit" style={{color:"green", background:"white",border:"1px solid green", borderRadius:"25px"}}>Submit</button>
     
    </form>
    </div>
</div>
 )
}
    
     
 }



class Partime extends React.Component{

  constructor(){
    super()
   
  
  }

    componentDidMount(){
      function validateAmount(){
     
        var Amount = sessionStorage.getItem("amount");
        if(Amount<3000){
          document.querySelector('#H3id').innerHTML="Sorry Your Request is Below The Minimum amount(N3,500), you need to Add More House Chorse"
         
       }else{
         sessionStorage.setItem("agreedAmount",Amount)
         
         renderCustomer()
    
       }
      
        
      
        
      }
      var submitbtnpart =document.querySelector("#submitbtnpart")

      submitbtnpart.addEventListener("click",()=>{
        validateAmount()
      })
  
        var a = document.querySelector("#logo-logo")
        a.style.display="none";
    


      var finalamount=0;
     
    
    
  
      function setprice (array){
        var price ;
        var pricearray =[];
      
          array.forEach((item)=>{
            
            switch (item) {
             
              case 'Clean Living Room':
                price = 1000;
                break;
              case 'Wash Bathroom':
                price = 500;
                break;
              case 'Clean Personal Room':
                 price = 700;
                break;
              case 'Wash Dishes':
                price =500;
                break;
              case 'Wash Car':
                price = 800;
                break;
              case 'Wash Clothes':
                price = 1000;
                break;
                
            }
            pricearray.push(price);
            
            
          })
         
         
         var totals =pricearray.reduce(function(acc, val) { return acc + val; }, 0);
         var totaltotal=totals*sessionStorage.getItem("multiple");
    
         sessionStorage.setItem("amount",totaltotal)
         updatePriceonscreen(totaltotal)
        
        
        // return(price);
      }
     
      function updatePriceonscreen(total){
      
       var h1id= document.querySelector("#H1id");
       h1id.innerHTML="N "+total;
      }

      
      const getButtons =()=>{
    
        
         
        
          const buttons =document.querySelectorAll(".fresh");
          const selectedChores=[];
          var Amount = 0;
          const btnArry= Array.from(buttons);
      
          btnArry.forEach((atom)=>{
            atom.style.color="white";
            atom.style.background="green";
            atom.addEventListener("click",()=>{
            
              if(atom.style.color=="white"){
                
                atom.style.color="green";
                atom.style.background="white";
      
                selectedChores.push(atom.innerHTML)
                setprice(selectedChores);
                sessionStorage.setItem("selectedChores",selectedChores)
               
      
               
                
      
              }else if(atom.style.color=="green"){
                atom.style.color="white";
                atom.style.background="green";
                selectedChores.pop(atom.innerHTML)
                setprice(selectedChores);
                sessionStorage.setItem("selectedChores",selectedChores)
                
                
              
              }
              
            })
          })   
         
      }
      
      getButtons();
    
    }
    
 
   
  

  
  

  

 
 

   

    render(){
      return(
        <div>
             <div style={{width:"100px",height:"auto", marginLeft:"auto",marginRight:"auto"}}onClick={renderRequest} >
                 <img src={leftarrow} style={{width:"100%", color:"green"}}></img>
                 </div>
 
                 <h1 style={{textAlign:"center"}} id="H1id">N{}</h1>
                 <h3 style={{textAlign:"center",color:"red",padding:'10px'}} id="H3id">{}</h3>
 
         <div id="container"> 
         
            <p style={{color:"green"}}>Please Select House chores to be completed by the Househelp</p> 
             <button className="fresh">
              Clean Living Room
             </button>
             <button className="fresh">
              Wash Bathroom 
             </button>
  
             <button className="fresh">
              Clean Personal Room
             </button>
             <button className="fresh">
              Wash Dishes
             </button>
             <button className="fresh"> 
              Wash Car
             </button>
             <button className="fresh">
              Wash Clothes
             </button>
             <input type="submit" id="submitbtnpart" ></input>
         </div>
         <div id="console">
 
         </div>
         <script>
           
         </script>
         
     </div> 
     )
    }

    
}

function FullPaymentComplete(){
  return(<div>
    <div  id="container">
      <br></br>
      <img width="60px" src={verified} alt="verified"></img>
      <br></br>
      <br></br>
    <p>
    Your Payment Was Successfull And @Househelp.ng will Start Processing Your Request Immediately, <br></br>
        we will also Reach out to you within a week through your Email, and also Follow Up with Calls,
        Thank You For Always Choosing @househelp.ng God Bless You.

        if your request is not completed within 2 weeks your request fee will be refunded.
    </p>
    </div>
   

    <br></br>
    <div style={{textAlign:"center"}}  >
    <p>Terms & Conditions</p>
    <div style={{width:"75%",margin:"5px auto", border:"1px solid Green", padding:"15px"}}>
    <span style={{width:"200px"}}>kindly note that Under no circumstances Should
       payment be made directly to any Of Our Househelps All Payments should be made Directly to @househelp.ng Account 0230388040 wema Bank(sadam umaru Mohammed) .
      <br></br>
      
      Secondly @Househelp.ng Charges A onetime Service Charge fee of N10,000 <br></br>
      this fee is to be payed before the Agreed Househelp resumes his/her official Duty &
      our client(customer) has carried Out A Successfull Interview with the Househelp.

      <br></br>
      <br></br>
      the Monthly fee Of N30,000<br></br>
      should be payed directly to the company account which is stated below.<br></br>
      Account name : sadam umaru mohammed <br></br>
      0230388040 Wema Bank<br></br>
      <br></br>
      <br></br>
      @househelp.ng Charges are as follows <br></br>
      N2,000 for security charges Fee,<br></br>
      N2,000 contract Sustenance Fee ,<br></br>
      N26,000 @househelp agent salary<br></br>

      total = N30,000
       </span>
    
    </div>

   
    </div>

    
        
  </div>)
}

function FullPaymentPage() {



  
  var amount =2000;
  var email =sessionStorage.getItem("email1")
  console.log(email)

  var phonenumber =sessionStorage.getItem("pnumber1")
  var name =sessionStorage.getItem("name1")

  console.log(email,phonenumber,name)


 var config = {
   public_key: "FLWPUBK-d414dfaf4d80cb19a871956045965e25-X",
   tx_ref: Date.now(),
   amount: Number(amount),
  //  amount: 20,
   currency: 'NGN',
   payment_options: 'card,mobilemoney,ussd,bank',
   customer: {
     email: sessionStorage.getItem("email1"),
     phonenumber: phonenumber,
     name:name,
   },
   customizations: {
     title: '@Househelp.ng',
     description: 'Payment househelp to @househelp.ng',
     logo: "https://react-househelp.netlify.app/static/media/logo.4c7277c6.png",
   },
 };
 const handleFlutterPayment = useFlutterwave(config);
 

 
 
 


 return(
   <div>
     <div style={{textAlign:"center" ,border:"1px solid green",width:"95%", margin:"10px auto",padding:"10px"}}>

     <p style={{borderBottom:"2px solid black"}}> Consultation Fee <span> (non-refundable) </span> =N1,500</p>
     <p style={{borderBottom:"2px solid black"}}>  Request Fee =N500</p>
       <p style={{borderBottom:"2px solid black"}}> Total Amount Due =N 2,000</p>
           
           
       

        <button onClick={()=>{

     handleFlutterPayment({
      callback: (response) => {
         console.log(response);

          //  closePaymentModal() // this will close the modal programmatically
          if (response.status =="success" || response.data.status=="successful"){
            window.location.href="/fullPaymentcomplete";
           renderFullPaymentComplete()
          }
          
      },
      onClose: () => {},    
    });
  
        }}>Make Payments</button>
     </div>
    
   </div>
 )
 
}

function renderApartment(){

    
  reactDom.render(
    <div><Header /> <Apartment /></div>,
    document.querySelector("#root")
  )
}

function renderCustomer(){
  reactDom.render(
    <div>
      <Header />
   <Customer />
    </div>,document.querySelector("#root")
   )
}

function renderPartime(){

  reactDom.render(
    <div>
      <Header />
  <Partime />
    </div>
    
,document.querySelector("#root")
    )
   
  }
  function renderHome(){
    reactDom.render(
     <div>
       <Header />
    <Home />
     </div>,document.querySelector("#root")
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


  function renderFulltime(){

    
    reactDom.render(
      <div><Header /> <Fulltime /></div>,
      document.querySelector("#root")
    )
  }

  function renderFullPaymentpage(){
    reactDom.render(
      <div>
        <Header />
        <FullPaymentPage />
      </div>
      
     
  ,document.querySelector("#root")
    )
  }

  function renderFullPaymentComplete(){
    reactDom.render(
      <div>
        <Header />
        <FullPaymentPage />
      </div>
      
     
  ,document.querySelector("#root")
    )
  }


export {Request,Fulltime,Partime,FullPaymentPage,FullPaymentComplete,Guarantordetails} ;