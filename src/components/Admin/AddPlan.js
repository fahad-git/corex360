import React, { useState } from 'react';
import '../../assets/bootstrap/css/bootstrap.min.css';
import '../../assets/fonts/ionicons.min.css';
import 'rc-datepicker/lib/style.css';
import './../../assets/css/UserManagement.css';

import {DatePickerInput } from 'rc-datepicker';

function AddPlan () {

    var today = new Date();
    var date = String(today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate());

    var [planName, setPlanName] = useState('');
    var [startDate, setStartDate] = useState('');
    var [endDate, setEndDate] = useState('');
    var [description, setDescription] = useState ('');
    var [selectedStartDate, setSelectedStartDate] = useState(date);
    var [selectedEndDate, setSelectedEndDate] = useState(date);

    const addPlanHandler = () =>{
    }
    const selectDateHandler = (date) => {

    }

    return <div className="userManagement">
                <div className="container">
                    <form onSubmit={addPlanHandler}>

                        <div className="row">
                            <div className="col-12"><input className="form-control"  type="text" placeholder="Plan Name" onChange={e => setPlanName(e.target.value)}/></div>
                        </div>

                        <div className="row" style={{marginTop:"10px"}}>
                            <DatePickerInput
                                onChange={e => setSelectedStartDate(e.target.value)}
                                placeholder="Start Date"
                                className='col-12 my-custom-datepicker-component'
                                />                         
                        </div>

                        <div className="row" style={{marginTop:"10px"}}>
                            <DatePickerInput
                                onChange={e => setSelectedEndDate(e.target.value)}
                                placeholder="End Date"
                                className='col-12 my-custom-datepicker-component'
                                />                         
                        </div>

                        <div className="row" style={{marginTop:"10px"}}>
                            <div className="col-12" ><textarea rows="3" className="form-control"  type="text" placeholder="Description" onChange={e => setDescription(e.target.value)} > </textarea></div>
                        </div>

                        <button className="btn btn-primary text-center float-right add-user-btn" >Save</button>
                    </form>
                </div>
            <script src="../assets/js/jquery.min.js"></script>
            <script src="../assets/bootstrap/js/bootstrap.min.js"></script>
            </div>


}
export default AddPlan;