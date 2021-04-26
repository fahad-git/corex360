import React, { useEffect, useState} from 'react';
import { Container, Row, Col, Table, Form, Modal, ModalBody } from "react-bootstrap";
import './../assets/css/DashboardUser.css'

import { GetAllEmployeesByCompanyId, GetAllAdminsByCompanyId, ChangeAdminCurrentStatus, ChangeEmployeeCurrentStatus } from './Services/CorexBoard';


import Select, { components } from 'react-select'
import { useUserContext } from './UserContext';
import USER, { PROFILE_MODAL_CLOSE } from './Actions/user';
import { ToastContainer, toast } from 'react-toastify';
 
import Profile from "./Profile";

const { Option } = components

const CustomSelectOption = props => (
  <Option {...props}>
    <i className="ion-record" style={{color:props.data.color}}/>
    <label className="ml-3"> {props.data.label} </label>
  </Option>
)

const CustomSelectValue = props => {
    
    const user = JSON.parse(localStorage.getItem("user"));
    const {State, dispatch} = useUserContext();

    useEffect(() => {

        if(user.role == "admin"){
            ChangeAdminCurrentStatus({"adminId":user.adminId, "status": props.data.label})
            .then(res =>{

                var usr = JSON.parse(localStorage.getItem("user"));
                usr.currentStatus = props.data.label;
                localStorage.setItem("user",JSON.stringify(usr));
                dispatch({type:USER, payload:usr})

                // toast("Status Updated", {type:"info"});

            }).catch(err => {
                props.data.label = "";
                toast("Status Update failed", {type:"error"});
            })
        }else{
            ChangeEmployeeCurrentStatus({"employeeId":user.employeeId, "status": props.data.label})
            .then(res =>{
                
                var usr = JSON.parse(localStorage.getItem("user"));
                usr.currentStatus = props.data.label;
                localStorage.setItem("user",JSON.stringify(usr));
                dispatch({type:USER, payload:usr})

            }).catch(err => {
                props.data.label = "";
                toast("Status Update failed", {type:"error"});
            })
        }
    },[props.data.label]);

    return(
        <div>
            <i className="ion-record" style={{color:props.data.color}}/>
            <label className="ml-3"> {props.data.label} </label>
        </div>
        )
    }

    const options = [
    { value: 'Available', label: 'Available', color: 'green' },
    { value: 'Absent', label: 'Absent', color: 'gray' },
    { value: 'With Customer', label: 'With Customer', color: 'blue' },
    { value: 'Break', label: 'Break', color: 'yellow' }

    ]

    function DashboardUser() {

        var [admins, setAdmins] = useState([]);
        var [employees, setEmployees] = useState([]);

        var [myStatus, setMyStatus] = useState(options[0]);

        const {state, dispatch} = useUserContext();

        const user = JSON.parse(localStorage.getItem("user"));

        const colorLookup = {
        "Available":"green",
        "Absent":"black",
        "With Customer":"blue",
        "Break":"yellow"
        }

        const setStatusHandler = (status) => {
            switch(status){
                case "Available":
                    setMyStatus(options[0]);
                    break;
                case "Absent":
                    setMyStatus(options[1]);
                    break;
                case "With Customer":
                    setMyStatus(options[2]);
                    break;
                case "Break":
                    setMyStatus(options[3]);
                    break;
            }
            return null;
        }

    useEffect(() => {
        
        setStatusHandler(user.currentStatus);
        GetAllEmployeesByCompanyId()
        .then(res => {
            console.log(res.data);
            setEmployees(res.data);
        }).catch(err =>{
            console.log(err);
        })

        GetAllAdminsByCompanyId()
        .then(res => {
            console.log(res.data);
            setAdmins(res.data);
        }).catch(err =>{
            console.log(err);
        })

    }, [])

    return  <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
            
               {/* Modal 1 this modal is for profile*/}
               <Modal show={state.profile}
                      onHide = { ()=> dispatch({type:PROFILE_MODAL_CLOSE})}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="login-modal"
                >
                    <Modal.Header closeButton>
                        <h1 className="text-center w-100">Profile</h1>
                    </Modal.Header>
                    <Modal.Body>
                        {<Profile />}
                    </Modal.Body>
                 </Modal>   

            <Container className="dashboard-user">
                <Row className="my-5">
                    <Col >
                        <h2 className="text-center heading">Dashboard </h2>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col>
                        <h3>{user.adminName }</h3>
                        <h4>{user.title}</h4>
                    </Col>
                    <Col></Col>
                    <Col>
                        <Form.Group controlId="exampleForm.SelectCustom">
                            {/* <Form.Label><center>Availability Status</center></Form.Label>
                            <Form.Control as="select" className="col-10" custom>
                            <option>Available</option>
                            <option>Absent</option>
                            <option>With Customer</option>
                            <option>Break</option>
                            </Form.Control>
                            <i className="col-2 ion-record"></i> */}
                        <Select
                            options={options}
                            placeholder={<CustomSelectValue data = {myStatus}/>}
                            components={{ Option: CustomSelectOption, SingleValue: CustomSelectValue}}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Col>
                    <Table responsive="sm" striped bordered hover variant="dark">
                        <thead fixed="true">
                        <tr className="text-center">
                            <th>Name</th>
                            <th>Roll</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Flag</th> 
                        </tr>
                        </thead>
                        <tbody>
                        {
                            admins.map( admin => (
                                // admin.adminId == user.adminId? <tr key={"admin" + admin.adminId}></tr> :
                                <tr key={"admin" + admin.adminId}>
                                    <td>{admin.adminName}</td>
                                    <td>{admin.title}</td>
                                    <td>{admin.email}</td>
                                    <td>{admin.currentStatus}</td>
                                    <td className="text-center"><i className="ion-record" style={{color:colorLookup[admin.currentStatus]}} ></i></td>
                                </tr>
                        ))}
                        {
                            employees.map( employee => (
                                // employee.employeeId == user.employeeId? <tr key={"employee" + employee.employeeId}></tr>:
                                <tr key={"employee" + employee.employeeId}>
                                    <td>{employee.employeeName}</td>
                                    <td>{employee.position}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.currentStatus}</td>
                                    <td className="text-center"><i className="ion-record" style={{color:colorLookup[employee.currentStatus]}} ></i></td>
                                </tr>
                        ))}
                        </tbody>
                    </Table>
                    </Col>
                </Row>
            </Container>
            </>
}

export default DashboardUser;