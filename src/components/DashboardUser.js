/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import openSocket from "socket.io-client";
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Modal,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import "./../assets/css/DashboardUser.css";

import {
  GetAllEmployeesByCompanyId,
  ChangeEmployeeCurrentStatus,
} from "./Services/CorexBoard";

import Select, { components } from "react-select";
import { useUserContext } from "./UserContext";
import USER, { PROFILE_MODAL_CLOSE } from "./Actions/user";
import { ToastContainer, toast } from "react-toastify";
import Profile from "./Profile";
import axios from "axios";
import { SOCKET_URL } from "./Config";


const CurrentStatusMapping = {
  1: "Available",
  2: "Absent",
  3: "With Customer",
  4: "Break",
};

function getKeyByValue(value) {
  return Object.keys(CurrentStatusMapping).find(
    (key) => CurrentStatusMapping[key] === value
  );
}

const { Option } = components;

const CustomSelectOption = (props) => (
  <Option {...props}>
    <i className="ion-record" style={{ color: props.data.color }} />
    <label className="ml-3"> {props.data.label} </label>
  </Option>
);

const CustomSelectValue = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { State, dispatch } = useUserContext();

  useEffect(() => {
    //     ChangeAdminCurrentStatus({"adminId":user.adminId, "status": parseInt(getKeyByValue(props.data.label)) })
    //     .then(res =>{

    //         var usr = JSON.parse(localStorage.getItem("user"));
    //         usr.currentStatus = getKeyByValue(props.data.label);
    //         localStorage.setItem("user",JSON.stringify(usr));
    //         dispatch({type:USER, payload:usr})

    //         // toast("Status Updated", {type:"info"});
    //     }).catch(err => {
    //         props.data.label = "";
    //         toast("Status Update failed", {type:"error"});
    //     })
    // }else{

    ChangeEmployeeCurrentStatus({
      employeeId: user?.employeeId,
      status: parseInt(getKeyByValue(props.data.label)),
    })
      .then((res) => {
        var usr = JSON.parse(localStorage.getItem("user"));
        usr.currentStatus = getKeyByValue(props.data.label);
        localStorage.setItem("user", JSON.stringify(usr));
        dispatch({ type: USER, payload: usr });
      })
      .catch((err) => {
        props.data.label = "";
        toast("Status Update failed", { type: "error" });
      });
  }, [props.data.label]);

  return (
    <div>
      <i className="ion-record" style={{ color: props.data.color }} />
      <label className="ml-3"> {props.data.label} </label>
    </div>
  );
};

const options = [
  { value: "Available", label: "Available", color: "green" },
  { value: "Absent", label: "Absent", color: "gray" },
  { value: "With Customer", label: "With Customer", color: "blue" },
  { value: "Break", label: "Break", color: "yellow" },
];

