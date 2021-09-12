import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Form, Container, Row, Button, Col, Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./../assets/css/BasicComponents.css";

import { RegisterEmployee } from "./Services/CorexBoard";

function AddEmployee() {
  const {
    register,
    watch,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm();
  const user = JSON.parse(localStorage.getItem("user"));

  const onSubmit = async (data) => {
    const today = new Date();

    let obj = {
      // "employees": null,
      // "superAdmin": null,
      username: data["username"],
      password: data["password"],
      status: "Active",
      roleId: parseInt(data["roleId"]),
    };
    delete data["username"];
    delete data["password"];
    delete data["roleId"];

    data["login"] = obj;
    data["currentStatus"] = 1;
    data["currentStatusDate"] = today.toISOString();
    data["companyId"] = user.companyId;
    RegisterEmployee(data)
    .then(res => {
        toast("Registered Successfully!", {type:"success", onClose: () => window.location.reload()})
    }).catch(err => {
        toast("Registration failed! try again later", {type:"error"})
    })

    console.log(data);

    // {
    //     "employeeName": "wajahat rajput",
    //     "phoneNo": "3456879809",
    //     "email": "wajahat@gmail.com",
    //     "mobileNo": "0321677890",
    //     "position": "User",
    //     "address": "sukkur",
    //     "currentStatus":1,
    //     "currentStatusDate": today.toISOString(),
    //     "login":{
    //         "employees": null,
    //         "superAdmin": null,
    //         "username": "wajahat",
    //         "password": "wajahat123",
    //         "status": "Active",
    //         "roleId": 3
    //     },
    //     "companyId":1
    // }
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group as={Row} controlId="formBasicName">
            {/* <Form.Label>Email address</Form.Label> */}
            <Col sm={{ span: 12 }}>
              <Form.Control
                name="employeeName"
                type="text"
                placeholder="Employee Name"
                {...register("employeeName", { required: true, minLength: 3 })}
              />
              {errors.employeeName?.type === "required" && (
                <div className="error">{"This field is mandatory."} </div>
              )}
              {errors.employeeName?.type === "minLength" && (
                <div className="error">
                  {"Your input is less than minimum length"}{" "}
                </div>
              )}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formBasicEmail">
            {/* <Form.Label>Password</Form.Label> */}
            <Col sm={{ span: 12 }}>
              <Form.Control
                name="email"
                type="email"
                placeholder="Email"
                {...register("email", { required: true, minLength: 3 })}
              />
              {errors.email?.type === "required" && (
                <div className="error">{"This field is mandatory."} </div>
              )}
              {errors.email?.type === "minLength" && (
                <div className="error">
                  {"Your input is less than minimum length"}{" "}
                </div>
              )}
            </Col>
          </Form.Group>

          {/* To create this field workable basically I have called a Controller component
           *   Controller component is responsible to integrate third party Libraries/APIs
           *   with the useForm hook.
           */}
          {/* <Form.Control name="phone" type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="Phone ex. 071-56-223" ref={register}/> */}
          {/* <Form.Group as={Row} controlId="formBasicPhoneNo">
                         <Form.Label>Password</Form.Label> 
                        <Col sm={{span:12}}>
                            <Form.Control name="phoneNo" type="text" placeholder="Phone" {...register("phoneNo",{required: true, minLength:3  })} />
                                {errors.phoneNo?.type === "required" && <div className="error">{"This field is mandatory."} </div> }
                                {errors.phoneNo?.type === "minLength" && <div className="error">{"Your input is less than minimum length"} </div> }                             
                        </Col>
                    </Form.Group> */}

          <Form.Group as={Row} controlId="formBasicMobile">
            <Col sm={{ span: 12 }} className="phone-field">
              <Controller
                control={control}
                name="mobileNo"
                defaultValue=""
                rules={{ required: true }}
                render={({ field: { name, onBlur, onChange, value, ref } }) => (
                  <PhoneInput
                    country={"us"}
                    name={name}
                    value={value}
                    onBlur={onBlur}
                    // onChange pass the raw value so you can access it using e instead of
                    // e.target.value. props.onChange can accept the value directly
                    onChange={onChange}
                    inputRef={ref}
                  />
                )}
              />
              {errors.mobileNo?.type === "required" && (
                <div className="error">{"This field is mandatory."} </div>
              )}
              {errors.mobileNo?.type === "minLength" && (
                <div className="error">
                  {"Write you number in complete format"}{" "}
                </div>
              )}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formBasicSelect">
            <Col sm={{ span: 12 }}>
              <Controller
                control={control}
                name="roleId"
                rules={{ required: true }}
                render={({ field: { name, onBlur, onChange, value, ref } }) => (
                  <Form.Control
                    as="select"
                    onChange={onChange}
                    custom
                  >
                    <option value="">Select Role</option>
                    <option value={2}>Admin</option>
                    <option value={3}>Super User</option>
                    <option value={4}>User</option>
                  </Form.Control>
                )}
              />
              {errors.roleId?.type === "required" && (
                <div className="error">{"This field is mandatory."} </div>
              )}
            
            </Col>
          </Form.Group>

          {/* <Form.Group as={Row} controlId="formBasicPosition">
                        <Col sm={{span:12}}>
                            <Form.Control name="position" type="text" placeholder="Position" {...register("position", {required: true, minLength:2  })}  />
                                {errors.position?.type === "required" && <div className="error">{"This field is mandatory."} </div> }
                                {errors.position?.type === "minLength" && <div className="error">{"Your input is less than minimum length"} </div> }                             
                        </Col>
                    </Form.Group>  */}

          {/* <Form.Group as={Row} controlId="formBasicAddress">
                        <Col sm={{span:12}}>
                            <Form.Control name="address" as="textarea" rows={3} type="text" placeholder="Address" {...register("address", {required: true, minLength:3  })}  />
                                {errors.address?.type === "required" && <div className="error">{"This field is mandatory."} </div> }
                                {errors.address?.type === "minLength" && <div className="error">{"Your input is less than minimum length"} </div> }                             
                        </Col>
                    </Form.Group>  */}

          <Form.Group as={Row} controlId="formBasicUsername">
            <Col sm={{ span: 12 }}>
              <Form.Control
                name="username"
                type="text"
                placeholder="Username"
                {...register("username", { required: true, minLength: 3 })}
              />
              {errors.username?.type === "required" && (
                <div className="error">{"This field is mandatory."} </div>
              )}
              {errors.username?.type === "minLength" && (
                <div className="error">
                  {"Your input is less than minimum length"}{" "}
                </div>
              )}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formBasicPassword">
            <Col sm={{ span: 12 }}>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                {...register("password", { required: true, minLength: 3 })}
              />
              {errors.password?.type === "required" && (
                <div className="error">{"This field is mandatory."} </div>
              )}
              {errors.password?.type === "minLength" && (
                <div className="error">
                  {"Your input is less than minimum length"}{" "}
                </div>
              )}
            </Col>
          </Form.Group>
          <Row>
            <Col>
              <Button variant="dark" type="submit" block>
                ADD
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}
export default AddEmployee;
