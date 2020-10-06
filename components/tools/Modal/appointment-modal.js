import React, { useState, useEffect } from "react";
import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Modal,
} from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import Router from "next/router";
import TextField from "@material-ui/core/TextField";

import Flatpickr from "react-flatpickr";

export default function (props) {
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [phoneNumber, setPatientPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [patientAge, setPatientAge] = useState(1);
  const [errorClass, setErrorClass] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const [isValidAge, setIsValidAge] = useState(true);
  const [doctorWorkDays, setDoctorWorkDays] = useState([]);
  const [appointmentTime, setAppointmentTime] = useState("12:00");
  

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function hideModal() {
    setIsShow(false);

    if (props && props.showAppointmentModal) {
      setTimeout(function () {
        props.showAppointmentModal({}, false);
      }, 300);
    }

    Router.push("/");
  }

  function makeAppointment(e) {
    console.log(
      "doctorId ,patientName && patientEmail && phoneNumber && appointmentDate ",
      doctorId,
      patientName,
      patientEmail,
      phoneNumber,
      appointmentDate,
      appointmentTime
    );

    if (
      !(
        doctorId &&
        patientName &&
        patientEmail &&
        phoneNumber &&
        appointmentDate &&
        appointmentTime
      )
    )
      setErrorClass(true);
    else {

    const appointmentInfo = {
        doctorId,
        patientName,
        patientEmail,
        phoneNumber,
        appointmentDate,
        appointmentTime
    }
      fetch("api/appointments/add-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentInfo),
      })
        .then((data) => {})
        .then((appointmentInfo) => {})
        .catch(function (error) {
          console.log("error", error);
        });
    }
  }

  function validateAndSet(target) {
    if (target) {
      let value = target.valueAsNumber;

      if (value < 1) target.value = 1;
      else if (value > 190) target.value = 190;
      else setPatientAge(value);
    }
  }

  function workTimeChanged(value,type){
  }

  useEffect(() => {

    if (props && props.doctorInfo) {
      setDoctorId(props.doctorInfo._id);
      if (props.doctorInfo.workDays && props.doctorInfo.workDays.length > 0) {
        setDoctorWorkDays(props.doctorInfo.workDays);
      }
    }
    return () => {};
  }, []);

  return (
    <template>
      <Modal show={isShow} onHide={() => hideModal()} size="md">
        <Modal.Header closeButton style={{backgroundColor:"#eceef1",    color: "#5a6171"}}>
          <h5 style={{ color: "#5a6171 !important" }}>Book appointment</h5>
        </Modal.Header>

        <Modal.Body>
          <FormGroup>
            <FormLabel>
              {" "}
              <span className="form-text">Patient's name</span>
            </FormLabel>
            <FormControl
              type="name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              style={{ color: "#5d5f5e !important", fontSize: "12px" }}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>
              {" "}
              <span className="form-text">Patient's email</span>
            </FormLabel>
            <FormControl
              type="email"
              value={patientEmail}
              onChange={(e) => setPatientEmail(e.target.value)}
              style={{ color: "#5d5f5e !important", fontSize: "12px" }}
            />
          </FormGroup>

          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <FormGroup>
                <FormLabel>
                  {" "}
                  <span className="form-text">Gender: </span>
                </FormLabel>
                <FormControl as="select">
                  <option htmlFor="male">Male</option>
                  <option htmlFor="female">Female</option>
                  <option htmlFor="others">Others</option>
                </FormControl>
              
              </FormGroup>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <FormLabel>
                {" "}
                <span className="form-text">Age: </span>
              </FormLabel>
              <div>
                <FormControl
                  type="number"
                  value={patientAge}
                  min="1"
                  max="190"
                  onChange={(e) => validateAndSet(e.target)}
                  style={{ color: "#5d5f5e !important", fontSize: "12px" }}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
              <FormGroup>
                <FormLabel>
                  {" "}
                  <span className="form-text">Patient's phone</span>
                </FormLabel>

                <PhoneInput
                  country={"bd"}
                  value={phoneNumber}
                  onChange={(phone) => setPatientPhone(phone)}
                  inputStyle={{ width: "100%" }}
                  autoFormat={false}
                />
              </FormGroup>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
              <FormGroup>
                <FormLabel>
                  {" "}
                  <span className="form-text">Appoinment date</span>
                </FormLabel>
              
                <Flatpickr
                    value={appointmentDate}
                    options={{
                      minDate: "today",
                      dateFormat: "Y-m-d",
                      disable: [
                        function (date) {
                          // disable every multiple of 8

                          if (doctorWorkDays.length > 0) {
                            let weekDayIndex = new Date(date).getDay(),
                              weekday = weekDays[weekDayIndex];
                           
                            return !doctorWorkDays.includes(weekday);
                          }
                        },
                      ],
                    }}
                    onChange={(date) => {
                      setAppointmentDate(date);
                    }}
                    style={{
                      border: " 1px solid #CACACA",
                      padding: "7px",
                      width: "105px",
                      borderRadius: "5px",
                      fontSize: "12px",
                      color: "#555",
                    }}
                  />
                

                

                
              </FormGroup>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
            <FormGroup>
                <FormLabel>
                  {" "}
                  <span className="form-text">Appoinment time </span>
                </FormLabel>
                <TextField
                        value={appointmentTime}
                        id="date"
                        type="time"
                        onChange={(e) => setAppointmentTime(e.target.value)}
                        />
            </FormGroup>
            
            </div>
          </div>

          <FormGroup>
            <FormLabel>
              {" "}
              <span className="form-text">Description</span>
            </FormLabel>
            <textarea
              type="text"
              row="5"
              col="5"
              className="desc-input"
              placeholder="Write descriptions, ex. symptoms"
            />
          </FormGroup>

          {errorClass ? (
            <div className="error-class">All fields are mandatory</div>
          ) : null}

          <div
            className="btn btn-primary add-doctor"
            onClick={(e) => makeAppointment(e)}
          >
            <span className="icon-container"></span>

            <span>Make appointment</span>
          </div>
        </Modal.Body>
      </Modal>
      <style jsx>{`
        .appointment {
          font-size: 12px;
          display: flex;
        }

        .date-time-txt {
          margin-top: 8px;
        }
        .radio-input {
          margin: 5px 10px;
        }

        .desc-input {
          border: 1px solid #ced4da;
          padding: 3px;
          width: 100%;
          height: 70px;
          font-size: 12px;
        }

        .input-tel-class {
          background-color: yellow;
        }
        .form-text {
          font-family: "Oswald", sans-serif;
          color: "color: rgb(90, 97, 113) !important";
        }
        .submit-button {
          font-family: "Oswald", sans-serif;
        }
        .custom-modal-header {
          background-color: #cecece2e !important;
        }
        .speciality {
          display: flex;
          border-top: 2px solid #cecece2e;
          padding: 15px 0px;
          border-bottom: 2px solid #cecece2e;
        }
        .speciality-text {
          margin-right: 10px;
        }
        .add-doctor {
          float: right;
          font-weight: 300;
        }
      `}</style>
    </template>
  );
}