function DashboardUser() {
  var [admins, setAdmins] = useState([]);
  var [employees, setEmployees] = useState([]);
  var [allEmployeesView, setAllEmployeesView] = useState([]);
  var [allEmployees, setAllEmployees] = useState([]);

  var [myStatus, setMyStatus] = useState();
  var [activeClass, setActiveClass] = useState({});
  var [common, setCommon] = useState({
    backgroundColor: "white",
    color: "black",
    outline: "none",
    border: "none",
  });

  const { state, dispatch } = useUserContext();

  const user = JSON.parse(localStorage.getItem("user"));

  const colorLookup = {
    1: "green",
    2: "black",
    3: "blue",
    4: "yellow",
  };

  const setStatusHandler = (statusCode) => {
    //  Because status start from 1 and options from 0
    // setMyStatus(options[status - 1]);
    // switch(status){
    //     case "Available":
    //         setMyStatus(options[0]);
    //         break;
    //     case "Absent":
    //         setMyStatus(options[1]);
    //         break;
    //     case "With Customer":
    //         setMyStatus(options[2]);
    //         break;
    //     case "Break":
    //         setMyStatus(options[3]);
    //         break;
    // }
    setMyStatus(statusCode);
    switch (statusCode) {
      case 1:
        setActiveClass({
          backgroundColor: "green",
          color: "white",
          outline: "none",
          border: "none",
        });
        break;

      case 2:
        setActiveClass({
          backgroundColor: "gray",
          color: "white",
          outline: "none",
          border: "none",
        });
        break;

      case 3:
        setActiveClass({
          backgroundColor: "blue",
          color: "white",
          outline: "none",
          border: "none",
        });
        break;

      case 4:
        setActiveClass({
          backgroundColor: "yellow",
          color: "white",
          outline: "none",
          border: "none",
        });
        break;
    }
    return;
  };
  const filterHandler = (e) => {
    if (!e.target.value) {
      setAllEmployees(allEmployeesView);
      return;
    }

    let arr = allEmployeesView.filter((currentValue, index, arr) => {
      return currentValue.currentStatus == e.target.value;
    });
    console.log(arr);
    setAllEmployees(arr);
  };

  useEffect(() => {
    const socket = openSocket(SOCKET_URL);
    socket.on("status", (data) => {
      if (data.action == "update") {
        GetAllEmployeesByCompanyId()
          .then((response) => {
            setAllEmployees(response.data);
            setAllEmployeesView(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    setStatusHandler(user?.currentStatus);
    GetAllEmployeesByCompanyId()
      .then((response) => {
        setAllEmployees(response.data);
        setAllEmployeesView(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // GetAllAdminsByCompanyId()
    // .then(res => {
    //     console.log(res.data);
    //     console.log(response.data);
    //     setAdmins(res.data);
    //     let arr = [...res.data, ...response.data];
    //     setAllEmployees(arr)
    //     setAllEmployeesView(arr)
    // }).catch(err =>{
    //     console.log(err);
    // })
  }, []);

  const changeStatusHandler = (statusCode) => {
    ChangeEmployeeCurrentStatus({
      employeeId: user.employeeId,
      status: statusCode,
    })
      .then((res) => {
        axios
          .put(SOCKET_URL, { status: statusCode })
          .then((res) => {
            console.log("Status updated!");
          })
          .catch((err) => console.log(err));
        var usr = JSON.parse(localStorage.getItem("user"));
        usr.currentStatus = statusCode;
        localStorage.setItem("user", JSON.stringify(usr));
        dispatch({ type: USER, payload: usr });
        setStatusHandler(statusCode);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Modal 1 this modal is for profile*/}
      <Modal
        show={state.profile}
        onHide={() => dispatch({ type: PROFILE_MODAL_CLOSE })}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="login-modal"
      >
        <Modal.Header closeButton>
          <h1 className="text-center w-100">Profile</h1>
        </Modal.Header>
        <Modal.Body>{<Profile />}</Modal.Body>
      </Modal>

      <Container className="dashboard-user">
        <Row className="my-5">
          <Col>
            <h2 className="text-center heading">Dashboard </h2>
          </Col>
        </Row>
        {/* <Row className="my-5">
                    <Col xs={12} sm={5}>
                        <div className="user-info-box px-3 mt-3">
                            <h3>Name: {user.employeeName }</h3>
                            <h4>Title: {user.position}</h4>
                        </div>
                    </Col>
                    <Col></Col>
                    <Col xs={12} sm="auto">
                        <div className="user-info-box px-3 mt-3">
                            <h3>Position: {1}</h3>
                            <h4>Total Available: {25}</h4>
                        </div>
                    </Col>
                </Row> */}
        <Row>
          <Col xs={12} sm={5}>
            <Form.Group controlId="exampleForm.SelectCustom">
              {/* <Form.Label><center>Availability Status</center></Form.Label>
                            <Form.Control as="select" className="col-10" custom>
                            <option>Available</option>
                            <option>Absent</option>
                            <option>With Customer</option>
                            <option>Break</option>
                            </Form.Control>
                            <i className="col-2 ion-record"></i> */}
              <Form.Label>
                <center>My Status</center>
              </Form.Label>
              {/* <Select
                            className="select-status"
                            options={options}
                            placeholder={myStatus ? <CustomSelectValue data = {myStatus} />  : ""}
                            components={{ Option: CustomSelectOption, SingleValue: CustomSelectValue}}
                            /> */}

              <Row>
                <Col>
                  <ToggleButtonGroup
                    size="md"
                    name="status"
                    type="radio"
                    value={myStatus}
                    onChange={changeStatusHandler}
                  >
                    <ToggleButton
                      name="status"
                      id="tbg-btn-1"
                      value={1}
                      style={myStatus == 1 ? activeClass : common}
                    >
                      <i className="ion-ios-checkmark float-right">
                        {" "}
                        Available
                      </i>
                    </ToggleButton>
                    <ToggleButton
                      name="status"
                      id="tbg-btn-2"
                      value={2}
                      style={myStatus == 2 ? activeClass : common}
                    >
                      <i className="ion-close-circled float-right">
                        {"  "}
                        Absent
                      </i>
                    </ToggleButton>
                    <ToggleButton
                      name="status"
                      id="tbg-btn-3"
                      value={3}
                      style={myStatus == 3 ? activeClass : common}
                    >
                      <i className="ion-person-stalker float-right">
                        {"  "}
                        With Customer
                      </i>
                    </ToggleButton>
                    <ToggleButton
                      name="status"
                      id="tbg-btn-4"
                      value={4}
                      style={myStatus == 4 ? activeClass : common}
                    >
                      <i className="ion-android-time float-right">
                        {"  "}
                        Break
                      </i>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Col>
              </Row>
            </Form.Group>
          </Col>
          <Col></Col>
          <Col xs={12} sm="auto">
            <Form>
              <Form.Group
                controlId="exampleForm.SelectCustom"
                onChange={filterHandler}
              >
                <Form.Label>
                  <center>Filter</center>
                </Form.Label>
                <br />
                <Form.Control as="select" className="select-status" custom>
                  <option value="">No Filter</option>
                  <option value={1}>Available</option>
                  <option value={2}>Absent</option>
                  <option value={3}>With Customer</option>
                  <option value={4}>Break</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col>
            <Table responsive="sm" striped bordered hover variant="dark">
              <thead fixed="true">
                <tr className="text-center">
                  <th>Name</th>
                  {/* <th>Roll</th> */}
                  {/* <th>Email</th> */}
                  <th>Status</th>
                  <th>Flag</th>
                </tr>
              </thead>
              <tbody>
                {/* {
                            admins.map( admin => (
                                // admin.adminId == user.adminId? <tr key={"admin" + admin.adminId}></tr> :
                                <tr key={"admin" + admin.adminId}>
                                    <td>{admin.adminName}</td>
                                    <td>{admin.title}</td>
                                    <td>{admin.email}</td>
                                    <td>{CurrentStatusMapping[admin.currentStatus] }</td>
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
                                    <td>{CurrentStatusMapping[employee.currentStatus]}</td>
                                    <td className="text-center"><i className="ion-record" style={{color:colorLookup[employee.currentStatus]}} ></i></td>
                                </tr>
                        ))} */}
                {allEmployees.map((employee) => (
                  <tr
                    key={"employee" + employee.employeeId}
                    style={{
                      border:
                        employee.employeeId == user.employeeId
                          ? "2px solid"
                          : "none",
                    }}
                  >
                    <td>{employee.employeeName}</td>
                    {/* <td>{employee.position}</td> */}
                    {/* <td>{employee.email}</td> */}
                    <td>{CurrentStatusMapping[employee.currentStatus]}</td>
                    <td className="text-center">
                      <i
                        className="ion-record"
                        style={{ color: colorLookup[employee.currentStatus] }}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DashboardUser;
