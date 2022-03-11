//! please remove all unused imports in all files too many annoying console messages
import React from "react";
import reactDom from "react-dom";
import Dashboard from "./dashboard";
import Header from "../Header";
import leftarrow from "../imgs/rr_left.png";
import { Fulltime } from "../request/Request";
import jobliststyle from "./joblist.css";
import { useEffect } from "react";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  onChildAdded,
  update,
  push,
  onValue,
} from "firebase/database";
import { Formik } from "formik";
import * as yup from "yup";
import emailjs from "@emailjs/browser";

//! remove all unused variables as well the console is too dirty and confusing
// all variables are usefull
const Joblist = ({
  firstname,
  state,
  address,
  lastname,
  pnumber,
  jobtype,
  email,
  middlename,
  index,
  date,
  Description,
  kidsnum,
  buttondata,
}) => {
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
        <h2 style={{ textAlign: "left" }}>State: {state}</h2>
        <button
          onClick={() => {
            console.log(buttondata);
            renderApply(buttondata);
          }}
          id=""
          className="job-apply-btn"
          style={{ width: "100%", margin: "0" }}
        >
          Apply
        </button>
      </div>

      <div id="card-details">
        <table>
          <th></th>
          <tr>
            <td>FullName:</td>
            <td>
              {firstname + "  " + " " + lastname + " " + " " + middlename}
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{email}</td>
          </tr>
          <tr>
            <td>Address:</td>
            <td>{address + "  " + " "}</td>
          </tr>
          <tr>
            <td>Application Date:</td>
            <td>{date}</td>
          </tr>
          <tr>
            <td>Jobtype</td>
            <td>{jobtype}</td>
          </tr>

          <tr>
            <td>job Description</td>
            <td>{Description}</td>
          </tr>
          <tr>
            <td>Number Of kids</td>
            <td>{kidsnum}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

console.log(process.env.REACT_APP_USER_ID);

const Apply = ({ data }) => {
  // yup validation schema
  const schema = yup.object().shape({
    job_proposal: yup
      .string()
      .required("must write proposal")
      .min(20, "please make proposal longer"),
  });

  // submit proposal
  const handleProposal = (userData, formData) => {
    const db = getDatabase();
    const dbRef = ref(db, "applied_jobs");

    //! always use camel casing for function names and stop mixing normal functions with arrow functions it is not proper .
    //! stop mixing normal functions with arrow functions it is not proper for uniformity sake.

    //? email js integration
    var templateParams = {
      client_name: `${userData.firstname} ${userData.lastname}`,
      //Todo: change below client_email value to clients email i.e userData.email the value below was used for testing
      client_email: data.email,
      proposal_message: formData.job_proposal,
      help_name: formData.help_name,
      help_email: sessionStorage.getItem("email"),
    };

    emailjs
      .send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_USER_ID
      )
      .then((res) => console.log("email sent successfully" + res.status))
      .catch((error) => console.log(error));

    function checkifuserhasappliedbefore(counter) {
      if (counter > 0) {
        console.log("you have applied to this Job before");
      } else {
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
        push(dbRef, {
          helpName: formData.help_name,
          helpNumber: sessionStorage.getItem("pnumber"),
          helpAge: sessionStorage.getItem("age"),
          helpSOO: sessionStorage.getItem("SOO"),
          proposal: formData.job_proposal,
          clientName: userData.firstname,

          //! line 174 and 175 are null for some reason so your push fails
          // clientEmail: userData.email,
          // clientDescription: userData.description,
          clientPnumber: userData.pnumber,
          proposalDate: dateTime,
        })
          .then(() => {
            console.log("Data Sent Successfully ");
          })
          .catch((error) => {
            //! you caught the error object but did not do anything with it
            console.log("data wasnt sent " , error)
          });
      }
    }
    checkifuserhasappliedbefore(sessionStorage.getItem("counter"));
  };

  useEffect(() => {
    const db = getDatabase();
    // const starCountRefcustomers = ref(db, "customers/");

    const starCountRefapplied = ref(db, "applied_jobs/");
    var customerdata = [];
    var counter = 0;

    onValue(starCountRefapplied, (snapshot) => {
      snapshot.forEach((element) => {
        var datas = element.val();

        if (
          datas.helpNumber == sessionStorage.getItem("pnumber") &&
          datas.clientEmail == data.email
        ) {
          
        } else {
        }
       
       
        sessionStorage.setItem("counter", counter);
      });
    });
  });

  return (
    <div>
      <div
        style={{
          width: "100px",
          height: "auto",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        onClick={renderDashboard}
      >
        <img src={leftarrow} style={{ width: "100%", color: "green" }}></img>
      </div>

      <div id="joblistdiv" style={jobliststyle}>
        <div
          id="cardheader"
          style={{ width: "100%", color: "green", gridTemplateColumns: "1fr" }}
        >
          <h2 style={{ textAlign: "left" }}>State: {data.state}</h2>
        </div>

        <div id="card-details">
          <table>
            <th></th>
            <tr>
              <td>FullName:</td>
              <td>
                {data.firstname +
                  "  " +
                  " " +
                  data.lastname +
                  " " +
                  " " +
                  data.middlename}
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{data.email}</td>
            </tr>
            <tr>
              <td>Address:</td>
              <td>{data.address + "  " + " "}</td>
            </tr>
            <tr>
              <td>Application Date:</td>
              <td>{data.date}</td>
            </tr>
            <tr>
              <td>Jobtype</td>
              <td>{data.jobtype}</td>
            </tr>

            <tr>
              <td>job Description</td>
              <td>{data.Description}</td>
            </tr>
            <tr>
              <td>Number Of kids</td>
              <td>{data.kidsnum}</td>
            </tr>
          </table>
        </div>
      </div>

      <div>
        <Formik
          validationSchema={schema}
          initialValues={{ job_proposal: "" }}
          onSubmit={(values) =>
            handleProposal(data, {
              ...values,
              help_name: `${sessionStorage.getItem(
                "name"
              )} ${sessionStorage.getItem("lastname")}`,
            })
          }
        >
          {({
            values,
            handleBlur,
            handleSubmit,
            handleChange,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit}>
              <p>write Your Proposal</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <div>
                  <table>
                    <tr>
                      <td>name</td>
                      <td>
                        {" " + sessionStorage.getItem("name") + ""}{" "}
                        {sessionStorage.getItem("lastname")}
                      </td>
                    </tr>
                  </table>
                </div>
              </div>

              <textarea
                name="job_proposal"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.job_proposal}
                id="textbtn"
                rows="15"
                style={{
                  padding: "5px",
                  borderColor:
                    errors.job_proposal && touched.job_proposal
                      ? "red"
                      : "inherit",
                }}
              />
              {errors.job_proposal ? (
                <h6 style={{ color: "red" }}>{errors.job_proposal}</h6>
              ) : null}
              <button type="submit" id="proposalbtn">
                Submit proposal
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

function renderApply(data) {
  reactDom.render(
    <div>
      <Header />
      <Apply data={data} />
    </div>,
    document.querySelector("#root")
  );
}

function renderDashboard(Props) {
  reactDom.render(
    <React.StrictMode>
      <Header />
      <Dashboard />
    </React.StrictMode>,
    document.querySelector("#root")
  );
}
export default Joblist;
