import DoctorsTab from "../../admin-doctor-tab";
import React, { useState, useEffect } from "react";
import AppoinmentModal from "../../../components/tools/Modal/appointment-modal";
import LoginModal from "../../../components/tools/Modal/modal";
import CommonHelpers from "../../helpers/helper";

export default function Doctors(props) {
  let helpers = CommonHelpers() || null,
    currentUserId = helpers.getCurrentUserId() || null;

  const [doctorsList, setDoctorsList] = useState([]);
  const [isShowAppointmentModal, setIsShowAppointmentModal] = useState(false);
  const [selectedDoctorInfo, setSelectedDoctorInfo] = useState(null);
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);
  const [appointmentPropsData, setAppointmentPropsData] = useState(null);

  let headerText = "All doctors",
    modalType = "login";

  function updateDoctorsList() {
    return new Promise(function (resolve, reject) {
      fetch("api/doctors/doctor-info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (doctorsInfo) => {
          if (doctorsInfo) {
            let response = await doctorsInfo.json();

            setDoctorsList(response.doctorsList);
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    });
  }

  function showAppointmentModal(doctor, value, userId) {
    if (doctor) setSelectedDoctorInfo(doctor);
    if (userId) currentUserId = userId;

    if (currentUserId) setIsShowAppointmentModal(value);
    else {
      setAppointmentPropsData({
        doctorInfo: selectedDoctorInfo,
        context: "appointmentModal",
      });
      setIsShowLoginModal(true);
    }
  }

  function reloadPage() {
    location.reload();
  }

  function receiveChildDataAndSetState(childData) {
    setIsShowLoginModal(childData.isShowLoginModal);
  }

  useEffect(() => {
    updateDoctorsList();

    setTimeout(() => {
      if (window.location && window.location.search === "?showAppointment") {
        setIsShowAppointmentModal(true);
      }
    }, 300);
  }, []);

  let filteredList =
    doctorsList && props.searchText
      ? doctorsList.filter((doctor) => {
          headerText = "Filtered doctors";
          return doctor.name
            .toLowerCase()
            .includes(props.searchText.toLowerCase())
            ? doctor
            : "";
        })
      : doctorsList;

  return (
    <div className="doctor-section">
      <div className="container doctor-container">
        <div className="doctor-tab-container">
          <div className="header">
            <h4>{headerText}</h4>
          </div>
          <div className="doctors">
            <div className="row pad-10">
              {filteredList.length > 0 ? (
                filteredList.map((doctor, index) => {
                  return (
                    <div
                      className="col-xs-12 col-sm-6 col-md-3 col-lg-3"
                      key={index}
                    >
                      <div className="doctor-block">
                        <div className="row" style={{ padding: "5px 32%" }}>
                          <img
                            className="img-container"
                            src="/images/images.jpg"
                          />
                        </div>
                        <div className="row doctors-row">
                          <div className="name-container">
                            <a>{doctor.name}</a>
                          </div>
                          <div className="doctor-description">
                            <a>Contract : {doctor.email}</a>
                          </div>

                          <div className="doctor-description">
                            <a>Speciality : {doctor.speciality}</a>
                          </div>
                          <div className="doctor-description">
                            <a>Office : {doctor.officeLocation}</a>
                          </div>
                          <div className="doctor-description">
                            <a>Work days : {doctor.workDays}</a>
                          </div>
                        </div>
                        <div className="row" style={{ padding: "10px 30%",height: "36px" }}>
                          {/* <div
                            className="btn btn-primary edit-doctor"
                            onClick={() => showAppointmentModal(doctor, true)}
                          >
                            Book Appointment
                          </div> */}
                          <div className="book-btn" onClick={() => showAppointmentModal(doctor, true)}>Book Appointment</div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="not-found-msg">
                  <span>No doctor found..</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {isShowAppointmentModal ? (
          <AppoinmentModal
            showAppointmentModal={showAppointmentModal}
            doctorInfo={selectedDoctorInfo}
            currentUserId={currentUserId}
          />
        ) : null}
        <LoginModal
          show={isShowLoginModal}
          modalType={modalType}
          size="sm"
          showAppointmentModal={showAppointmentModal}
          appointmentPropsData={appointmentPropsData}
          sendDataToParent={receiveChildDataAndSetState}
          reloadPage={reloadPage}
        />

        <style jsx>{`
          .doctor-tab-container {
            display: grid;
          }
          a {
            font-family: "Oswald", sans-serif;
            color: #5a6171 !important;
          }
          .name-container a {
            color: #127ba3 !important;
          }
          .header {
            padding: 10px 10px 10px 0px;
            border-bottom: 1px solid #127ba3;
            color: #127ba3 !important;
          }
          .icon-container {
            padding: 5px;
          }
          .add-doctor {
            float: right;
            font-weight: 500 !important;
          }

          .img-container {
            border-radius: 50%;
            border: 2px solid #ffff;
            opacity: 1 !important;
          }
          img {
            width: 100px;
            height: 100px;
          }
          .doctors {
            height: 100%;
            margin-left: -20px;
          }
          .doctor-block {
            background-color: #ffff !important;
            min-width: 25px;
            border-radius: 10px;
            padding: 15px;
            margin: 10px;
            box-shadow: 0 0px 3px 0 rgba(0, 0, 0, 0.2),
              0 0px 0px 0 rgba(0, 0, 0, 0.19);
          }
          .doctor-block:hover .book-btn {
            display: block;
          }
          .doctor-block:hover {
            display: block;
            box-shadow: 0 0px 3px 0 rgba(0, 0, 0, 0.2),
              0 1px 1px 0 rgba(0, 0, 0, 0.19);
          }
          .doctors-row {
            margin-bottom: 5px;
            display: block;
            text-align: center;
            padding: 25px 5px;
            border-bottom: 2px solid #cecece2e;
          }
          .doctor-image {
            padding-left: 25px;
          }
          .description {
            padding-left: 0px !important;
            padding-top: 5px;
            margin-left: 8px;
          }
          .doctor-description {
            font-size: 13px;
          }
          .make-appoinment-container {
            float: right;
            margin-top: -30px;
            margin-right: 2px;
            min-height: 50px;
            display: none;
          }
          .book-btn{
              min-width:50px;
              padding:3px 12px;
              min-height:20px;
              border:1px solid #127ba3;
              color:#127ba3;
              font-size:12px;
              cursor:pointer;
              transition: 0.2s;
              border-radius:5px;
              

          }
        //   .book-btn:hover{
        //     border:2px solid #127ba3;
        //   }
          .edit-doctor {
            margin: 2px;
            font-weight: 300 !important;
            font-size: 10px !important;
          }
          .delete-doctor {
            margin: 2px;
            font-weight: 300 !important;
            font-size: 10px !important;
            background-color: #d40f03 !important;
            border-color: #d40f03 !important;
          }
          .not-found-msg {
            text-align: center;
            padding: 10px 26px;
            color: #127ba3 !important;
          }
        `}</style>
      </div>
    </div>
  );
}
