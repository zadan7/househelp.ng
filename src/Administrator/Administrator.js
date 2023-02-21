import React from "react";
import Header from "../Header";
import "./adminstrator.css";
import {
  Fulltime_Request,
  Users,
  PartimeRequest,
  Guarantors,
  Applied_jobs,
} from "./List";

// import Scroll from "./Scroll";
import { getDatabase, ref, onValue } from "firebase/database";
import { Partime } from "../request/Request";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

class Administrator extends React.Component {
  constructor() {
    super();
    this.state = {
      jobs: {},
    };
  }

  componentDidMount() {
    var view = document.querySelector("#name");
    function load() {
      sessionStorage.setItem("name", "sadam");
      if (
        sessionStorage.getItem("name") == "" ||
        sessionStorage.getItem("name") == null
      ) {
        window.location.href = "/Login";
      }

      console.log(view);
    }
    load();

    // var url = "https://api.webpushr.com/v1/notification/send/all";

    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", url);

    // xhr.setRequestHeader("webpushrKey", "521b8ccaf952c3572d26b42d8a218f45");
    // xhr.setRequestHeader("webpushrAuthToken", "48589");
    // xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
    // xhr.onreadystatechange = function () {
    //    if (xhr.readyState === 4) {
    //       console.log(xhr.status);
    //       console.log(xhr.responseText);
    //    }};

    // var data = `{"title":"A new Job Request","message":${sessionStorage.getItem("name")},"target_url":"https://www.househelps.org","action_buttons":[{"title":"Demo", "url":"https://www.househelps.org"},{"title":"Pricing", "url":"https://www.househelps.org"}]}`;

    // xhr.send(data);
  }

  render() {
    return (
      <div>
        <h3 style={{ textAlign: "center", padding: "" }}>
          Hello, welcome Boss{" "}
          <span id="name"> {sessionStorage.getItem("name")}</span>{" "}
        </h3>
        <p className="names" id="nn3">
          {" "}
        </p>
        <div id="container">
          <div className="personal information" style={{ textAlign: "left" }}>
            <p className="pd">
              Fullname:{" " + sessionStorage.getItem("name") + " "}{" "}
              {sessionStorage.getItem("lastname")}
              <br></br>
            </p>
            <p className="pd">
              State Of Origin: {"" + sessionStorage.getItem("SOO")}
            </p>
            <p className="pd">Age: {"" + sessionStorage.getItem("age")}</p>
            <p className="pd">
              Jobtype: {"" + sessionStorage.getItem("jobtype")}
            </p>
            <p className="pd">Status: Unemployed</p>
            <p className="pd">
              Phone Number: {"" + sessionStorage.getItem("pnumber")}
            </p>
          </div>
          <div id="data" style={{ display: "none" }}></div>
        </div>
        <div id="available_jobs">
          <h2 style={{ textAlign: "center" }} id="">
            All Information
          </h2>
          {/* <Scroll> */}
          <Fulljobs />
          {/* </Scroll> */}
        </div>
      </div>
    );
  }
}

class Fulljobs extends React.Component {
  constructor() {
    super();
    this.state = {
      Fulltime_Request: [],
      applied_jobs: [],
      customers: [],
      guarantors: [],
      partimeRequest: [],
      users: [],

      Fulltime_Request2: [],
      applied_jobs2: [],
      customers2: [],
      guarantors2: [],
      partimeRequest2: [],
      users2: [],
    };

    function searchfunction() {
      console.log("input");
    }
  }

  componentDidMount() {
    var fulljobsarray = [];
    var applied_jobsarray = [];
    var customersarray = [];
    var guarantorsarray = [];
    var partimearray = [];
    var usersarray = [];

    const db = getDatabase();
    const starCountRefF = ref(db, "Fulltime_Request/");

    const starCountRefA = ref(db, "applied_jobs/");
    const starCountRefC = ref(db, "customers/");
    const starCountRefG = ref(db, "guarantors/");
    const starCountRefP = ref(db, "partimeRequest/");
    const starCountRefU = ref(db, "users/");

    onValue(starCountRefF, (snapshot) => {
      snapshot.forEach((element) => {
        fulljobsarray.push(element.val());
      });
    });
    onValue(starCountRefA, (snapshot) => {
      snapshot.forEach((element) => {
        applied_jobsarray.push(element.val());
      });
    });
    onValue(starCountRefC, (snapshot) => {
      snapshot.forEach((element) => {
        customersarray.push(element.val());
      });
    });
    onValue(starCountRefG, (snapshot) => {
      snapshot.forEach((element) => {
        guarantorsarray.push(element.val());
      });
    });
    onValue(starCountRefP, (snapshot) => {
      snapshot.forEach((element) => {
        partimearray.push(element.val());
      });
    });
    onValue(starCountRefU, (snapshot) => {
      snapshot.forEach((element) => {
        usersarray.push(element.val());
      });
    });

    var fulljobsarray_reverse = fulljobsarray.reverse();
    var partimerequest_reverse = partimearray.reverse();
    this.setState({
      selectedJObs: fulljobsarray_reverse,
      Fulltime_Request: fulljobsarray,
      applied_jobs: applied_jobsarray,
      customers: customersarray,
      guarantors: guarantorsarray,
      partimeRequest: partimerequest_reverse,
      users: usersarray,
    });
  }

