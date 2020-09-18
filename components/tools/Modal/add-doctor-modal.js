import React, { useState,useEffect } from "react";
import { Button, FormGroup, FormControl, FormLabel,Modal } from "react-bootstrap";
import CustomDropdown from '../../tools/dropdown';
import AddressAutoComplete from '../../tools/address-autocomplete';

export default function AddDoctorModal(props) {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [speciality,setSpeciality] = useState("");
    const [officeLocation, setOfficeLocation] = useState("");
    const [officeTime, setOfficeTime] = useState("");
    const [isShow,setIsShow] = useState(true);
    const [isDoctorExist,setIsDoctorExist] = useState(false);
    const [hasAllFields,setHasAllFields] = useState(true);


    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    

    async function  addDoctor(event) {
        event.preventDefault();
        setHasAllFields(true);
        
        let doctorInfo={name,email,speciality,officeLocation,officeTime};

        if(!(name&&email&&officeLocation&&officeTime)) setHasAllFields(false);
        else {
           
            isDoctorExists(email).then(async function(res){

                let response = await res.json();

                if(response.isDoctorExists) setIsDoctorExist(true);
                else insertIntoDatabase(doctorInfo);
            })
        }
    }

    function isDoctorExists(email){

        return  new Promise(function(resolve,reject){
            fetch('api/doctors/doctor-info?email='+email,{
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                }}).then((doctorInfo)=>{
                    resolve(doctorInfo)         
                }).catch(function(error){
                    console.log("error",error);
                });
            })
    }

    function insertIntoDatabase(doctorInfo){
        fetch('api/doctors/add-doctors',{
            method:'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body:  JSON.stringify(doctorInfo)}).then((data)=>{
                setIsShow(false);
            });
    }
    function hideModal(){
        setIsShow(false);

        setTimeout(function(){
            if(props && props.showLoginModal) props.showLoginModal(false)
        },300)
        
    }

    function setSelected(value){
        setSpeciality(value);
    }


    return (
        <div>
            <div className="signIn">
                    <Modal show={isShow} onHide={()=>hideModal()} size="md" >
                            
                        <Modal.Header closeButton >
                            <Modal.Title><a>Add doctor</a></Modal.Title>
                        </Modal.Header>

                        <Modal.Body> 
                        <form onSubmit={(event)=>addDoctor(event)}>

                            <FormGroup >
                                
                                <FormLabel> <span className="form-text">Doctor's name</span></FormLabel>
                                <FormControl  type="name" onChange={e => setName(e.target.value)} style={{ color:"#5d5f5e !important",fontSize: "12px"}}/>

                            </FormGroup>

                            <FormGroup >
                                
                                <FormLabel> <span className="form-text">Doctor's email</span></FormLabel>
                                <FormControl  type="email"  onChange={e => {setEmail(e.target.value); setIsDoctorExist(false);}} style={{ color:"#5d5f5e !important",fontSize: "12px"}}/>

                                {isDoctorExist ? <div className="error-class">Doctor already exists with this email</div>:null}
                            </FormGroup>

                            <FormGroup controlId="speciality">
                                <div className="speciality">
                                    <div className="speciality-text">
                                        <FormLabel><span className="form-text"> Speciality</span></FormLabel>
                                    </div>
                                    <div ><CustomDropdown setParentComponent={setSelected}/></div>
                                </div>
                            </FormGroup>

                            <FormGroup controlId="officeLocaion">
                                
                                <FormLabel><span className="form-text"> Doctor's office</span></FormLabel>
                                <FormControl value={officeLocation} onChange={e => setOfficeLocation(e.target.value)} type="text" style={{ color:"#5d5f5e !important",fontSize: "12px"}}/>
                                {/* <AddressAutoComplete/> */}
                            </FormGroup>

                            <FormGroup controlId="officeTime">
                                
                                <FormLabel><span className="form-text"> Office time</span></FormLabel>
                                <FormControl value={officeTime} onChange={e => setOfficeTime(e.target.value)} type="text" style={{ color:"#5d5f5e !important",fontSize: "12px"}}/>

                            </FormGroup>

                            

                            {!hasAllFields ? <div className="error-class">All fields are mandatory</div>:null}


                            <div className="btn btn-primary add-doctor" onClick={(e)=>addDoctor(e)}>
                                <span className="icon-container"><i className="fa fa-plus" aria-hidden="true"></i></span>  Add doctor
                            </div>
                            </form>
                </Modal.Body>

            </Modal>
                
                <style jsx>{`
                            .form-text{

                            font-family: 'Oswald', sans-serif;
                            
                            }
                            .submit-button{
                                font-family: 'Oswald', sans-serif;
                            }
                            .custom-modal-header{
                                background-color: #cecece2e!important;
                            }
                            .speciality{
                                display:flex;
                                border-top: 2px solid #cecece2e;
                                padding: 15px 0px;
                                border-bottom: 2px solid #cecece2e;
                            }
                            .speciality-text{
                                margin-right:10px;
                            }
                            .add-doctor{
                                float:right;
                            }
                            

                `}</style>
            </div>
        </div>
    );
}