import { initializeApp } from "firebase/app";
import { react } from "@babel/types";
import { getDatabase, ref, push, onValue } from "firebase/database";
import signcss from "./signup.css";
import Header from "../Header";
import React, { useEffect } from "react";
import Login from "./Login";
import reactDom from "react-dom";
import verified from "../imgs/check.png";
import { Guarantordetails } from "../request/Request";
import { useFlutterwave } from "flutterwave-react-v3";
import emailjs from "@emailjs/browser";
import { getStorage, ref as ref2 } from "firebase/storage";
import { uploadBytes, getDownloadURL } from "firebase/storage";

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
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase();
    var arrayofemails = [];
    var logologo = document.querySelector("#logo-logo");

    function writeUserData(
      firstname,
      lastname,
      url,
      email,
      password,
      DOB,
      SOO,
      jobtype,
      pnumber,
      Age,
      address
    ) {
      sessionStorage.setItem("hname", firstname + lastname);
      sessionStorage.setItem("hemail", email);
      sessionStorage.setItem("hpnumber", pnumber);

      push(ref(db, "/users"), {
        firstname: firstname,
        lastname: lastname,
        image: url,
        email: email,
        password: password,
        DOB: DOB,
        SOO: SOO,
        jobtype: jobtype,
        pnumber: pnumber,
        Age: Age,
        address: address,
      })
        .then(() => {
          var templateParams = {
            Help_name: `${firstname} ${lastname}`,
            //Todo: change below client_email value to clients email i.e userData.email the value below was used for testing
            Help_email: email,
            Help_pnumber: `${pnumber}`,
            Help_age: Age,
            Help_SOO: SOO,
            Help_jobtype: jobtype,
            Help_Address: address,
            Help_image: url,
          };

          emailjs.send(
            process.env.REACT_APP_SERVICE_ID2,
            process.env.REACT_APP_TEMPLATE_ID2,
            templateParams,
            process.env.REACT_APP_USER_ID2
          );
          console.log("email");
          console.log(firstname, lastname);
          document.querySelector("#firstname").value = "";
          document.querySelector("#lastname").value = "";
          document.querySelector("#email").value = "";
          document.querySelector("#password").value = "";
          document.querySelector("#n2").innerHTML = "Data Sent Successfully ";
          var logologo = document.querySelector("#logo-logo");

          renderGuarantor();
        })
        .catch((error) => {});
    }
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      snapshot.forEach((element) => {
        var data = element.val();

        arrayofemails.push(data.email);
      });
      console.log(arrayofemails);
    });

    logologo.style.display = "none";

    function getformdata(arrayofemails) {
      var firstname = document.querySelector("#firstname").value;
      var lastname = document.querySelector("#lastname").value;
      var email = document.querySelector("#email").value;
      var password = document.querySelector("#password").value;
      var DateOFBirth = document.querySelector("#date").value;
      var SOO = document.querySelector("#state_of_origin").value;
      var jobtype = document.querySelector("#job_type").value;
      var pnumber = document.querySelector("#Pnumber").value;
      var Age = document.querySelector("#Age").value;
      var address = document.querySelector("#address").value;
      var product_file = document.querySelector("#file");
      var display = document.querySelector("#imgsrc");

      const db = getDatabase();
      const storage = getStorage();

      const productRef = ref(db, "/products");

      if (
        firstname !== "" &&
        lastname !== "" &&
        product_file.value !== "" &&
        email !== "" &&
        email.includes("@") &&
        email.includes(".") &&
        password !== "" &&
        Age !== "" &&
        pnumber !== "" &&
        SOO !== "" &&
        DateOFBirth !== ""
      ) {
        var boolean = 0;

        var picture = Array.from(product_file.files);
        var picture1 = picture[0];

        console.log(picture1);
        for (var i = 0; i <= arrayofemails.length; i++) {
          if (arrayofemails[i] == email) {
            boolean++;
          }
        }

        if (boolean == 0) {
          sessionStorage.setItem("Applicantname", firstname + " " + lastname);
          sessionStorage.setItem("Applicantemail", email);

          console.log(picture1.type);
          var file = picture1;

          var locationStorage = ref2(storage, firstname + lastname);
          const metadata = {
            contentType: "image/jpeg",
          };

          const uploadTask = uploadBytes(locationStorage, file, metadata);

          uploadTask
            .then((snapshot) => {
              console.log("photo uploaded successfully", snapshot);
              const durl = getDownloadURL(
                ref2(storage, "/" + firstname + lastname)
              );
              durl.then((url) => {
                display.src = url;
                console.log(url);

                writeUserData(
                  firstname,
                  lastname,
                  url,
                  email,
                  password,
                  DateOFBirth,
                  SOO,
                  jobtype,
                  pnumber,
                  Age,
                  address
                );
                renderGuarantor();
              });
            })
            .then((response) => {});

          logologo.style.display = "block";
        } else {
          document.querySelector("#n2").style.color = "red";
          document.querySelector("#n2").innerHTML = "Email Already in Use ";
        }
      } else {
        console.log("one of the fields is Empty");
        console.log(firstname, lastname, email, password);
        document.querySelector("#n2").style.color = "red";
        document.querySelector("#n2").innerHTML =
          "failed to send one or more fields are left Blank or email is incorrect";
      }
    }

    var signup_submit_button = document.querySelector("#signup_submit_button");
    signup_submit_button.addEventListener("click", (e) => {
      e.preventDefault();
      getformdata(arrayofemails);
    });
  });

  return (
    <div className="div" style={signcss}>
      <form style={{}}>
        <div id="signupform">
          <h1> Sign up</h1>
          <h2>Personal Information </h2>
          <p>Firstname</p>
          <input type="text" id="firstname" required></input>
          <p> Lastname </p> <input type="text" id="lastname" required></input>
          <label htmlFor="product-picture">Product image</label>
          <br></br>
          <input type="file" id="file" required></input>
          <p> Address </p>{" "}
          <input
            type="text"
            id="address"
            placeholder="state,lga,bustop,street,house number"
            required></input>
          <p>Date Of Birth</p>
          <input type="date" id="date" required></input>
          <p>State Of Origin</p>
          <select
            name="State Of Origin"
            id="state_of_origin"
            form="state_of_origin">
            <option value=" Abia"> Abia</option>
            <option value=" FCT Abuja"> FCT Abuja</option>
            <option value="Adamawa ">Adamawa </option>
            <option value=" Akwa-Ibom"> Akwa-Ibom</option>
            <option value="audi">Anambra</option>
            <option value="Bauchi">Bauchi</option>
            <option value="Bayelsa">Bayelsa</option>
            <option value="Benue ">Benue </option>
            <option value="Borno">Borno</option>
            <option value="Cross River"> Cross River </option>
            <option value="Delta ">Delta </option>
            <option value="Ebonyi ">Ebonyi </option>
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
          <p>Phone Number</p>
          <input type="number" id="Pnumber" required></input>
          <p>Age</p>
          <input type="Number" id="Age" required></input>
          <p> Email </p>
          <input type="email" id="email" required></input>
          <p>Password</p>
          <input type="password" id="password" required></input>
          <p></p>
          <button value="Submit" id="signup_submit_button">
            Submit
          </button>
        </div>
      </form>

      <div id="n2"></div>
      <div id="data"></div>
      <img src="" id="imgsrc" width="300px"></img>
    </div>
  );
}

