import React, {useState, useRef} from 'react';
import { useHistory } from 'react-router-dom';
import {Form, Container, Row, Button, Col, Modal} from 'react-bootstrap';
import { Controller, useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


function AddEmployee(){

    const { register, watch, handleSubmit, control, setError, formState: { errors } } = useForm();

    const onSubmit = async data => {
        console.log(data)
    }
    return  <>
                <Container>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                
                    <Form.Group as={Row} controlId="formBasicName">
                        {/* <Form.Label>Email address</Form.Label> */}
                        <Col sm={{span:12}}>
                            <Form.Control name="name" type="text" placeholder="Employee Name" {...register("name", {required: true, minLength:3  })} />
                                {errors.name?.type === "required" && <div className="error">{"This field is mandatory."} </div> }
                                {errors.name?.type === "minLength" && <div className="error">{"Your input is less than minimum length"} </div> }                             
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formBasicEmail">
                        {/* <Form.Label>Password</Form.Label> */}
                        <Col sm={{span:12}}>
                            <Form.Control name="email" type="email" placeholder="Email" {...register("email",{required: true, minLength:7  })} />
                                {errors.email?.type === "required" && <div className="error">{"This field is mandatory."} </div> }
                                {errors.email?.type === "minLength" && <div className="error">{"Your input is less than minimum length"} </div> }                             
                        </Col>
                    </Form.Group>

                    

                    {/* To create this field workable basically I have called a Controller component
                    *   Controller component is responsible to integrate third party Libraries/APIs 
                    *   with the useForm hook.
                    */}
                    {/* <Form.Control name="phone" type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="Phone ex. 071-56-223" ref={register}/> */}
                    <Form.Group as={Row} controlId="formBasicPhone">
                        <Col sm={{span:12}}>
                            <Controller
                            name="phone"
                            {...register("phone",{required: true, minLength:3 })}
                            rules={{ required: true }}
                            control={control}
                            defaultValue=""
                            render={({ name, onBlur, onChange, value }) => (
                                <PhoneInput
                                country = {'us'}
                                name={name}
                                value={value}
                                onBlur={onBlur}
                                // onChange pass the raw value so you can access it using e instead of
                                // e.target.value. props.onChange can accept the value directly
                                onChange={onChange}      
                                />
                            )}
                            
                            />
                            {errors.phone?.type === "required" && <div className="error">{"This field is mandatory."} </div> }
                            {errors.phone?.type === "minLength" && <div className="error">{"Write you number in complete format"} </div> }                             
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formBasicAddress">
                        <Col sm={{span:12}}>
                            <Form.Control name="address" type="text" placeholder="Address" {...register("address", {required: true, minLength:7  })}  />
                                {errors.address?.type === "required" && <div className="error">{"This field is mandatory."} </div> }
                                {errors.address?.type === "minLength" && <div className="error">{"Your input is less than minimum length"} </div> }                             
                        </Col>
                    </Form.Group> 

                    <Form.Group as={Row} controlId="formBasicAddress">
                        <Col sm={{span:12}}>
                            <Form.Control name="address" type="text" placeholder="Address" {...register("address", {required: true, minLength:7  })}  />
                                {errors.address?.type === "required" && <div className="error">{"This field is mandatory."} </div> }
                                {errors.address?.type === "minLength" && <div className="error">{"Your input is less than minimum length"} </div> }                             
                        </Col>
                    </Form.Group> 
                </Form>
                </Container>
            </>
}
export default AddEmployee;