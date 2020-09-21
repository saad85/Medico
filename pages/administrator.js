import Layout from '../components/layout';
import React, { useState ,useEffect} from "react";
import DoctorsTab from './admin-doctor-tab'

const nodefetch = require("node-fetch");


function getDoctors(){
    return  new Promise(function(resolve,reject){

        console.log("fetched ");
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
 function Administrator({doctorsList}){
    const [selectedTab,setSelectedTab] = useState('');
    const sideBarList = ["Dashboard","Doctors","Users","Apointments"];

    let doctors = doctorsList && doctorsList.doctorsList ? doctorsList.doctorsList : []

    function isActive(tabName){
     return selectedTab === tabName ? true : false
    }
    

    return(
        <div className="administrator-page">
            <Layout> 
                <div className="administrator-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-2 col-md-2 col-lg-2 left-section-container">
                                <div className="left-section"> 
                                    <ul className="left-section-ul">
                                        {sideBarList.map((barName,index)=><li key={index} className={isActive(barName) ?  "left-section-li active-tab" :"left-section-li "}  onClick={()=>setSelectedTab(barName)}><a>{barName}</a></li>)}
                                    </ul> 
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                                <div className="right-section"> 
                                    {isActive("Doctors") ? <DoctorsTab doctors={doctors}/> :null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </Layout>

            <style jsx>{`
                .administrator-page{
                    height:90vh;
                    border-color: #127ba3;
                    border-style: solid;
                    border-width: 0 1px 4px 1px;,
                    fontFamily: 'Oswald', sans-serif;
                }
                a{
                    font-family: 'Oswald', sans-serif;
                    color:#050505!important;
                }

                .left-section-container{
                    padding: 3% 0% 3% 1.5%;
                }
                .left-section{
                    border:1px solid #d6d4d4;
                    background-color:#ffffff!important;
                }
                .left-section-ul{
                    list-style-type: none;
                    padding: 0px;
                    margin: 0px;
                }
                li:hover {
                    background-color: #cecece2e;
                  }
                .left-section-li{
                    padding:12px;
                    border-bottom:2px solid #cecece2e;
                    min-width:100%;
                    min-height: 30px;
                    cursor:pointer;
                }
                .right-section{
                    margin: 4% 4% 9% 1.5%;
                    padding: 1%;
                    border: 1px solid #d6d4d4;
                    background-color: #ffffff!important;
                    min-width: 80%;
                    height: 65vh;
                    
                }
       
                .active-tab a{
                    color: #127ba3!important;
                }
                .active-tab {
                    background-color: #cecece2e;
                }
                .test{
                    background-color: #cecece2e!important;
                    min-width: 25px;
                    border-radius: 35px;
                    padding: 15px;
                    margin: 15px;
                }    

            `}</style>
            
        </div>
    );

};

export async function getServerSideProps(context) {

    let doctorsList =[]

    await nodefetch('http://localhost:3000/api/doctors/doctor-info',{
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }}).then(async (doctorsInfo)=>{
            doctorsList = await doctorsInfo.json();
            
        }).catch(function(error){
            console.log("error",error);
        });

    // Pass data to the page via props
    return { props: {doctorsList } }
}

export default Administrator;