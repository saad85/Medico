import React, { useState,useEffect } from "react";
import { Button ,Modal,OverlayTrigger,} from 'react-bootstrap';
import AddDoctorModal from "../components/tools/Modal/add-doctor-modal";


function DoctorTab(){

    const [isShowLoginModal,setIsShowLoginModal] = useState(false);
    const [doctors,setDoctors] = useState([]);

    console.log("isShowLoginModal ",isShowLoginModal)

    function showLoginModal(value){
        setIsShowLoginModal(value);
    }

    
    useEffect(()=>{
        console.log("call the api ==>");

        getDoctors().then(async function(response){
            console.log("response ==>",response);

            let doctors= await response.json(),
            doctorsList = doctors.doctorsList ?doctors.doctorsList : [] ;

            console.log("doctorsList ==>",doctorsList);
            setDoctors(doctorsList);


        })

    },[]);

    function getDoctors(){

        return  new Promise(function(resolve,reject){
            fetch('api/doctors/doctor-info',{
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                }}).then((doctorsInfo)=>{
                    resolve(doctorsInfo)         
                }).catch(function(error){
                    console.log("error",error);
                });
            })
    }

    return(
        <div className="doctor-tab-container">
            <div className="header"> 
                <div className="btn btn-primary add-doctor" onClick={()=>showLoginModal(true)}>
                 <span className="icon-container"><i className="fa fa-plus" aria-hidden="true"></i></span>  Add doctor
                </div>
            </div>
            
            <div className="doctor-block"> 
            {doctors.map((doctor)=>{
                return (
                    <div className="row">

                    

                        <div className="col-xs-6 col-sm-2 col-md-2 col-lg-2 doctor-image">
                            <img className="img-container" src="/images/images.jpg"/>
                        </div>
                        <div className="col-xs-6 col-sm-9 col-md-9 col-lg-9 description">
                            <div className="name-container">
                <a>{doctor.name}</a>
                            </div>
                            <div className="doctor-description">
                <a>Office : {doctor.office}</a>
                            </div>
                        </div>
                    
                    </div>
                );
            })}
                
            </div>

            {isShowLoginModal ? <AddDoctorModal showLoginModal={showLoginModal}/> : null}

            

            <style jsx>{`
                    .doctor-tab-container{
                        display:grid;
                    }
                    a{
                        font-family: 'Oswald', sans-serif;
                        color:#050505!important;
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
                    }

                    .img-container{

                        border-radius:50%;
                        border:2px solid #ffff;
                    }
                    img {
                        width:100px;
                        height:100px;
                    }
                    .doctor-block{
                        background-color: #cecece2e!important;
                        min-width: 25px;
                        border-radius: 15px;
                        padding: 15px;
                        margin: 15px;
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

                `}</style>
        </div>
    );

}



export default DoctorTab;