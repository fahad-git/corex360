import {useEffect, useState} from 'react';
import './../assets/css/Dashboard.css';
import {Container, Modal, Button, Row, Col, Form} from 'react-bootstrap';

import AddUser from './Admin/AddUser';

import sales_user_icon from './../assets/img/sales_user_icon.png';
import admin_icon from './../assets/img/admin_icon.png';

import {GetAllEmployeesByCompanyId} from './Services/CorexBoard';

import SearchField from "react-search-field";
import AddEmployee from './AddEmployee';
import EmployeeProfile from "./EmployeeProfile";

function EmployeeManagement(){

    var [searchQuery, setSearchQuery] = useState('');
    var [usersInformation, setUsersInformation] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    var [isAddUserOpen, addUserToggle] = useState(false);
    var [isEmployeeProfileOpen, employeeProfileToggle] = useState(false);
    var [employeeProfile, setEmployeeProfile] = useState();

    const searchHandler = (val) => {
        console.log("Search: ", val)
    }
    
    const userInfoHandler = (employeeId) => {
        console.log("From Handler");
        setEmployeeProfile(<EmployeeProfile employeeId = {employeeId} />)
        employeeProfileToggle(true);
    }

    const addUserHandler = () => {
        addUserToggle(!isAddUserOpen);
    }

    const onChangerFilter = (e) => {
        console.log(e.target.value);
    }

    useEffect(() => {
        GetAllEmployeesByCompanyId()
        .then(res => {
            setUsersInformation(res.data);
        }).catch(err =>{
            console.log(err);
        })

    }, [])

    return  <div className="dashboard">
                {/* Modals */}
                {/* Modal 1 this modal is for RegistrationForm*/}
                <Modal show={isAddUserOpen}
                       onHide = {e => addUserToggle(false)}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                    <Modal.Header className="jumbotron" >
                        <h3 className="col-12"><center>ADD EMPLOYEE</center></h3>
                    </Modal.Header>
                    <Modal.Body >
                        {<AddEmployee/>}
                    </Modal.Body>
                </Modal>

                {/* Modal 2 this modal is for Employee Profile*/}
                <Modal show={isEmployeeProfileOpen}
                onHide = {e => employeeProfileToggle(false)}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                    <Modal.Header className="jumbotron" >
                        <h3 className="col-12"><center>ADD EMPLOYEE</center></h3>
                    </Modal.Header>
                    <Modal.Body >
                        {employeeProfile}
                    </Modal.Body>
                </Modal>


                <Container>
                    <Row className="mb-5">
                        <Col >
                            <h2 className="text-center heading">Employee Management </h2>
                        </Col>
                    </Row>

                    <Row className="my-5">
                        <Col>
                            <Form>
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    {/* <Form.Label>Custom select</Form.Label> */}
                                    <Form.Control as="select" onChange={onChangerFilter} custom>
                                        <option>All Employees</option>
                                        <option>Active Employees</option>
                                        <option>Block Employees</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col>
                        <SearchField
                            placeholder="Search..."
                            onSearchClick={searchHandler}
                            searchText="Type here"
                            classNames="test-class"
                            style={{width:"100%"}}
                            />
                        </Col>
                        <Col>
                            <Button variant="secondary" className="float-right" onClick={addUserHandler}>Add Employee</Button>
                        </Col>
                    </Row>

                    <Container>
                        <Row className="justify-content-center align-items-center">
                            <Col>
                                {usersInformation.map( ({employeeId, employeeName, position, email, address, currentStatus, phoneNo, companyId}, index)=>{
                                return (
                                        <div  key={"userInfo" + index} className="col-6 col-sm-4 col-md-3 col-lg-2 offset-0" style={{float:"left", marginTop:"20px", cursor:"pointer", display: (employeeId == user.employeeId) ? "none" : "block"}} onClick={() => userInfoHandler(employeeId)}>
                                            <div className="card tile" style={{backgroundColor:"#424242"}}>
                                                <img alt="Not found" className="usericon" src={admin_icon} />
                                            </div>                                                                  
                                            <label className="card align-text-center" style={{textAlign:"center"}}>{employeeName}</label>                                               
                                        </div>
                                        )
                                })}
                            </Col>
                        </Row>
                    </Container>
                </Container>

    </div>       
}
export default EmployeeManagement;