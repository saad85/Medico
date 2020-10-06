import React, { useState, useEffect } from "react";
import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Modal,
} from "react-bootstrap";
import CustomDropdown from "../../tools/dropdown";
import TextField from "@material-ui/core/TextField";

export default function AddDoctorModal(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [officeLocation, setOfficeLocation] = useState("");
  const [isShow, setIsShow] = useState(true);
  const [isDoctorExist, setIsDoctorExist] = useState(false);
  const [hasAllFields, setHasAllFields] = useState(true);
  const [weekDays, setWeekdays] = useState([
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
  ]);
  const [selectedWorkdaysArr, setSelectedWorkdays] = useState([]);
  const [workingStartTime, setWorkingStartTime] = useState("12:00");
  const [workingEndTime, setWorkingEndTime] = useState("17:00");
  const [isInvalidTime, setIsInvalidTime] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function addDoctor(event, eventType) {
    event.preventDefault();
    setHasAllFields(true);

    let doctorInfo = {
      name,
      email,
      speciality,
      officeLocation,
      workDays: selectedWorkdaysArr,
      workingStartTime,
      workingEndTime,
    };

    if (!(name && email && officeLocation && selectedWorkdaysArr.length>0 && workingStartTime && workingEndTime)) setHasAllFields(false);
    else if (eventType === "editModal" && props.doctorInfo)
      updateDoctor(doctorInfo, eventType, props.doctorInfo._id);
    else {
      isDoctorExists(email).then(async function (res) {
        let response = await res.json();

        if (response.isDoctorExists) setIsDoctorExist(true);
        else
          insertOrUpdateCollection(doctorInfo).then((result) => {
            if (result && props.updateParentComponent)
              props.updateParentComponent();
          });
      });
    }
  }

  function isDoctorExists(email) {
    return new Promise(function (resolve, reject) {
      fetch("api/doctors/doctor-info?email=" + email, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((doctorInfo) => {
          resolve(doctorInfo);
        })
        .catch(function (error) {
          console.log("error", error);
        });
    });
  }

  function insertOrUpdateCollection(doctorInfo, eventType, doctorId) {
    return new Promise(function (resolve, reject) {
      fetch(
        "api/doctors/add-doctors?eventType=" +
          eventType +
          "&doctorId=" +
          doctorId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(doctorInfo),
        }
      )
        .then((data) => {
          setIsShow(false);
        })
        .then((doctorsInfo) => {
          resolve({ updateDoctorsList: true });
        })
        .catch(function (error) {
          console.log("error", error);
        });
    });
  }

  function updateDoctor(doctorInfo, eventType, doctorId) {
    insertOrUpdateCollection(doctorInfo, eventType, doctorId).then((result) => {
      if (result && props.updateParentComponent) props.updateParentComponent();
    });
  }

  function hideModal() {
    setIsShow(false);

    setTimeout(function () {
      if (props && props.showLoginModal) props.showLoginModal(false);
    }, 300);
  }

  function setSelected(value) {
    setSpeciality(value);
  }

  function onEnterModal() {
    if (props && props.doctorInfo) {
      setDoctorInfo(props.doctorInfo);
    }
  }

  async function setDoctorInfo(doctorInfo) {
    const { name, email, speciality, officeLocation, workDays, workingStartTime, workingEndTime } = doctorInfo;

    if (name) setName(name);

    if (email) setEmail(email);

    if (speciality) setSpeciality(speciality);

    if (officeLocation) setOfficeLocation(officeLocation);

    if (workDays.length>0) {
        setSelectedWorkdays(workDays);

        
        await workDays.forEach((value)=>{
            updateWeekdaysList(value, "remove")
        })
    }

    if (workingStartTime) setWorkingStartTime(workingStartTime);

    if (workingEndTime) setWorkingEndTime(workingEndTime);

  }

  function addWorkingDay() {
    const value = document.getElementById("workdays").value;

    setSelectedWorkdays([...selectedWorkdaysArr, value]);
    updateWeekdaysList(value, "remove");
  }

  function removeWorkday(value) {
    if (selectedWorkdaysArr.length > 0) {
      let updatedArr = selectedWorkdaysArr.filter((day) => day !== value);

      setSelectedWorkdays([...updatedArr]);
      updateWeekdaysList(value, "add");
    }
  }

  function updateWeekdaysList(value, updateType) {
    let weekDaysArr = weekDays ? weekDays : [],
      updatedArr =
        updateType === "remove"
          ? weekDaysArr.filter((day) => day !== value)
          : [...weekDaysArr, value];

    setWeekdays([...updatedArr]);
  }

  function workTimeChanged(value,type){

   

    if(type ==='startTime') setWorkingStartTime(value)
    else {

        

        if( workingStartTime > value){
            
            setIsInvalidTime(true);
            setWorkingStartTime(value);
        } else {
            setIsInvalidTime(false);
            setWorkingEndTime(value);
        }
        
    }
  }

  return (
    <div>
      <div className="signIn">
        <Modal
          show={isShow}
          onHide={() => hideModal()}
          size="md"
          onEnter={() => onEnterModal()}
        >
          <Modal.Header closeButton style={{backgroundColor:"#eceef1",    color: "#5a6171 !important"}}>
            {props.modalType === "addDoctor" ? (
              <Modal.Title>
                <a>Add doctor</a>
              </Modal.Title>
            ) : (
              <Modal.Title>
                <a>Edit doctor</a>
              </Modal.Title>
            )}
          </Modal.Header>

          <Modal.Body>
            <form>
              <FormGroup>
                <FormLabel>
                  {" "}
                  <span className="form-text">Doctor's name</span>
                </FormLabel>
                <FormControl
                  type="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ color: "#5d5f5e !important", fontSize: "12px" }}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>
                  {" "}
                  <span className="form-text">Doctor's email</span>
                </FormLabel>
                <FormControl
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsDoctorExist(false);
                  }}
                  style={{ color: "#5d5f5e !important", fontSize: "12px" }}
                />

                {isDoctorExist ? (
                  <div className="error-class">
                    Doctor already exists with this email
                  </div>
                ) : null}
              </FormGroup>

              <FormGroup controlId="speciality">
                <div className="speciality">
                  <div className="speciality-text">
                    <FormLabel>
                      <span className="form-text"> Speciality</span>
                    </FormLabel>
                  </div>
                  <div>
                    <CustomDropdown
                      setParentComponent={setSelected}
                      value={speciality}
                    />
                  </div>
                </div>
              </FormGroup>

              <FormGroup controlId="officeLocaion">
                <FormLabel>
                  <span className="form-text"> Doctor's office</span>
                </FormLabel>
                <FormControl
                  value={officeLocation}
                  onChange={(e) => setOfficeLocation(e.target.value)}
                  type="text"
                  style={{ color: "#5d5f5e !important", fontSize: "12px" }}
                />
                {/* <AddressAutoComplete/> */}
              </FormGroup>

              <FormGroup>
                <div className="row office-time">
                  <FormLabel>
                    <span className="form-text"> Office time</span>
                  </FormLabel>
                </div>

                <div className="row workdays">
                  {selectedWorkdaysArr.length > 0 ? (
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <div className="weekdays-container">
                        {selectedWorkdaysArr.map((weekDay, index) => (
                          <span key={index} className="weekDay">
                            {weekDay}
                            <span
                              className="cancel-day"
                              onClick={(e) => removeWorkday(weekDay)}
                            >
                              <i className="fa fa-times" aria-hidden="true"></i>
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>

                {weekDays.length > 0 ? (
                  <div className="row">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 workdays-label">
                      Work days:
                    </div>

                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 workdays-dropdown">
                      <FormControl as="select" id="workdays">
                        {weekDays.map((weekDay, index) => (
                          <option key={index} htmlFor={weekDay}>
                            {weekDay}
                          </option>
                        ))}
                      </FormControl>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-2 col-lg-2 add-btn-container">
                      <div
                        className="add-btn"
                        onClick={(e) => {
                          addWorkingDay(e);
                        }}
                      >
                        <i className="fa fa-plus" aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="row time-container">
                  <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 ">
                    From :
                  </div>
                  <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 ">
                    <TextField
                      value={workingStartTime}
                      id="date"
                      type="time"
                      onChange={(e) => workTimeChanged(e.target.value,"startTime")}
                    />
                  </div>
                  <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 ">
                    To :
                  </div>
                  <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 ">
                    <TextField
                      id="date"
                      value={workingEndTime}
                      type="time"
                      min="17:00"
                      onChange={(e) =>workTimeChanged(e.target.value,"endTime")}
                    />
                     {isInvalidTime? <div className ="error-class" style={{marginleft:"20px"}}>Can not set work end Time before start time</div> : null }
                  </div>

                 
                </div>

                {/* <FormControl value={officeTime} onChange={e => setOfficeTime(e.target.value)} type="text" style={{ color:"#5d5f5e !important",fontSize: "12px"}}/> */}
              </FormGroup>

              {!hasAllFields ? (
                <div className="error-class">All fields are mandatory</div>
              ) : null}

              <div
                className="btn btn-primary add-doctor"
                onClick={(e) => addDoctor(e, props.modalType)}
              >
                <span className="icon-container"></span>

                {props.modalType === "addDoctor" ? (
                  <span>Add doctor</span>
                ) : (
                  <span>Edit doctor</span>
                )}
              </div>
            </form>
          </Modal.Body>
        </Modal>

        <style jsx>{`
          .form-text {
            font-family: "Oswald", sans-serif;
          }
          .submit-button {
            font-family: "Oswald", sans-serif;
          }
          .add-btn-container {
            padding: 0px !important;
          }
          .add-btn {
            width: 50px;
            min-width: 50px;
            padding: 5px 17px;
            border-radius: 5px;
            border: 2px solid #cecece2e;
            background-color: #cecece2e !important;
            cursor: pointer;
          }
          .office-time {
            border-bottom: 2px solid #cecece2e;
            padding-left: 15px;
          }
          .custom-modal-header {
            background-color: #cecece2e !important;
          }
          .weekdays-container {
            padding: 0px 0px 10px 0px;
          }
          .workdays {
            padding-top: 15px;
          }
          .workdays-label {
            padding-right: 0px !important;
            padding-top: 5px;
          }
          .workdays-dropdown {
            padding-left: 0px !important;
          }
          .weekDay {
            min-width: 30px;
            padding: 3px;
            max-width: 85px;
            margin: 8px 0;
            border: 2px solid #cecece2e;
            border-radius: 5px;
            background-color: #cecece2e !important;
            margin: 2px 2px;
            display: inline-flex;
          }
          .cancel-day {
            margin: 0 5px;
            cursor: pointer;
          }
          .time-container {
            margin-top: 25px;
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
      </div>
    </div>
  );
}
