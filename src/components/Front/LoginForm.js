import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

import '../../assets/bootstrap/css/bootstrap.min.css';
import '../../assets/fonts/ionicons.min.css';
import '../../assets/css/LoginForm.css';
import { Authenticate } from './../Services/Auth';
import { useUserContext } from './../UserContext';
import USER, { REGISTER_MODAL_OPEN, TOGGLE_HEADER, FORGET_PASSWORD_MODAL_OPEN, LOGIN_MODAL_CLOSE } from '../Actions/user';

function LoginForm(props) {

    const history = useHistory();

    const {state, dispatch} = useUserContext();

    var [headerName, setHeaderName] = useState(props.headerName)
    var [userName, setUserName] = useState("");
    var [password, setPassword] = useState("");
    var [errorMessage, setErrorMessage] = useState(["none",""]);

    const updateUserName = (e) => setUserName(e.target.value);
    const updatePassword = (e) => setPassword(e.target.value);

    const validateFormData = (event) => {
        event.preventDefault();

        setErrorMessage(["none",""]);

        setUserName(userName.trim());
        setPassword(password.trim());

        Authenticate({"username": userName, "password":password})
        .then(res => {     
            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify(res.data));
            // Here actions are dispatched
            dispatch({type:USER, payload:res.data})
            dispatch({type:LOGIN_MODAL_CLOSE})
            if(res.data.role == "super admin"){
                dispatch({type:TOGGLE_HEADER, header:"ADMIN"})
                history.push("/dashboard");
            }else{
                dispatch({type:TOGGLE_HEADER, header:"USER"})
                history.push("/corex-board/dashboard");
            }
        }).catch(err => {
            setErrorMessage(["block","Invalid username or password"]);
        });
    }


    const registerUser = () => {
        dispatch({type:REGISTER_MODAL_OPEN});
    }

    const forgetPassword = () => {
        // alert("Password Forgotten") 
        dispatch({type:FORGET_PASSWORD_MODAL_OPEN})
    }

    return <div>
                <div className="login-dark">
                    <form onSubmit={validateFormData}> 
                        <h3 className="bar"><center>LOGIN TO <br/> {headerName}</center></h3>
                        <div className="illustration"><i className="icon ion-ios-locked-outline"></i></div>
                        <div className="row form-group">
                            <i className="col-1 ion-person"></i>
                            <input className="col-10 form-control" type="text" name="username" placeholder="Username" onChange = {updateUserName} /></div>
                        <div className="row form-group">
                            <i className="col-1 icon ion-ios-locked-outline"></i>
                            <input className="col-10 form-control" type="password" name="password" placeholder="Password" onChange = {updatePassword} />
                        </div>
                        <a className="forgot" href="#" onClick ={forgetPassword} style={{textAlign: "right"}}>Forgot password?</a>

                        <div className="form-group"><button className="btn btn-primary btn-block" type="submit">Log In</button></div>
                        
                        <div className="forgot" style={{color:"red", display:errorMessage[0]}} > {errorMessage[1]} </div>

                        <a className="forgot" href="#" onClick ={registerUser} ><i>Not an account? </i><b>Register Now</b></a>
                        
                    </form>
                </div>
                <script src="assets/js/jquery.min.js"></script>
                <script src="assets/bootstrap/js/bootstrap.min.js"></script>

            </div>
}

export default LoginForm;





// class LoginForm extends React.Component{

//     constructor(props){
//         super(props)
//         this.state = {username:"", password:""};
//     }
    

//     validateFormData = (event) => {
//         event.preventDefault();
//         console.log(JSON.stringify(this.state));
//         let username = this.state.username;
//         let password = this.state.password;

//         username = username.trim();
//         password = password.trim();

//         // alert("Current state " + JSON.stringify(this.state))
//         if(username === "" ){
//             alert("username can not be null")
//             return;
//         }else if (password === "" ){
//             alert("password can not be null")
//             return;
//         }       

//         var passwordHash = require('password-hash');

//         var hashedPassword = passwordHash.generate(password);

//         console.log(hashedPassword)

//         this.setState({password:hashedPassword});
        
//         console.log(JSON.stringify(this.state));


//         if(username === "admin" && password === "admin"){
//             this.props.history.push('/admin');
//         }else if(username === "director" && password === "director"){
//             this.props.history.push('/director');
//         }else if(username === "clinician1" && password === "clinician1"){
//             this.props.history.push('/clinician');
//         }

//         return;
//     }


//     onValueChange = (event) => {
//         let name = event.target.name;
//         let val = event.target.value;
//         this.setState({[name]:val})
//     }

//     registerUser = () => {
//         // alert("Register User Here!")
//         this.props.history.push('register');
//     }

//     forgetPassword = () => {
//         alert("Password Forgotten") 
//     }

//     render (){

//         return (

//             <div>
//                 <div className="login-dark">
//                     <form onSubmit={this.validateFormData}> 
//                         <h2 className="sr-only">Login Form</h2>
//                         <div className="illustration"><i className="icon ion-ios-locked-outline"></i></div>
//                         <div className="form-group"><input className="form-control" type="text" name="username" placeholder="Username" onChange = {this.onValueChange} /></div>
//                         <div className="form-group"><input className="form-control" type="password" name="password" placeholder="Password" onChange = {this.onValueChange} /></div>
//                         <div className="form-group"><button className="btn btn-primary btn-block" type="submit">Log In</button></div>
//                         <a className="forgot" href="#" onClick ={this.forgetPassword}>Forgot username or password?</a>
//                         <br/>
//                         <a className="forgot" href="#" onClick ={this.registerUser} ><b>Register Your Clinic</b><br/><i>Try free for 30 days</i></a>
                        
//                     </form>
//                 </div>
//                 <script src="assets/js/jquery.min.js"></script>
//                 <script src="assets/bootstrap/js/bootstrap.min.js"></script>
  
//             </div>
//         );

//     }
// }

// export default LoginForm;