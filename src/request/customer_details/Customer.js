import React from "react";
import styles from "./customer.css";
import apartstyle from "./apartment.css";
import Header from "../../Header";
import reactDom from "react-dom";
import leftarrow from "../../imgs/g_left.png";
import { Partime, Request } from "../Request";
import house from "../../imgs/logo.png";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useEffect } from "react";
import { getDatabase, ref, push, onValue } from "firebase/database";
import verified from "../../imgs/check.png";

const firebaseConfig = {
  apiKey: "AIzaSyBk-m6q2o1dKuggqoNxjoKZHmXeMSHhjsA",
  authDomain: "PROJECT_ID.firebaseapp.com",
  databaseURL: "https://househelps2-default-rtdb.firebaseio.com/",
  projectId: "househelps2",
  storageBucket: "househelps2.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
};

function Customer() {
  useEffect(() => {
    var submit4 = document.querySelector("#submit19");

    submit4.addEventListener("click", () => {
      GetCustomerDetails();
    });
  });

  const GetCustomerDetails = (e) => {
    var Name = document.querySelector("#customername").value;
    var Email = document.querySelector("#customeremail").value;
    var Number = document.querySelector("#customernumber").value;
    var Address = document.querySelector("#customeraddress").value;
    var Request_date = document.querySelector("#request_date").value;

    if (
      Name !== "" &&
      Email !== "" &&
      Number !== "" &&
      Address !== "" &&
      Request_date !== ""
    ) {
      console.log(Name, Email, Number, Address);

      sessionStorage.setItem("customername", Name);
      sessionStorage.setItem("customeremail", Email);
      sessionStorage.setItem("customernumber", Number);
      sessionStorage.setItem("customeraddress", Address);
      sessionStorage.setItem("requestdate", Request_date);
      renderPaymentpage();
    } else {
      console.log("empty Field Detected");
    }
  };

  return (
    <div style={{ textAlign: "center" }} style={styles}>
      <div
        style={{
          width: "70px",
          height: "auto",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        onClick={renderPartime}>
        <img src={leftarrow} style={{ width: "100%", color: "green" }}></img>
      </div>
      <h2>Enter your Information</h2>
      <form>
        <label>Name</label>
        <input type="text" id="customername" required></input>

        <label>Email</label>
        <input type="email" id="customeremail" required></input>
        <label>Phone Number</label>
        <input type="Phonenumber" id="customernumber" required></input>
        <label>Full House Address</label>
        <input type="Address" id="customeraddress" required></input>
        <label>
          Request Date<br></br>
          <span style={{ color: "red" }}>
            (which day do you want the cleaning to be done)
          </span>
        </label>
        <input type="date" id="request_date" required></input>

        <button
          style={{ textAlign: "center" }}
          className="submit19"
          id="submit19">
          submit
        </button>
      </form>
    </div>
  );
}

function PaymentPage() {
  var amount = sessionStorage.getItem("agreedAmount");
  var email = sessionStorage.getItem("customeremail");
  var request_date = sessionStorage.getItem("requestdate");

  var phonenumber = sessionStorage.getItem("customernumber");
  var name = sessionStorage.getItem("customername");
  console.log(request_date);

  var config = {
    public_key: "FLWPUBK-d414dfaf4d80cb19a871956045965e25-X",
    tx_ref: Date.now(),
    amount: Number(amount) + 500,
    //  amount: 20,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd,bank",
    customer: {
      email: sessionStorage.getItem("customeremail"),
      phonenumber: sessionStorage.getItem("customernumber"),
      name: sessionStorage.getItem("customername"),
    },
    customizations: {
      title: "@Househelp.ng",
      description: "Payment househelp to @househelp.ng",
      logo: "https://react-househelp.netlify.app/static/media/logo.4c7277c6.png",
    },
  };
  const handleFlutterPayment = useFlutterwave(config);
  function postdata() {
    const db = getDatabase();

    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;
    push(ref(db, "/partimeRequest"), {
      customerName: sessionStorage.getItem("customername"),
      customerNumber: sessionStorage.getItem("customernumber"),
      customerAddress: sessionStorage.getItem("customeraddress"),
      customerEmail: sessionStorage.getItem("customeremail"),
      selectedChores: sessionStorage.getItem("selectedChores"),
      apartmentType: sessionStorage.getItem("apartmenttype"),
      amountPaid: amount,
      timeStamp: dateTime,
      Request_date: request_date,
    })
      .then(() => {
        console.log("posted data successfully");
      })
      .catch((error) => {});
  }
  function postdata2() {
    const db = getDatabase();

    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;
    push(ref(db, "/partimeRequestPaid"), {
      customerName: sessionStorage.getItem("customername"),
      customerNumber: sessionStorage.getItem("customernumber"),
      customerAddress: sessionStorage.getItem("customeraddress"),
      customerEmail: sessionStorage.getItem("customeremail"),
      selectedChores: sessionStorage.getItem("selectedChores"),
      apartmentType: sessionStorage.getItem("apartmenttype"),
      amountPaid: amount,
      timeStamp: dateTime,
      Request_date: request_date,
    })
      .then(() => {
        console.log("posted data successfully");
      })
      .catch((error) => {});
  }

  useEffect(() => {});

  return (
    <div>
      <div
        className="partpaymentdiv"
        style={{
          textAlign: "center",
          border: "1px solid green",
          margin: "25px auto",
        }}>
        <p style={{ borderBottom: "2px solid black" }}>
          Apartment Type:{sessionStorage.getItem("apartmenttype")}
        </p>
        <p style={{ borderBottom: "2px solid black" }}>
          your Total selected Chores:<br></br>
          {sessionStorage.getItem("selectedChores")}
        </p>
        <p style={{ borderBottom: "2px solid black" }}>
          {" "}
          Amount Due =N{Number(sessionStorage.getItem("agreedAmount"))}
        </p>
        <p style={{ borderBottom: "2px solid black" }}>
          {" "}
          transportation Fare= N500
        </p>
        <p style={{ borderBottom: "2px solid black" }}>
          {" "}
          Sum Total=N{Number(sessionStorage.getItem("agreedAmount")) + 500}
        </p>

        <button
          onClick={() => {
            const db = getDatabase();
            var today = new Date();
            var date =
              today.getFullYear() +
              "-" +
              (today.getMonth() + 1) +
              "-" +
              today.getDate();
            var time =
              today.getHours() +
              ":" +
              today.getMinutes() +
              ":" +
              today.getSeconds();
            var dateTime = date + " " + time;
            push(ref(db, "/partimeRequest"), {
              customerName: sessionStorage.getItem("customername"),
              customerNumber: sessionStorage.getItem("customernumber"),
              customerAddress: sessionStorage.getItem("customeraddress"),
              customerEmail: sessionStorage.getItem("customeremail"),
              selectedChores: sessionStorage.getItem("selectedChores"),
              apartmentType: sessionStorage.getItem("apartmenttype"),
              amountPaid: amount,
              timeStamp: dateTime,
              Request_date: request_date,
            });

            handleFlutterPayment({
              callback: (response) => {
                console.log(response);
                postdata();

                if (response.status == "successful") {
                  const db = getDatabase();
                  postdata2();
                  document.querySelector(".partpaymentdiv").style.display =
                    "none";
                  document.querySelector("#div43").style.display = "block";
                  closePaymentModal();
                } else {
                  console.log("payment Failed");
                }

                // this will close the modal programmatically
              },
              onClose: () => {},
            });
          }}>
          Make Payments
        </button>
      </div>

      <div style={{ textAlign: "center" }} id="div43">
        <img src={verified} width="60px"></img>
        <p>
          Your Payment of N
          {Number(sessionStorage.getItem("agreedAmount")) + 500} was successful
          <br></br>
          you will recieve a call from one of Our Agents Shortly to confim your
          request. you can also message us on whatsapp on{" "}
          <a href="https://wa.me/message/3M3P2MGPPZ2YG1">08188802602</a>
        </p>
      </div>
    </div>
  );
}
function Apartment() {
  setTimeout(function () {
    var logologo = document.querySelector("#logo-logo");
    logologo.style.display = "none";
  }, 10);

  setTimeout(() => {
    var apartments = document.querySelectorAll(".apartment");
    console.log(apartments);
    var appartmentarray = Array.from(apartments);
    console.log(appartmentarray);

    appartmentarray.forEach((element) => {
      element.addEventListener("click", () => {
        console.log("clicked " + element.innerHTML);
        var multiple;
        switch (element.innerHTML) {
          case "Self Contain Apartment":
            multiple = 1;
            sessionStorage.setItem("multiple", multiple);
            sessionStorage.setItem("apartmenttype", "Self Contain Apartment");
            renderPartime();
            break;

          case "1 Bedroom Self contain":
            multiple = 1;
            sessionStorage.setItem("multiple", multiple);
            sessionStorage.setItem("apartmenttype", "1 Bedroom Self contain");
            renderPartime();
            break;
          case "2 Bedrooms Self contain":
            multiple = 2;
            sessionStorage.setItem("multiple", multiple);
            sessionStorage.setItem("apartmenttype", "2 Bedrooms Self contain");
            renderPartime();
            break;
          case "2 Bedrooms (family)":
            multiple = 2;
            sessionStorage.setItem("multiple", multiple);
            sessionStorage.setItem("apartmenttype", "2 Bedrooms (family)");
            renderPartime();
            break;
          case "3 Bedrooms Flat":
            multiple = 3;
            sessionStorage.setItem("multiple", multiple);
            sessionStorage.setItem("apartmenttype", "3 Bedrooms Flat");
            renderPartime();
            break;
          case "3 Bedrooms Flat (family)":
            multiple = 3;
            sessionStorage.setItem("multiple", multiple);
            sessionStorage.setItem("apartmenttype", "3 Bedrooms Flat (family)");
            renderPartime();
            break;
          case "duplex":
            multiple = 3;
            sessionStorage.setItem("multiple", multiple);
            sessionStorage.setItem("apartmenttype", "duplex");
            renderPartime();
            break;

          default:
            break;
        }
      });
    });
  }, 10);

  console.log(sessionStorage.getItem("amount"));
  return (
    <div>
      <br></br>
      <div
        style={{
          width: "70px",
          height: "auto",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        onClick={renderRequest}>
        <img src={leftarrow} style={{ width: "100%", color: "green" }}></img>
      </div>
      <br></br>
      <div style={apartstyle} className="apartdiv">
        <h2>select the size of your apartment</h2>
        <button className="apartment apartment-1">
          Self Contain Apartment
        </button>
        <button className="apartment apartment-2">
          1 Bedroom Self contain
        </button>
        <button className="apartment apartment-3">
          2 Bedrooms Self contain
        </button>
        <button className="apartment apartment-4">2 Bedrooms (family)</button>
        <button className="apartment apartment-4">3 Bedrooms Flat</button>
        <button className="apartment apartment-5">
          3 Bedrooms Flat (family)
        </button>
        <button className="apartment apartment-6">duplex</button>
      </div>
    </div>
  );
}

function renderApartment() {
  reactDom.render(
    <div>
      <Header /> <Apartment />
    </div>,
    document.querySelector("#root")
  );
}
function renderPartime() {
  reactDom.render(
    <div>
      <Header /> <Partime />
    </div>,
    document.querySelector("#root")
  );
}

function renderRequest() {
  reactDom.render(
    <div>
      <Header />
      <Request />
    </div>,

    document.querySelector("#root")
  );
}

function renderPaymentpage() {
  reactDom.render(
    <div>
      <Header />
      <PaymentPage />
    </div>,

    document.querySelector("#root")
  );
}

export { Customer, Apartment, PaymentPage };
