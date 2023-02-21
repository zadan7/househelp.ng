import React from "react";
import Header from "../Header";
import "./dashboard.css";
import Joblist from "./Joblist";
import Scroll from "./Scroll";
import { getDatabase, ref, onValue } from "firebase/database";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      jobs: {},
    };
  }

  componentDidMount() {
    var view = document.querySelector("#name");
    function load() {
      if (
        sessionStorage.getItem("name") == "" ||
        sessionStorage.getItem("name") == null
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
        <h3 style={{ textAlign: "center", padding: "" }}>
          Hello, welcome Agent{" "}
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
            Available Jobs Near You
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
      data: [],
      selectedJObs: [],
    };

    function searchfunction() {
      console.log("input");
    }
  }

  componentDidMount() {
    var fulljobsarray = [];
    const db = getDatabase();
    const starCountRef = ref(db, "Fulltime_Request/");

    onValue(starCountRef, (snapshot) => {
      snapshot.forEach((element) => {
        fulljobsarray.push(element.val());
      });
      var fulljobsarray_reverse = fulljobsarray.reverse();
      console.log(fulljobsarray.reverse);
      this.setState({
        data: fulljobsarray_reverse,
        selectedJObs: fulljobsarray_reverse,
      });
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

                //  console.log(searchparams)

                var newlist = this.state.data;
                var newlist2 = [];

                function collectsearchresults(joblist) {
                  if (
                    joblist.firstname.toLowerCase().includes(searchparams) ||
                    joblist.state
                      .toLowerCase()
                      .includes(searchparams.toLowerCase())
                  ) {
                    return newlist2;
                  }
                }

                const selectedJObs = newlist.filter(collectsearchresults);

                this.setState({ selectedJObs: selectedJObs });
              }}></input>
            <br></br>
            <input style={{ width: "40%" }} type="submit"></input>
          </div>
        </div>

        {/* <Scroll> */}
        {this.state.selectedJObs.map((data, index) => (
          <Joblist
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

        {/* </Scroll> */}
      </div>
    );
  }
}

export default Dashboard;