  render() {
    return (
      <div>
        <div
          style={{
            width: "300px",
            display: "block",
            textAlign: "center",
            margin: "0px auto",
          }}>
          <div style={{ width: "100%", display: "inline-flex" }}>
            <input
              id="searchinput"
              type="search"
              placeholder="search "
              onInput={() => {
                var searchparams = document.querySelector("#searchinput").value;
                var searchparams2 = searchparams.toLowerCase();
                console.log(searchparams, searchparams2);

                var newlistf = this.state.Fulltime_Request;
                var newlistg = this.state.guarantors;
                var newlista = this.state.applied_jobs;
                var newlistc = this.state.customers;
                var newlistp = this.state.partimeRequest;
                var newlistu = this.state.users;
                console.log(
                  newlistf,
                  newlistg,
                  newlista,
                  newlistc,
                  newlistp,
                  newlistu
                );
                var newlistf2 = [];
                var newlistg2 = [];
                var newlista2 = [];
                var newlistc2 = [];
                var newlistp2 = [];
                var newlistu2 = [];

                function collectsearchresultsf(joblist) {
                  var details =
                    joblist.firstname +
                    joblist.lastname +
                    joblist.states +
                    joblist.pnumber +
                    "job joblist fulltime";

                  if (details.toLowerCase().includes(searchparams2)) {
                    return newlistf2;
                  }
                }

                function collectsearchresultsg(guarantorlist) {
                  var details =
                    guarantorlist.Applicantemail +
                    guarantorlist.gpnumber +
                    guarantorlist.Applicantname +
                    guarantorlist.gfirstname +
                    guarantorlist.glastname +
                    "guarantor";
                  if (details.toLowerCase().includes(searchparams2)) {
                    return newlistg2;
                  }
                }

                function collectsearchresultsa(applies) {
                  var details =
                    applies.helpName +
                    applies.clientName +
                    applies.clientEmail +
                    applies.clientPnumber +
                    applies.helpNumber +
                    "applied apply";
                  if (
                    details.toLowerCase().includes(searchparams2.toLowerCase())
                  ) {
                    return newlista2;
                  }
                }
                function collectsearchresultsc(customer) {
                  var details =
                    customer.firstname +
                    customer.email +
                    customer.lastname +
                    "customers clients ";
                  if (details.toLocaleLowerCase().includes(searchparams2)) {
                    return newlistc2;
                  }
                }
                function collectsearchresultsp(partime) {
                  var details =
                    partime.customerName +
                    partime.customerEmail +
                    partime.customerAddress +
                    "partime";
                  if (details.includes(searchparams2)) {
                    return newlistp2;
                  }
                }
                function collectsearchresultsu(users) {
                  var details =
                    users.SOO +
                    users.firstname +
                    users.lastname +
                    users.email +
                    users.pnumber +
                    "worker" +
                    users.jobtype;
                  if (details.toLowerCase().includes(searchparams2)) {
                    console.log(users);
                    return newlistu2;
                  }
                }

                const selectedJObs = newlistf.filter(collectsearchresultsf);
                const selectedg = newlistg.filter(collectsearchresultsg);
                const selecteda = newlista.filter(collectsearchresultsa);
                const selectedc = newlistc.filter(collectsearchresultsc);
                const selectedp = newlistp.filter(collectsearchresultsp);
                const selectedu = newlistu.filter(collectsearchresultsu);

                var rselectedJObs = selectedJObs.reverse();
                var rselectedg = selectedg.reverse();
                var rselecteda = selecteda.reverse();
                var rselectedc = selectedc.reverse();
                var rselectedu = selectedu.reverse();
                var rselectedp = selectedp.reverse();
                this.setState({
                  Fulltime_Request2: rselectedJObs,
                  guarantors2: rselectedg,
                  applied_jobs2: rselecteda,
                  customers2: rselectedc,
                  partimeRequest2: rselectedp,
                  users2: rselectedu,
                });
                // this.setState({partimeRequest:partimerequest_reverses})
              }}></input>
            <br></br>
            <input style={{ width: "40%" }} type="submit"></input>
          </div>
        </div>

        {/* <Scroll> */}
        {this.state.partimeRequest2.map((data, index) => (
          <PartimeRequest buttondata={data} index={index} />
        ))}

        {this.state.applied_jobs2.map((data, index) => (
          <Applied_jobs buttondata={data} index={index} />
        ))}

        {this.state.Fulltime_Request2.map((data, index) => (
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
            middlename={data.middlename}
          />
        ))}

        {this.state.users2.map((data, index) => (
          <Users buttondata={data} index={index} />
        ))}

        {this.state.guarantors2.map((data, index) => (
          <Guarantors buttondata={data} index={index} />
        ))}

        {/* </Scroll> */}
      </div>
    );
  }
}

const Donate = () => {
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

  return (
    <div>
      <div
        style={{
          width: "300px",
          display: "block",
          textAlign: "center",
          margin: "0px auto",
        }}>
        <h1>Donate</h1>
        <div style={{ width: "100%", display: "inline-flex" }}>
          <input
            id="searchinput"
            type="number"
            minLength={2}
            min="0"
            placeholder="Amount "></input>
          <br></br>

          <select
            style={{
              width: "40%",
              border: "1px solid green",
              backgroundColor: "white",
            }}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="NGN">NGN</option>
          </select>
        </div>
        <br></br>
        <br></br>
        <button
          onClick={() => {
            handleFlutterPayment({
              callback: (response) => {
                console.log(response);

                if (response.status == "successful") {
                  const db = getDatabase();

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
    </div>
  );
};

export { Administrator, Donate };
