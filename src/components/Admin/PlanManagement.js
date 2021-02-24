import {useState} from 'react';
import 'rc-datepicker/lib/style.css';
import './../../assets/css/Dashboard.css';
import './../../assets/css/PlanManagement.css';

import {Modal} from 'react-bootstrap';
import {DatePickerInput } from 'rc-datepicker';

import AddPlan from './AddPlan';

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
const fontSizeValue = "calc(2px + 2vmin)";


const tmp = [{
    "name":"Plan1",
    "sdate":"10-1-2021",
    "edate":"12-1-2021",
    "description":"This is description",
    "status":"60%",

},{
    "name":"Plan2",
    "sdate":"10-1-2021",
    "edate":"12-1-2021",
    "description":"This is description",
    "status":"20%"
},{
    "name":"Plan3",
    "sdate":"10-1-2021",
    "edate":"12-1-2021",
    "description":"This is description",
    "status":"92%"
},{
    "name":"Plan4",
    "sdate":"10-1-2021",
    "edate":"12-1-2021",
    "description":"This is description",
    "status":"20%"
},{
    "name":"Plan5",
    "sdate":"10-1-2021",
    "edate":"12-1-2021",
    "description":"This is description",
    "status":"92%"
},{
    "name":"Plan1",
    "sdate":"10-1-2021",
    "edate":"12-1-2021",
    "description":"This is description",
    "status":"60%",

},{
    "name":"Plan2",
    "sdate":"10-1-2021",
    "edate":"12-1-2021",
    "description":"This is description",
    "status":"20%"
},{
    "name":"Plan3",
    "sdate":"10-1-2021",
    "edate":"12-1-2021",
    "description":"This is description",
    "status":"92%"
},{
    "name":"Plan4",
    "sdate":"10-1-2021",
    "edate":"12-1-2021",
    "description":"This is description",
    "status":"20%"
},{
    "name":"Plan5",
    "sdate":"10-1-2021",
    "edate":"12-1-2021",
    "description":"This is description",
    "status":"92%"
}]


function PlanManagement () {
    
    var today = new Date();
    var date = String(today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate());

    var [selectedDate, setSelectedDate] = useState(date);

    var [searchQuery, setSearchQuery] = useState('');
    var [plansInformation, setPlansInformation] = useState(tmp);

    var [isAddPlanOpen, addPlanToggle] = useState(false);

    const searchHandler = () => {
        console.log("Search")
    }

    const addPlanHandler = () => {
        addPlanToggle(!isAddPlanOpen);
    }

    const getAllPlanHandler = () => {
        console.log("Hello");
        // console.log(screen.width);

    }

    const selectDateHandler = (date) => {
        console.log(date)
    }

    return  <div className="dashboard planmanagement">
                {/* Modals */}
                {/* Modal 1 this modal is for RegistrationForm*/}
                <Modal show={isAddPlanOpen}
                       onHide = {e => addPlanToggle(false)}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="register-modal"
                >
                    <Modal.Header className="jumbotron">
                        <h3 className="col-12 bar"><center>ADD Plan</center></h3>
                    </Modal.Header>
                    <Modal.Body >
                        {<AddPlan/>}
                    </Modal.Body>
                </Modal>

                <div className="container">
                    <div className="row" >
                        <div className="col-12 offset-0" >
                            {/* this is add new patient button  */}
                            <button className="btn btn-primary text-left float-right add-user-btn" onClick={addPlanHandler}>Add Plan</button>
                        </div>
                    </div>

                    <div className="row top-buffer">        
                        <div className="col-12 col-md-9 col-lg-9 col-xl-9  offset-xl-3 offset-lg-3 offset-md-3 offset-0 card">
                            <div className="card-body float-left">
                                <div className="row align-item-center">
                                    <div className="col-12 col-sm-4 col-md-4 col-lg-6 col-xl-6">
                                        {/* this is add new patient button  */}
                                        <button className="btn btn-primary text-left float-left add-user-btn" onClick={getAllPlanHandler}>All Plans</button>
                                    </div>

                                    <div className="col-12 col-sm-4 col-md-4 col-lg-3 col-xl-3">
                                        {/* // this renders the full component (input and datepicker) */}
                                        <DatePickerInput className="col-12 date-picker"
                                        onChange={selectDateHandler}
                                        value={selectedDate}
                                        className='my-custom-datepicker-component'
                                        />
                                    </div>
                                    <div className="col-12 col-sm-4 col-md-4 col-lg-3 col-xl-3">
                                        {/* // this renders the full component (input and datepicker) */}
                                        <DatePickerInput className="col-12 date-picker"
                                        onChange={selectDateHandler}
                                        value={selectedDate}
                                        className='my-custom-datepicker-component'
                                        />
                                    </div>

                                    {/* <div className="col-12 col-sm-3 col-md-1 col-lg-2">
                                        <i className="ion-ios-search-strong" onClick={searchHandler}></i>
                                    </div> */}
                                </div>
                                
                                <div className="row top-buffer">        
                                    <div className="col-12 card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-12 header">
                                                    <b>Plans</b>
                                                    <hr/> 
                                                </div>
                                            </div>

                                            <div className="row justify-content-center subheader">
                                                <div className="col-2" style={{fontSize:fontSizeValue}}>Plan Name </div>
                                                <div className="col-2" style={{fontSize:fontSizeValue}}>Start Date</div>
                                                <div className="col-2" style={{fontSize:fontSizeValue}}>End Date </div>
                                                <div className="col-4" style={{fontSize:fontSizeValue}}>Description </div>
                                                <div className="col-2" style={{fontSize:fontSizeValue}}>Status </div>
                                            </div>
                                            <hr className="divider"/>   

                                            {/* Here wil go dynamic UI */}
                                            {plansInformation.map( ({name, sdate, edate, description, status}, index) => {
                                                return <div key={index} className="row justify-content-center align-item-center " style={{marginTop:"20px"}}>
                                                    <div className="col-2" style={{fontSize:fontSizeValue}}>{name} </div>
                                                    <div className="col-2" style={{fontSize:fontSizeValue}}>{sdate}</div>
                                                    <div className="col-2" style={{fontSize:fontSizeValue}}>{edate} </div>
                                                    <div className="col-4" style={{fontSize:fontSizeValue}}>{description} </div>
                                                    <div className="col-2" style={{fontSize:fontSizeValue}}>{status} </div>
                                                </div>                                    
                                            })}
                                        </div>
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
export default PlanManagement;  