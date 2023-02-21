import React from "react";
import Header from "../Header";
import "./dashboard.css";
import Joblist from "./Joblist";
import Scroll from "./Scroll";
import { getDatabase, ref, onValue, query } from "firebase/database";
import Househelp from "./Househelp";
import Login from "../home/Login";
import reactDom from "react-dom";
import { useEffect } from "react";
import jobliststyle from "./../dashboard/joblist.css";

class Cdashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      jobs: {},
    };
  }

  componentDidMount() {
    var logoutbtn = document.querySelector("#logout");
    function logout() {
      console.log("clicked");
      sessionStorage.setItem("cname", "");
      sessionStorage.setItem("clastname", null);
      sessionStorage.setItem("cemail", null);
      sessionStorage.setItem("age", null);
      sessionStorage.setItem("jobtype", null);
      sessionStorage.setItem("pnumber", null);
      sessionStorage.setItem("cemail", null);

      renderLogin();
    }

    logoutbtn.addEventListener("click", logout);
    var view = document.querySelector("#name");

    function load() {
      if (
        sessionStorage.getItem("cname") == "" ||
        sessionStorage.getItem("cname") == null
      ) {
        window.location.href = "/Login";
      }

      console.log(view);
    }
    load();
  }

  render() {
    return (
      <div>
        <p style={{ textAlign: "right" }} id="logout">
          Logout
        </p>
        <h3 style={{ textAlign: "center", padding: "" }}>
          Hello, welcome{" "}
          <span id="name"> {sessionStorage.getItem("cname")}</span>{" "}
        </h3>
        <p className="names" id="nn3">
          {" "}
        </p>
        <div id="container">
          <div className="personal information" style={{ textAlign: "left" }}>
            <p className="pd">
              Fullname:{" " + sessionStorage.getItem("cname") + ""}{" "}
              {sessionStorage.getItem("clastname")}
              <br></br>
            </p>
            <p className="pd">
              Phone Number: {"" + sessionStorage.getItem("cemail")}
            </p>
          </div>
          <div id="data" style={{ display: "none" }}></div>
        </div>
        <div id="available_jobs">
          <h3 style={{ textAlign: "center" }} id="">
            LIST OF APPLICANTS
          </h3>

          {<HousehelpsList />}
        </div>
      </div>
    );
  }
}

const Users = ({ index, buttondata }) => {
  useEffect(() => {
    var btns = Array.from(document.querySelectorAll(".job-apply-btn"));
    var joblistdiv = Array.from(document.querySelectorAll("#joblistdiv"));

    joblistdiv.forEach((element, i) => {
      var newclassname = "job-apply-btn-" + i;
      element.classList.add(newclassname);
    });
  });

  var appliedjobs = [];

  return (
    <div id="joblistdiv" style={jobliststyle} key={index}>
      <div id="cardheader" style={{ width: "100%", color: "green" }}>
        <h2 style={{ textAlign: "left" }}>State: Worker</h2>
        <button
          onClick={() => {
            console.log(buttondata);
            // renderCApply(buttondata);
          }}
          id=""
          className="job-apply-btn"
          style={{ width: "100%", margin: "0" }}>
          view
        </button>
      </div>

      <div id="card-details">
        <table>
          <th></th>
          <tr>
            <td>FullName:</td>
            <td>
              {buttondata.firstname +
                "  " +
                " " +
                buttondata.lastname +
                " " +
                " "}
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{buttondata.email}</td>
          </tr>
          <tr>
            <td>Age</td>
            <td>{buttondata.Age}</td>
          </tr>
          <tr>
            <td>address</td>
            <td>{buttondata.address + "  " + " "}</td>
          </tr>

          <tr>
            <td>Jobtype</td>
            <td>{buttondata.jobtype}</td>
          </tr>
          <tr>
            <td>phone number</td>
            <td>
              {" "}
              <a href={"tel:" + buttondata.pnumber}>
                {buttondata.pnumber}
              </a>{" "}
            </td>
          </tr>

          <tr>
            <td>image</td>
            <td>
              <img style={{ maxWidth: "200px" }} src={buttondata.image}></img>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};
class HousehelpsList extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      arrayofapplications: [],
      users: [],
      arrayofusers: [],
    };
  }

  componentDidMount() {
    const db = getDatabase();
    const starCountRef = ref(db, "applied_jobs");
    const starCountRefU = ref(db, "users/");
    var arrayofapplications = [];
    var arrayofusers = [];
    onValue(starCountRef, (snapshot) => {
      snapshot.forEach((element) => {
        var data = element.val();
        if (data.clientEmail == sessionStorage.getItem("cemail")) {
          arrayofapplications.push(data);
        }
      });

      console.log(arrayofapplications);
      this.setState({ data: arrayofapplications });
      if (arrayofapplications.length <= 0) {
        console.log("no submitted Applications");
      }
    });

    onValue(starCountRefU, (snapshot) => {
      snapshot.forEach((element) => {
        var data = element.val();

        arrayofusers.push(data);
      });

      console.log(arrayofusers);
      var arrayofusers2 = arrayofusers.reverse();
      this.setState({ users: arrayofusers2 });
    });

    var fulljobsarray = [];
    const dbs = getDatabase();
    const starCountRef2 = ref(dbs, "Fulltime_Request");
    //  onValue(starCountRef2, (snapshot) =>
  }

  render() {
    return (
      <div>
        {this.state.data.map((data, index) => (
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
            Age={data.helpName}
          />
        ))}
        <div style={{ textAlign: "center" }}>
          <h3>LIST OF All HOUSEHELPS</h3>
        </div>

        {this.state.users.map((data, index) => (
          <Users buttondata={data} index={index} />
        ))}
      </div>
    );
  }
}

function renderLogin() {
  reactDom.render(
    <React.StrictMode>
      <Header />
      <Login />
    </React.StrictMode>,
    document.querySelector("#root")
  );
}

export default Cdashboard;