function SignupPaymentPage() {
  var amount = 1000;

  var Applicantname = sessionStorage.getItem("hname");
  var Applicantemail = sessionStorage.getItem("hemail");
  console.log(Applicantemail);

  var phonenumber = sessionStorage.getItem("pnumber1");
  var name = sessionStorage.getItem("name1");

  console.log(Applicantemail, phonenumber, Applicantname);

  var config = {
    public_key: "FLWPUBK-d414dfaf4d80cb19a871956045965e25-X",
    tx_ref: Date.now(),
    amount: Number(amount),
    //  amount: 20,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd,bank",
    customer: {
      email: sessionStorage.getItem("hemail"),
      phonenumber: phonenumber,
      name: Applicantemail,
    },
    customizations: {
      title: "@Househelp.ng",
      description: "Payment househelp to @househelp.ng",
      logo: "https://react-househelp.netlify.app/static/media/logo.4c7277c6.png",
    },
  };
  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          border: "1px solid green",
          width: "95%",
          margin: "10px auto",
          padding: "10px",
        }}>
        <p style={{ borderBottom: "2px solid black" }}>
          {" "}
          Registration Fee <span> (non-refundable) </span> =N1000
        </p>
        {/* <p style={{borderBottom:"2px solid black"}}>  Request Fee =N1500</p> */}
        <p style={{ borderBottom: "2px solid black" }}>
          {" "}
          Total Amount Due =N 1,000
        </p>

        <button
          onClick={() => {
            handleFlutterPayment({
              callback: (response) => {
                console.log(response);

                //  closePaymentModal() // this will close the modal programmatically
                if (
                  response.status == "success" ||
                  response.data.status == "successful"
                ) {
                  window.location.href = "/fullPaymentcomplete";
                  //  renderFullPaymentComplete()
                }
              },
              onClose: () => {},
            });
          }}>
          Make Payments
        </button>
      </div>
    </div>
  );
}

function renderLogin() {
  reactDom.render(
    <div>
      <Header />
      <Login />
    </div>,
    document.querySelector("#root")
  );
}
function renderSignuppay() {
  reactDom.render(
    <div>
      <Header />
      <SignupPaymentPage />
    </div>,
    document.querySelector("#root")
  );
}

function renderGuarantor() {
  reactDom.render(
    <div>
      <Header />
      <Guarantordetails />
    </div>,
    document.querySelector("#root")
  );
}

export { Signup, SignupPaymentPage, renderSignuppay };
