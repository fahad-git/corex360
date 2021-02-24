import {useState} from 'react';
import './../../assets/css/Dashboard.css';
import {Modal} from 'react-bootstrap';

import AddUser from './AddUser';

import sales_user_icon from '../../assets/img/sales_user_icon.png';
import admin_icon from '../../assets/img/admin_icon.png';


/*
Dark green #233018 rgba(35, 48, 24, 1)
Background #B8B28C rgba(184, 178, 140, 1)
Main heading writing color #EEEDEE
Lines color #6D7D67
Ek white
font Astro Armada Expanded

For Icons
https://ionicons.com/v2/
*/

const background_color = "rgba(184, 178, 140, 1)";
const darkColor = "rgba(35, 48, 24, 1)";

let clinic1 = {
    "userAccountName":"User 1",
    "id":"User1",
    "status":"Active",
    };

let clinic2 = {
    "userAccountName":"User 2",
    "id":"User2",
    "status":"Active",
    };

let clinic3 = {
        "userAccountName":"User 3",
        "id":"User3",
        "status":"Blocked",
        };

let clinic4 = {
        "userAccountName":"User 4",
        "id":"User4",
        "status":"Active",
        };


let clinic5 = {
        "userAccountName":"User 5",
        "id":"User5",
        "status":"Active",
        };

let clinic6 = {
        "userAccountName":"User 6",
        "id":"User6",
        "status":"Blocked",
        };

let clinic7 = {
        "userAccountName":"User 7",
        "id":"User7",
        "status":"Active",
        };


// const active_clinic = [clinic1, clinic2, clinic4, clinic5, clinic7]; 
// const blocked_clinic = [clinic3, clinic6]; 
const elems = [clinic1,  clinic2, clinic3, clinic4, clinic5, clinic6, clinic7];

function UserManagement () {
    

    var [searchQuery, setSearchQuery] = useState('');
    var [usersInformation, setUsersInformation] = useState(elems);

    var [isAddUserOpen, addUserToggle] = useState(false);

    const searchHandler = () => {
        console.log("Search")
    }
    
    const userInfoHandler = (id) => {
        console.log("From Handler");
    }

    const addUserHandler = () => {
        addUserToggle(!isAddUserOpen);
    }

    return  <div className="dashboard">
                {/* Modals */}
                {/* Modal 1 this modal is for RegistrationForm*/}
                <Modal show={isAddUserOpen}
                       onHide = {e => addUserToggle(false)}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="register-modal"
                >
                    <Modal.Header className="jumbotron">
                        <h3 className="col-12 bar"><center>ADD USER</center></h3>
                    </Modal.Header>
                    <Modal.Body >
                        {<AddUser/>}
                    </Modal.Body>
                </Modal>

                <div className="container">
                    <div className="row" >
                        <div className="col-12 offset-0" >
                            {/* this is add new patient button  */}
                            <button className="btn btn-primary text-left float-right add-user-btn" onClick={addUserHandler}>Add User</button>
                        </div>
                    </div>

                    <div className="row top-buffer">        
                        <div className="col-12 col-md-9 col-lg-9 col-xl-9  offset-xl-3 offset-lg-3 offset-md-3 offset-0 card">
                            <div className="card-body float-left">
                                <div className="row align-item-center">
                                    <div className="col-12 col-sm-6">
                                        <select className="btn btn-primary dropdown-toggle drop-down-class" type="button">
                                            <option className="dropoptions"  defaultValue>All Users</option>
                                            <option className="dropoptions" value="Active Clinics">Active Users</option>
                                            <option className="dropoptions" value="Blocked Clinics">Blocked Users</option>
                                        </select>
                                    </div>

                                    <div className="col-12 col-sm-6 pull-right">

                                   
                                        <div className="search-bar form-control">
                                         <input type="text" style={{outline:"none", border:"none"}} onChange={e => setSearchQuery(e.target.value)} />
                                        <i className="ion-ios-search-strong" onClick={searchHandler}></i>
                                        </div>

                                    </div>
                                </div>

                            <div className="row justify-content-center align-items-center top-buffer">
                                <div className="col-12">
                                    {usersInformation.map( ({userAccountName, id, status}, index)=>{
                                    return (
                                            <div key={"userInfo" + index} className="col-6 col-sm-4 col-md-3 col-lg-2 offset-0" style={{float:"left", marginTop:"20px"}} onClick={() => userInfoHandler(id)}>
                                                <div className="card tile" >
                                                    <img alt="Not found" className="usericon" src={(status === "Active") ? admin_icon : sales_user_icon} />
                                                </div>                                                                  
                                                <label className="card align-text-center" style={{textAlign:"center"}}>{userAccountName}</label>                                               
                                            </div>
                                            )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

                {/* Footer */}
                <div className="top-buffer"></div>
            </div>
       
}
export default UserManagement;  