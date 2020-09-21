import React, { useState,useEffect } from "react";
import { Button ,Modal,OverlayTrigger,} from 'react-bootstrap';
import AddDoctorModal from "../components/tools/Modal/add-doctor-modal";



function DoctorTab({doctors}){

    const [isShowLoginModal,setIsShowLoginModal] = useState(false);
    const [modalType,setModalType] = useState('addDoctor');
    const [doctorsList,setDoctorsList] = useState(doctors)
    const [selectedDoctorInfo,setSelectedDoctorInfo] = useState(null)

    function updateDoctorsList(){
        return  new Promise(function(resolve,reject){

            console.log("fetched ");
            fetch('api/doctors/doctor-info',{
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                }}).then(async(doctorsInfo)=>{
                    if(doctorsInfo) {
                      let  response =  await  doctorsInfo.json();
                      console.log("doctorsList  response",doctorsList);
                      setDoctorsList(response.doctorsList);
                    }
                    
                }).catch(function(error){
                    console.log("error",error);
            });
        })
    }

    function showLoginModal(value){
        setIsShowLoginModal(value);
        setModalType('addDoctor');

        console.log("modalType asdf",modalType);
    }

    function showEditDoctorModal(doctorInfo){
        setModalType('editModal');
        showLoginModal(true);
        setSelectedDoctorInfo(doctorInfo)
    }

    useEffect(()=>{
        updateDoctorsList();
        console.log("useEffect");
    },[]) 
    
   

    return(
        <div className="doctor-tab-container">
            <div className="header"> 
                <div className="btn btn-primary add-doctor" onClick={()=>showLoginModal(true)}>
                 <span className="icon-container"><i className="fa fa-plus" aria-hidden="true"></i></span>  Add doctor
                </div>
            </div>
            
            <div className="doctors">
            {doctorsList ? doctorsList.map((doctor,index)=>{
                return (
                   
                    <div className="doctor-block" key={index}> 
                        <div className="row doctors-row" >

                        

                            <div className="col-xs-6 col-sm-2 col-md-2 col-lg-2 doctor-image">
                                <img className="img-container" src="/images/images.jpg"/>
                            </div>
                            <div className="col-xs-6 col-sm-9 col-md-9 col-lg-9 description">
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
                    <a>Office time : {doctor.officeTime}</a>
                                </div>
                            </div>
                        
                        </div>
                    
                        <div className="row edit-delete-container">
                            <div className="btn btn-primary edit-doctor" onClick={()=>showEditDoctorModal(doctor)}>Edit</div>
                            <div className="btn btn-danger delete-doctor">Delete</div>
                        </div>
                    </div>
                    
                    
                );
            }): null}
            </div>
            

            {isShowLoginModal ? <AddDoctorModal modalType={modalType} doctorInfo={selectedDoctorInfo}
                                                showLoginModal={showLoginModal} 
                                                updateParentComponent ={updateDoctorsList}/> : null}

            

            <style jsx>{`
                    .doctor-tab-container{
                        display:grid;
                    }
                    a{
                        font-family: 'Oswald', sans-serif;
                        color:#050505!important;
                    }
                    .name-container a{
                        color:#127ba3!important;
                    }
                    .header{
                        padding: 10px 10px 10px 10px;
                        border-bottom: 1px solid #127ba3;
                    }
                    .icon-container{
                        padding:5px;
                    }
                    .add-doctor{
                        float:right;
                        font-weight:500!important;
                    }

                    .img-container{

                        border-radius:50%;
                        border:2px solid #ffff;
                        opacity:1!important;
                    }
                    img {
                        width:100px;
                        height:100px;
                    }
                    .doctors{
                        overflow-y:scroll;
                        height: 55vh;
                    }
                    .doctor-block{
                        background-color: #cecece2e!important;
                        min-width: 25px;
                        border-radius: 15px;
                        padding: 15px;
                        margin: 15px;
                    }
                    .doctors-row{
                        margin-bottom:5px;
                    }
                    .doctor-image{
                        padding-left:25px
                    }
                    .description{
                        padding-left: 0px!important;
                        padding-top: 5px;
                    }
                    .doctor-description{
                        font-size:10px;
                    }    
                    .edit-delete-container{
                        float: right;
                        margin-top: -30px;
                        margin-right: 2px;
                    }
                    .edit-doctor{
                        margin:2px;
                        font-weight:300!important;
                        font-size:10px!important
                    }
                    .delete-doctor{
                        margin:2px;
                        font-weight:300!important;
                        font-size:10px!important;
                        background-color:#D40F03!important;
                        border-color:#D40F03!important;
                    }

                `}</style>
        </div>
    );

}



export default DoctorTab;