import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import PassField from "./Controls/PassField";

import { GetEmployeeById } from "./Services/CorexBoard";

const CurrentStatusMapping = {
    1: "Available",
    2: "Absent",
    3: "With Customer",
    4: "Break",
  };

function EmployeeProfile(props){

    var [disableFields, setDisableFields] = useState(true)
    var [employee, setEmployee] = useState();

    const styles = {
        error: {
            color:"red",
        }
    }

    const { register, watch, handleSubmit, formState: { errors }, formState, setValue } = useForm();  

    const onSubmit = data => {
        console.log(data)
        setDisableFields(true);
        toast("Profile Updated", {type:"success", autoClose:"1000"})
    }

    useEffect(() => {
        GetEmployeeById(props.employeeId)
        .then(res => {
            console.log(res.data);
            setEmployee(res.data)
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    if(!employee) return <div>Loading...</div>

    return  <>
            <Container>
                
                <Form onSubmit={handleSubmit(onSubmit)}>
                 <Form.Group as={Row} controlId="formBasicName">
                    <Col sm={{span:12, offset:0}}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control disabled={disableFields} name="name" type="text" value = {employee?.employeeName} {...register("name" ,  {required:true, minLength:3})} />
                        {errors.name?.type === "required" && <div style={styles.error}>{"⚠ This field is mandatory."} </div> }
                        {errors.name?.type === "minLength" && <div style={styles.error}>{"⚠ Your input is less than minimum length"} </div> }                             
                    </Col>
                </Form.Group>   

                {/* <Form.Group as={Row} controlId="formBasicTitle">
                    <Col sm={{span:12, offset:0}}>
                        <Form.Label>Position</Form.Label>
                        <Form.Control disabled={disableFields} name="title" type="text" value = {employee?.position} {...register("title" ,  {required:true, minLength:3})} />
                        {errors.title?.type === "required" && <div style={styles.error}>{"⚠ This field is mandatory."} </div> }
                        {errors.title?.type === "minLength" && <div style={styles.error}>{"⚠ Your input is less than minimum length"} </div> }                             
                    </Col>
                </Form.Group>  */}

                <Form.Group as={Row} controlId="formBasicEmail">
                    <Col sm={{span:12, offset:0}}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control disabled={disableFields} name="email" type="email" value = {employee?.email} {...register("email",  {required:true, minLength:3})} />
                        {errors.email?.type === "required" && <div style={styles.error}>{"⚠ This field is mandatory."} </div> }
                        {errors.email?.type === "minLength" && <div style={styles.error}>{"⚠ Your input is less than minimum length"} </div> }                             
                    </Col>
                </Form.Group>   

                {/* <Form.Group as={Row} controlId="formBasicPhone">
                    <Col sm={{span:12, offset:0}}>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control disabled={disableFields} name="phone" type="text"  value = {employee?.phoneNo}   {...register("phone", {required:true, minLength:3})} />
                        {errors.phone?.type === "required" && <div style={styles.error}>{"⚠ This field is mandatory."} </div> }
                        {errors.phone?.type === "minLength" && <div style={styles.error}>{"⚠ Your input is less than minimum length"} </div> }                             
                    </Col>
                </Form.Group>    */}


                <Form.Group as={Row} controlId="formBasicMobile">
                    <Col sm={{span:12, offset:0}}>
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control disabled={disableFields} name="mobile" type="text"  value = {employee?.mobileNo} {...register("mobile" ,  {required:true, minLength:3})} />
                        {errors.mobile?.type === "required" && <div style={styles.error}>{"⚠ This field is mandatory."} </div> }
                        {errors.mobile?.type === "minLength" && <div style={styles.error}>{"⚠ Your input is less than minimum length"} </div> }                             
                    </Col>
                </Form.Group>   

                {/* <Form.Group as={Row} controlId="formBasicAddress">
                    <Col sm={{span:12, offset:0}}>
                        <Form.Label>Address</Form.Label>
                        <Form.Control disabled={disableFields} as="textarea" rows={3} name="address" type="text"  value = {employee?.address} {...register("address" ,  {required:true, minLength:3})} />
                        {errors.address?.type === "required" && <div style={styles.error}>{"⚠ This field is mandatory."} </div> }
                        {errors.address?.type === "minLength" && <div style={styles.error}>{"⚠ Your input is less than minimum length"} </div> }                             
                    </Col>
                </Form.Group>    */}

                <Form.Group as={Row} controlId="formBasicCurrentStatus">
                    <Col sm={{span:12, offset:0}}>
                        <Form.Label>Current Status</Form.Label>
                        <Form.Control disabled={disableFields} type="text"  value = {CurrentStatusMapping[employee?.currentStatus] || ""} {...register("mobile" ,  {required:true, minLength:3})} />
                        {errors.mobile?.type === "required" && <div style={styles.error}>{"⚠ This field is mandatory."} </div> }
                        {errors.mobile?.type === "minLength" && <div style={styles.error}>{"⚠ Your input is less than minimum length"} </div> }                             
                    </Col>
                </Form.Group>   

                <Row>
                    <Col>
                        <Button variant="dark" className="float-right">Block</Button>
                    </Col>
                </Row>
                </Form>
            </Container>
            </>

}
export default EmployeeProfile;