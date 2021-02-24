import React, { useState } from 'react';
import '../../assets/bootstrap/css/bootstrap.min.css';
import '../../assets/fonts/ionicons.min.css';
import './../../assets/css/Dashboard.css';


function Profile () {

    var today = new Date();
    var date = String(today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate());

    var [companyName, setCompanyName] = useState('');
    var [address, setAddress] = useState('');
    var [town, setTown] = useState('');
    var [state, setState] = useState ('');
    var [country, setCountry] = useState('');
    var [billingEmail, setBillingEmail] = useState('');
    var [password, setPassword] = useState('');
// ion-eye-disabled
    var [passwordIcon, setPasswordIcon] = useState("ion-eye");

    const addPlanHandler = () =>{
    }
    const selectDateHandler = (date) => {

    }

    return <div className="dashboard">
                <div className="container">
                    <div className="row top-buffer">        
                        <div className="col-12 col-md-9 col-lg-9 col-xl-9  offset-xl-3 offset-lg-3 offset-md-3 offset-0 card">
                            <div className="card-body float-left">
                                <form onSubmit={addPlanHandler}>
                                    <div className="row my-2">
                                        <div className="col-12"><input className="form-control"  type="text" placeholder="Company Name" onChange={e => setCompanyName(e.target.value)}/></div>
                                    </div>

                                    <div className="row my-3">
                                        <div className="col-12" ><textarea rows="3" className="form-control" style={{resize: "none"}} type="text" placeholder="Address" onChange={e => setAddress(e.target.value)} ></textarea></div>
                                    </div>

                                    <div className="row my-3">
                                        <div className="col-12"><input className="form-control"  type="text" placeholder="Town" onChange={e => setTown(e.target.value)}/></div>
                                    </div>

                                    <div className="row my-3">
                                        <div className="col-12"><input className="form-control"  type="text" placeholder="State" onChange={e => setState(e.target.value)}/></div>
                                    </div>

                                    <div className="row my-3">
                                        <div className="col-12"><input className="form-control"  type="text" placeholder="Country" onChange={e => setCountry(e.target.value)}/></div>
                                    </div>

                                    <div className="row my-3">
                                        <div className="col-12"><input className="form-control"  type="text" placeholder="Billing Email" onChange={e => setBillingEmail(e.target.value)}/></div>
                                    </div>

                                    <div className="row my-3">
                                        <div className="col-12">
                                            <div className="col-12 form-control">
                                                <input style={{border:"none", outline:"none"}} type="Password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                                                <i className={passwordIcon + " float-right"} onClick={() => passwordIcon ===  "ion-eye" ? setPasswordIcon("ion-eye-disabled"): setPasswordIcon("ion-eye") }></i>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <button className="btn btn-primary text-center float-right add-user-btn" >Update</button>
                                </form>
                        </div>
                    </div>
                </div>
            </div>
            <script src="../assets/js/jquery.min.js"></script>
            <script src="../assets/bootstrap/js/bootstrap.min.js"></script>
            </div>


}
export default Profile;