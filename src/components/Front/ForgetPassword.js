import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

import '../../assets/bootstrap/css/bootstrap.min.css';
import '../../assets/fonts/ionicons.min.css';
import '../../assets/css/LoginForm.css';
import { Authenticate } from './../Services/Auth';
import { useUserContext } from './../UserContext';
import USER, { FORGET_PASSWORD_MODAL_CLOSE, LOGIN_MODAL_OPEN, REGISTER_MODAL_OPEN, TOGGLE_HEADER } from '../Actions/user';

import {toast} from 'react-toastify';

function ForgetPassword() {

    const history = useHistory();

    const {state, dispatch} = useUserContext();

    var [emailAddress, setEmailAddress] = useState("");
    var [errorMessage, setErrorMessage] = useState(["none",""]);

    const emailAddressHandler = (e) => setEmailAddress(e.target.value);

    const validateFormData = (event) => {
        event.preventDefault();

        setErrorMessage(["none",""]);
        toast("Email link has sent check email", {
            type:"success",
            onClose: () => dispatch({type:FORGET_PASSWORD_MODAL_CLOSE})
        })
        // Authenticate({"email":emailAddress})
        // .then(res => {     
        //     toast("Email link has sent check email", {
        //         type:"success",
        //         onClose: () => dispatch({type:FORGET_PASSWORD_MODAL_CLOSE})
        //     })
        // }).catch(err => {
        //     setErrorMessage(["block","Invalid email address"]);
        // });
    }


    const loginHandler = () => {
        dispatch({type:LOGIN_MODAL_OPEN});
    }

    return <div>
                <div className="login-dark">
                    <form onSubmit={validateFormData}> 
                        <h3 className="bar"><center>Forget Password</center></h3>
                        <div className="illustration"><i className="icon ion-ios-locked-outline"></i></div>
                        <div className="row form-group">
                        <input className="col-12 form-control" type="text" name="username" placeholder="Enter your email" onChange = {emailAddressHandler} /></div>
                        <div className="form-group"><button className="btn btn-primary btn-block" type="submit">Send Email</button></div>                        
                        <div className="forgot" style={{color:"red", display:errorMessage[0]}} > {errorMessage[1]} </div>                        
                        <a className="forgot" href="#" onClick ={loginHandler} style={{textAlign: "center"}}>Login</a>
                    </form>
                </div>
                <script src="assets/js/jquery.min.js"></script>
                <script src="assets/bootstrap/js/bootstrap.min.js"></script>

            </div>
}

export default ForgetPassword;
