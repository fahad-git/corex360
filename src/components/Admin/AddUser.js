import React, { useState } from 'react';
import '../../assets/bootstrap/css/bootstrap.min.css';
import '../../assets/fonts/ionicons.min.css';
import './../../assets/css/UserManagement.css';

function AddUser () {

    var [userAccountName, setUserAccountName] = useState('');
    var [userRole, setUserRole] = useState('');
    var [email, setEmail] = useState('');
    var [phone, setPhone] = useState ('');


    const addUserHandler = () =>{

    }

    return <div className="userManagement">
                <div className="container">
                    <form onSubmit={addUserHandler}>

                        <div className="row no-gutters">
                            <div className="col-4"><label className="form-control">Name</label></div>
                            <div className="col-8" style={{padding: "0px 10px"}}><input className="form-control"  type="text" placeholder="Type name" onChange={e => setUserAccountName(e.target.value)}/></div>
                        </div>

                        <div className="row no-gutters" style={{marginBottom:"10px"}}>
                                 <div className="col-12"  >
                                    <select className="form-control" onChange={e => setUserRole(e.target.value)} style={{width:"97%"}}>
                                        <option value="" defaultValue>Role</option>
                                        <option value="2" className="add-user-role" >Admin</option>
                                        <option value="3" className="add-user-role" >Sub Admin</option>
                                        <option value="4" className="add-user-role" >Admin User</option>
                                        <option value="5 restrictions" className="add-user-role">Sales User</option>
                                    </select>
                                 </div>
                        </div>

                        <div className="row no-gutters">
                            <div className="col-4"><label className="form-control">Email</label></div>
                            <div className="col-8" style={{padding: "0px 10px"}} ><textarea rows="1" className="form-control" style={{resize: "none"}} type="text" placeholder="Type email" onChange={e => setEmail(e.target.value)}/></div>
                        </div> 

                        <div className="row no-gutters">
                            <div className="col-4"><label className="form-control">Phone</label></div>
                            <div className="col-8" style={{padding: "0px 10px"}} ><input  className="form-control"  type="text" placeholder="Type phone" onChange={e => setPhone(e.target.value)}/></div>
                        </div>

                        <button className="btn btn-primary text-center float-right add-user-btn" >Add User</button>
                    </form>
                </div>
            <script src="../assets/js/jquery.min.js"></script>
            <script src="../assets/bootstrap/js/bootstrap.min.js"></script>
            </div>


}
export default AddUser;