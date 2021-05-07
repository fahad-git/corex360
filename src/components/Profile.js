import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import PassField from "./Controls/PassField";

function Profile(){

    const user = JSON.parse(localStorage.getItem("user"));

    var [disableFields, setDisableFields] = useState(true)
    var [showChangePass, toggleChangePass] = useState(false);

    const styles = {
        error: {
            color:"red",
        }
    }

    const { register, watch, handleSubmit, formState: { errors }, formState, setValue } = useForm();  
    // const { register:register2, handleSubmit:handleSubmit2, formState: { errors:errors2 } } = useForm();  


    const onSubmit = data => {
        console.log(data)
        setDisableFields(true);
        toast("Profile Updated", {type:"success", autoClose:"1000"})
    }

    const passwordHandler = data => {
        console.log(data);
    }

    useEffect(() => {
        setValue('name', user.role == "admin" ? user.adminName : user.employeeName);
        setValue('title', user.title)
        setValue('email', user.email)
        setValue('phone', user.phoneNo)
        setValue('mobile', user.mobile)

    }, [])

    return  <>
            <Container>
                
                <Form onSubmit={handleSubmit(onSubmit)}>

                <Row>
                    <Col sm={{span:12, offset:0}}>
                        <Button style={{display: disableFields ? "block" : "none"}} className="float-right"  size="lg" variant="dark" onClick={() => setDisableFields(false)}>
                            Edit
                        </Button>

                        <Button size="lg" style={{display: disableFields ? "none" : "block"}} className="float-right"  variant="dark" type="submit">
                            Update
                        </Button>
                    </Col>
                </Row>

                 <Form.Group as={Row} controlId="formBasicName">
                    <Col sm={{span:12, offset:0}}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control disabled={disableFields} name="name" type="text" value = {formState.name} {...register("name" ,  {required:true, minLength:3})} />
                        {errors.name?.type === "required" && <div style={styles.error}>{"⚠ This field is mandatory."} </div> }
                        {errors.name?.type === "minLength" && <div style={styles.error}>{"⚠ Your input is less than minimum length"} </div> }                             
                    </Col>
                </Form.Group>   

                <Form.Group as={Row} controlId="formBasicTitle">
                    <Col sm={{span:12, offset:0}}>
                        <Form.Label>Title</Form.Label>
                        <Form.Control disabled={disableFields} name="title" type="text" value = {formState.title} {...register("title" ,  {required:true, minLength:3})} />
                        {errors.title?.type === "required" && <div style={styles.error}>{"⚠ This field is mandatory."} </div> }
                        {errors.title?.type === "minLength" && <div style={styles.error}>{"⚠ Your input is less than minimum length"} </div> }                             
                    </Col>
                </Form.Group> 

                <Form.Group as={Row} controlId="formBasicEmail">
                    <Col sm={{span:12, offset:0}}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control disabled={disableFields} name="email" type="email" value = {formState.email} {...register("email",  {required:true, minLength:3})} />
                        {errors.email?.type === "required" && <div style={styles.error}>{"⚠ This field is mandatory."} </div> }
                        {errors.email?.type === "minLength" && <div style={styles.error}>{"⚠ Your input is less than minimum length"} </div> }                             
                    </Col>
                </Form.Group>   

                <Form.Group as={Row} controlId="formBasicPhone">
                    <Col sm={{span:12, offset:0}}>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control disabled={disableFields} name="phone" type="text"  value = {formState.phone}   {...register("phone", {required:true, minLength:3})} />
                        {errors.phone?.type === "required" && <div style={styles.error}>{"⚠ This field is mandatory."} </div> }
                        {errors.phone?.type === "minLength" && <div style={styles.error}>{"⚠ Your input is less than minimum length"} </div> }                             
                    </Col>
                </Form.Group>   


                <Form.Group as={Row} controlId="formBasicMobile">
                    <Col sm={{span:12, offset:0}}>
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control disabled={disableFields} name="mobile" type="text"  value = {formState.mobile} {...register("mobile" ,  {required:true, minLength:3})} />
                        {errors.mobile?.type === "required" && <div style={styles.error}>{"⚠ This field is mandatory."} </div> }
                        {errors.mobile?.type === "minLength" && <div style={styles.error}>{"⚠ Your input is less than minimum length"} </div> }                             
                    </Col>
                </Form.Group>   



                <Button variant="link" onClick={ () => toggleChangePass(!showChangePass)}>Change Password</Button>

                {/* <Form onSubmit={handleSubmit2(passwordHandler)} id="Pass-form">

                    <Form.Group as={Row} controlId="formBasicPassword">
                        <Col sm={{span:10, offset:1}}>
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control name="oldPassword" type="password" placeholder="Type here..." {...register2("oldPassword" ,  {required:true, minLength:3})} />
                            {errors2.oldPassword?.type === "required" && <div style={styles.error}>{"⚠ This field is mandatory."} </div> }
                            {errors2.oldPassword?.type === "minLength" && <div style={styles.error}>{"⚠ Your input is less than minimum length"} </div> }                             
                        </Col>
                    </Form.Group>   
                </Form> */}

              
                </Form>
                <Form.Group as={Row} controlId="formBasicPassChange">
                    <Col xs={{span:12, offset:0}} sm={{span:12, offset:0}}>
                        <PassField display = {showChangePass}/>
                    </Col>
                </Form.Group>
            </Container>
            </>

}
export default Profile;