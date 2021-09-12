import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './../../assets/bootstrap/css/bootstrap.min.css';
import '../../assets/fonts/ionicons.min.css';
import './../../assets/css/RegistrationForm.css';
import { Register } from '../Services/Auth';

import { ToastContainer, toast } from 'react-toastify';
import { useUserContext } from '../UserContext';
import { LOGIN_MODAL_OPEN } from '../Actions/user';

function RegistrationForm(){

    const history = useHistory();

    const {state, dispatch} = useUserContext();

    var [companyName, setCompanyName] = useState('');
    var [address, setAddress] = useState('');
    var [town, setTown] = useState('');
    var [countryState, setState] = useState('');
    var [country, setCountry] = useState('');
    var [billingEmail, setBillingEmail] = useState('');
    var [phoneNo, setPhoneNo] = useState('')
    
    var [primaryName, setPrimaryName] = useState('');
    var [primaryTitle, setPrimaryTitle] = useState('');
    var [primaryPhoneNumber, setPrimaryPhoneNumber] = useState('');
    var [primaryMobile, setPrimaryMobile] = useState('');
    var [primaryUsername, setPrimaryUsername] = useState('');
    var [primaryEmail, setPrimaryEmail] = useState('');
    var [primaryAddress, setPrimaryAddress] = useState('');
    var [primaryPassword, setPrimaryPassword] = useState('');
    var [confirmPrimaryPassword, setConfirmPassword] = useState('');

    var [secondaryName, setSecondaryName] = useState('');
    var [secondaryTitle, setSecondaryTitle] = useState('');
    var [secondaryPhoneNumber, setSecondaryPhoneNumber] = useState('');
    var [secondaryMobile, setSecondaryMobile] = useState('');
    var [secondaryEmail, setSecondaryEmail] = useState('');
    var [secondaryUsername, setSecondaryUsername] = useState('');
    var [secondaryAddress, setSecondaryAddress] = useState('');
    var [secondaryPassword, setSecondaryPassword] = useState('');
    var [confirmSecondaryPassword, setConfirmSecondaryPassword] = useState('');

    var [primary_password_eye_icon, set_primary_password_eye_icon] = useState("ion-eye");
    var [primary_confirm_password_eye_icon, set_primary_confirm_password_eye_icon] = useState("ion-eye");
    var [secondary_password_eye_icon, set_secondary_password_eye_icon] = useState("ion-eye");
    var [secondary_confirm_password_eye_icon, set_secondary_confirm_password_eye_icon] = useState("ion-eye");

    // const updateClinicName = (e) => setClinicName(e.target.value);
    var [disableRegBtn, setDisableRegBtn] = useState(false);

    var [error1, setError1] = useState({"display":"none", "msg":""});
    var [error2, setError2] = useState({"display":"none", "msg":""});

    const submitHandler = () =>{
        // let primaryContact = {
        //     "primaryName":primaryName,
        //     "primaryTitle":primaryTitle,
        //     "primaryPhoneNumber":primaryPhoneNumber,
        //     "primaryMobile":primaryMobile,
        //     "primaryEmail":primaryEmail,
        //     "primaryPassword":primaryPassword
        // }

        // let secondaryContact = {
        //     "secondaryName":secondaryName,
        //     "secondaryTitle":secondaryTitle,
        //     "secondaryPhoneNumber":secondaryPhoneNumber,
        //     "secondaryMobile":secondaryMobile,
        //     "secondaryEmail":secondaryEmail,
        //     "secondaryPassword":secondaryPassword
        // }

        const today = new Date();
        let insertedObj = {
            "employees": [
            
                {
                    "login": {
                        "employees": null,
                        "superAdmin": null,
                        "username": primaryUsername,
                        "password": primaryPassword,
                        "status": "Active",
                        "roleId": 2
                    },
                    "employeeName": primaryName,
                    "position": primaryTitle,
                    "phoneNo": primaryPhoneNumber,
                    "email": primaryEmail,
                    "mobileNo": primaryMobile,
                    "address": primaryAddress,
                    "currentStatus":1,
                    "currentStatusDate": today.toISOString()
                },
                // {
                //     "login": {
                //         "employees": null,
                //         "superAdmin": null,
                //         "username": secondaryUsername,
                //         "password": secondaryPassword,
                //         "status": "Active",
                //         "roleId": 2
                //     },
                //     "employeeName": secondaryName,
                //     "position":secondaryTitle,
                //     "phoneNo": secondaryPhoneNumber,
                //     "email": secondaryEmail,
                //     "address": secondaryAddress,
                //     "mobileNo": secondaryMobile,
                //     "currentStatus":1,
                //     "currentStatusDate": today.toISOString()
                // }
            ],
            "companyName": companyName,
            "town":town,
            "phoneNo": phoneNo,
            "email": billingEmail,
            "address": address,
            "state": countryState,
            "country": country
        }

        
        console.log(insertedObj);
        Register(insertedObj)
        .then(res => {
            let msg = ""
            if(res.data)
                msg = "Registered Successfully"
            else
                msg = "Registration Failed"
            setDisableRegBtn(true)
            toast(msg, {
                containerId:null,
                type:"success",
                onClose: () => window.location.reload()
                });
            
        }).catch(err => {
            console.log("registration failed")
        })
    }

    const moveToLoginHandler = () => {
        dispatch({type:LOGIN_MODAL_OPEN});
    }

    const validatePrimaryPassword = () => {
        if(primaryPassword.length < 8)
            setError1({"display":"block","msg":"Password must be minimum 8 characters"});
        else if(confirmPrimaryPassword !== primaryPassword)
            setError1({"display":"block","msg":"Password Mismatch"});
        
    }

    const validateSecondaryPassword = () => {
        if(secondaryPassword.length < 8)
            setError2({"display":"block","msg":"Password must be minimum 8 characters"});
        else if(confirmSecondaryPassword !== secondaryPassword)
            setError2({"display":"block","msg":"Password Mismatch"});

    }

    return <>
            <div className="registrationform">
                <div className="container">
                    <div className="row justify-content-center">
                        <h3 className="col-10">Company Information <hr className="col-11 divider"/></h3>
                    </div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-10 form-group"><input className="form-control"  type="text" name="companyName" placeholder="Company Name" onChange = {(e) => setCompanyName(e.target.value.trim())}/></div>
                            <div className="col-10 form-group"><textarea rows="1" className="col-12 form-control" style={{resize: "none"}} type="text" placeholder="Address" name="address" onChange = {(e) => setAddress(e.target.value.trim())}/></div>
                            <div className="col-10 form-group"><input className="col-12 form-control" type="text" name="town" placeholder="Town" onChange = {(e) => setTown(e.target.value.trim())} /></div>
                            <div className="col-5 form-group"><input className="col-12 form-control" type="text" name="state" placeholder="State/Province" onChange = {(e) => setState(e.target.value.trim())} /></div>
                            <div className="col-5 form-group"><input className="col-12 form-control" type="text" name="country" placeholder="Country" onChange = {(e) => setCountry(e.target.value.trim())} /></div>
                            <div className="col-10 form-group"><input className="col-12 form-control" type="text" name="phoneNo" placeholder="Phone Number" onChange = {(e) => setPhoneNo(e.target.value.trim())} /></div>
                            <div className="col-10 form-group"><input className="col-12 form-control" type="text" name="billingEmail" placeholder="Billing Email" onChange = {(e) => setBillingEmail(e.target.value.trim())} /></div>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <h3 className="col-10">Main Contact <hr className="col-11 divider"/></h3>
                    </div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-10 form-group"><input className="form-control"  type="text" name="primaryName" placeholder="Name" onChange = {(e) => setPrimaryName(e.target.value.trim())}/></div>
                            <div className="col-10 form-group"><input className="col-12 form-control" type="text" name="primaryTitle" placeholder="Title" onChange = {(e) => setPrimaryTitle(e.target.value.trim())} /></div>
                            <div className="col-5 form-group"><input className="col-12 form-control" type="text" name="primaryPhoneNumber" placeholder="Phone Number" onChange = {(e) => setPrimaryPhoneNumber(e.target.value.trim())} /></div>
                            <div className="col-5 form-group"><input className="col-12 form-control" type="text" name="primaryMobile" placeholder="Mobile" onChange = {(e) => setPrimaryMobile(e.target.value.trim())} /></div>
                            <div className="col-10 form-group"><input className="col-12 form-control" type="text" name="primaryEmail" placeholder="Email" onChange = {(e) => setPrimaryEmail(e.target.value.trim())} /></div>
                            <div className="col-10 form-group"><input className="col-12 form-control" type="text" name="primaryUsername" placeholder="Username" onChange = {(e) => setPrimaryUsername(e.target.value.trim())} /></div>
                            <div className="col-10 form-group"><input className="col-12 form-control" type="text" name="primaryAddress" placeholder="Address" onChange = {(e) => setPrimaryAddress(e.target.value.trim())} /></div>
                            <div className="col-10 form-group ">
                                <div className="col-12 form-control">
                                    <input className="col-9 col-md-9 col-lg-10 passwordfield" type={ (primary_password_eye_icon=== "ion-eye") ? "password" : "text"} name="primaryPassword" placeholder="Password" onFocus={() => setError1({"display":"none","msg":""})} onBlur={validatePrimaryPassword} onChange = {(e) => setPrimaryPassword(e.target.value.trim())} />
                                    <i className="col-3 col-md-3 col-lg-2" className={primary_password_eye_icon} onClick={() => (primary_password_eye_icon == "ion-eye") ? set_primary_password_eye_icon("ion-eye-disabled") : set_primary_password_eye_icon("ion-eye")} ></i>
                                </div>
                            </div>
                            <div className="col-10 form-group ">
                                <div className="col-12 form-control">
                                    <input className="col-9 col-md-9 col-lg-10 passwordfield" type={ (primary_confirm_password_eye_icon=== "ion-eye") ? "password" : "text"} name="confirmPrimaryPassword" placeholder="Confirm Password" onFocus={() => setError1({"display":"none","msg":""})}  onBlur={validatePrimaryPassword} onChange = {(e) => setConfirmPassword(e.target.value.trim())} />
                                    <i className="col-3 col-md-3 col-lg-2" className={primary_confirm_password_eye_icon} onClick={() => (primary_confirm_password_eye_icon == "ion-eye") ? set_primary_confirm_password_eye_icon("ion-eye-disabled") : set_primary_confirm_password_eye_icon("ion-eye")} ></i>
                                </div>
                            </div>
                            <div className="col-8 form-group" style={{display:error1["display"], color:"red", align:"right"}}>{error1["msg"]}</div>

                        </div>
                    </div>
{/* 
                    <div className="row justify-content-center">
                        <h3 className="col-10">Secondary Contact <hr className="col-11 divider"/></h3>
                    </div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-10 form-group"><input className="form-control"  type="text" name="secondaryName" placeholder="Name" onChange = {(e) => setSecondaryName(e.target.value.trim())}/></div>
                            <div className="col-10 form-group"><input className="col-12 form-control" type="text" name="secondaryTitle" placeholder="Title" onChange = {(e) => setSecondaryTitle(e.target.value.trim())} /></div>
                            <div className="col-5 form-group"><input className="col-12 form-control" type="text" name="secondaryPhoneNumber" placeholder="Phone Number" onChange = {(e) => setSecondaryPhoneNumber(e.target.value.trim())} /></div>
                            <div className="col-5 form-group"><input className="col-12 form-control" type="text" name="secondaryMobile" placeholder="Mobile" onChange = {(e) => setSecondaryMobile(e.target.value.trim())} /></div>
                            <div className="col-10 form-group"><input className="col-12 form-control" type="text" name="secondaryEmail" placeholder="Email" onChange = {(e) => setSecondaryEmail(e.target.value.trim())} /></div>
                            <div className="col-10 form-group"><input className="col-12 form-control" type="text" name="secondaryUsername" placeholder="Username" onChange = {(e) => setSecondaryUsername(e.target.value.trim())} /></div>
                            <div className="col-10 form-group"><input className="col-12 form-control" type="text" name="secondaryAddress" placeholder="Address" onChange = {(e) => setSecondaryAddress(e.target.value.trim())} /></div>
                            <div className="col-10 form-group ">
                                <div className="col-12 form-control">
                                    <input className="col-9 col-md-9 col-lg-10 passwordfield" type={ (secondary_password_eye_icon=== "ion-eye") ? "password" : "text"} name="secondaryPassword" placeholder="Password" onFocus={() => setError2({"display":"none","msg":""})} onBlur={validateSecondaryPassword}   onChange = {(e) => setSecondaryPassword(e.target.value.trim())} />
                                    <i className="col-3 col-md-3 col-lg-2" className={secondary_password_eye_icon} onClick={() => (secondary_password_eye_icon == "ion-eye") ? set_secondary_password_eye_icon("ion-eye-disabled") : set_secondary_password_eye_icon("ion-eye")} ></i>
                                </div>
                            </div>
                            <div className="col-10 form-group ">
                                <div className="col-12 form-control">
                                    <input className="col-9 col-md-9 col-lg-10 passwordfield" type={ (secondary_confirm_password_eye_icon=== "ion-eye") ? "password" : "text"} name="confirmSecondaryPassword" placeholder="Confirm Password" onFocus={() => setError2({"display":"none","msg":""})}  onBlur={validateSecondaryPassword} onChange = {(e) => setConfirmSecondaryPassword(e.target.value.trim())} />
                                    <i className="col-3 col-md-3 col-lg-2" className={secondary_confirm_password_eye_icon} onClick={() => (secondary_confirm_password_eye_icon == "ion-eye") ? set_secondary_confirm_password_eye_icon("ion-eye-disabled") : set_secondary_confirm_password_eye_icon("ion-eye")} ></i>
                                </div>
                            </div>
                            <div className="col-8 form-group" style={{display:error2["display"], color:"red", align:"right"}}>{error2["msg"]}</div>
                        </div>
                    </div> */}

                </div> {/*End main container*/}
                {/* Register Button */}
                
                    <div className="col-12 form-group"><button disabled={disableRegBtn} className="col-8 offset-2 btn btn-primary btn-block" style={{backgroundColor:"rgba(35, 48, 24, 1)"}} onClick={submitHandler}>Register</button></div>
                    <label className="col-12 already">You already have an account? <a href="#" onClick={moveToLoginHandler}>Login here.</a></label>                       
                    <script src="../assets/js/jquery.min.js"></script>
                    <script src="../assets/bootstrap/js/bootstrap.min.js"></script>
            {/*End registration form */}
            </div> 
            </>
}
export default RegistrationForm;