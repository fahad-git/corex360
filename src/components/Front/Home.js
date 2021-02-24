import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './../../assets/css/BasicComponents.css';
import './../../assets/bootstrap/css/bootstrap.min.css';

import {Modal} from 'react-bootstrap';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';

/*
Dark green #233018 rgba(35, 48, 24, 1)
Background #B8B28C rgba(184, 178, 140, 1)
Main heading writing color #EEEDEE
Lines color #6D7D67
Ek white
font Astro Armada Expanded
https://ionicons.com/v2/
*/

function Home(props){


    var setHeader = props.setHeader;
    setHeader(true);

    var [isRegistrationFormModalOpen, toggleRegistrationFormModal] = useState(false);
    var [isLoginModalOpen, toggleLoginModal] = useState(false);

    const login_btn_click_handler = () => {
        //    history.push('/login');
        toggleLoginModal(true);
    }

    
    const register_btn_click_handler = () => {
            // history.push('/register');
            toggleRegistrationFormModal(true)
            // alert("ok");
     }

    return <div className="home">
                {/* Modals */}
                {/* Modal 1 this modal is for RegistrationForm*/}
                <Modal show={isRegistrationFormModalOpen}
                       onHide = {()=> { toggleRegistrationFormModal(false)}}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="register-modal"
                >
                    <Modal.Header className="jumbotron">
                        <h3 className="col-12 bar"><center>REGISTER TO<br/>COREX PLANNING</center></h3>
                    </Modal.Header>
                    <Modal.Body >
                        {<RegistrationForm />}
                    </Modal.Body>
                </Modal>

                {/* Modal 2 this modal is for Login*/}
                <Modal show={isLoginModalOpen}
                       onHide = {()=> { toggleLoginModal(false)}}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="login-modal"
                >
                        {<LoginForm setHeader = {setHeader} />}
                 </Modal>
                <h1>COREX</h1>
                <h1 style={ {letterSpacing : "15px"}}>PLANNING</h1>
                <p>Planning Management Service</p>
                <div className="home_button">
                    <button onClick={login_btn_click_handler} className="home_btn_login" >Login</button>
                    <button onClick={register_btn_click_handler} className="home_btn_register" >Register</button>
                </div>
            </div>
}

export default Home;