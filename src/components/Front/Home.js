import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './../../assets/css/BasicComponents.css';
import './../../assets/bootstrap/css/bootstrap.min.css';

import {Modal} from 'react-bootstrap';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import { ToastContainer } from 'react-toastify';
import { useUserContext } from '../UserContext';
import { LOGIN_MODAL_OPEN, LOGIN_MODAL_CLOSE, 
    REGISTER_MODAL_OPEN, REGISTER_MODAL_CLOSE,
    FORGET_PASSWORD_MODAL_OPEN, FORGET_PASSWORD_MODAL_CLOSE } from '../Actions/user';
import ForgetPassword from './ForgetPassword';


/*
Dark green #233018 rgba(35, 48, 24, 1)
Background #B8B28C rgba(184, 178, 140, 1)
Main heading writing color #EEEDEE
Lines color #6D7D67
Ek white
font Astro Armada Expanded
https://ionicons.com/v2/
*/

function Home(){

    const {state, dispatch} = useUserContext();

    var [isRegistrationFormModalOpen, toggleRegistrationFormModal] = useState(false);
    var [isLoginModalOpen, toggleLoginModal] = useState(false);

    const login_btn_click_handler = () => {
        //    history.push('/login');
        // toggleLoginModal(true);
        dispatch({type:LOGIN_MODAL_OPEN})
    }

    
    const register_btn_click_handler = () => {
            // history.push('/register');
            dispatch({type:REGISTER_MODAL_OPEN})

            // toggleRegistrationFormModal(true)
            // alert("ok");
     }


    return <>
            <div className="home">
                {/* Modals */}
                {/* Modal 1 this modal is for RegistrationForm*/}
                <Modal show={state.registerModal}
                       onHide = {()=> { dispatch({type:REGISTER_MODAL_CLOSE} )}}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="register-modal"
                >
                    <Modal.Header className="jumbotron">
                        <h3 className="col-12 bar"><center>REGISTER TO<br/>CORAX 360</center></h3>
                    </Modal.Header>
                    <Modal.Body >
                        {<RegistrationForm />}
                    </Modal.Body>
                </Modal>

                {/* Modal 2 this modal is for Login*/}
                <Modal show={state.loginModal}
                       onHide = {()=> { dispatch({type:LOGIN_MODAL_CLOSE})}}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="login-modal"
                >
                        {<LoginForm headerName="CORAX 360" />}
                 </Modal>   

                {/* Modal 3 this modal is for forget password*/}
                <Modal show={state.forgetPassword}
                       onHide = {()=> { dispatch({type:FORGET_PASSWORD_MODAL_CLOSE})}}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="login-modal"
                >
                        {<ForgetPassword />}
                 </Modal>   

                <ToastContainer
                containerId="container1"
                position="top-left"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />

                <h1 style={ {letterSpacing : "15px"}} >CORAX 360</h1>
                <p>Business Management Service</p>
                <div className="home_button">
                    <button onClick={login_btn_click_handler} className="home_btn_login" >Login</button>
                    {/* <button onClick={register_btn_click_handler} className="home_btn_register" >Register</button> */}
                </div>
            </div>
            </>
}

export default Home;