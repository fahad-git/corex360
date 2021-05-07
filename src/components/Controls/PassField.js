import React, { useState, useRef } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import "./../../assets/css/FormStyle.css"

function PassField(props) {

    const { register:register2, watch, handleSubmit:handleSubmit2, formState: { errors:errors2 } , reset:reset2 } = useForm();  

    const password = useRef({});
    password.current = watch("newPassword", "");
  
    const oldPass = useRef({})
    oldPass.current = watch("oldPassword", "");

    const styles = {
        form: {
            display: props.display ? "block" : "none"
        },
        eyeBtn: {
            cursor:"pointer"
        }
    }


    const [oldPassShow, setOldPassShow] = useState(false);
    const [newPassShow, setNewPassShow] = useState(false);
    const [confirmPassShow, setConfirmPassShow] = useState(false);

    const onSubmit = data => {
        
        console.log(data);
        toast("Password changed successfully!", {type:"success"})
        resetHandler();
    }

    const resetHandler = () => {
        reset2("oldPassword", "")
        reset2("newPassword", "")
        reset2("confirmPassword", "")

    }

    return( 
        <Form onSubmit={handleSubmit2(onSubmit)} className="mt-3 p-3 pass-field" style={styles.form}>
             <Form.Group controlId="Password.SelectCustom1">
                <Form.Label><center>Old Password</center></Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control name="oldPassword" type={oldPassShow? "text" : "password"} placeholder="Type here..." {...register2("oldPassword",  {required:true, minLength:8})} />
                    <InputGroup.Append>
                        <InputGroup.Text id="basic-addon2" style={styles.eyeBtn} onClick={ () => setOldPassShow(!oldPassShow)}> <i className="material-icons">{oldPassShow ? "lock_open" : "lock"}</i></InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                {errors2.oldPassword?.type === "required" && <div className="err">{"⚠ This field is mandatory."} </div> }
                {errors2.oldPassword?.type === "minLength" && <div className="err">{"⚠ Password must have at least 8 characters"} </div> }                             
            </Form.Group>
            <Form.Group controlId="Password.SelectCustom2">
                <Form.Label><center>New Password</center></Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control name="newPassword" type={newPassShow? "text" : "password"} placeholder="New Password" {...register2("newPassword",  {required:true, minLength:8, validate: value => value !== oldPass.current || "New Password can not be same as old password"})} />
                    <InputGroup.Append>
                        <InputGroup.Text id="basic-addon2" style={styles.eyeBtn} onClick={ () => setNewPassShow(!newPassShow)}> <i className="material-icons">{newPassShow ? "lock_open" : "lock"}</i></InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                {errors2.newPassword?.type === "required" && <div className="err">{"⚠ This field is mandatory."} </div> }
                {errors2.newPassword?.type === "minLength" && <div className="err">{"⚠ Password must have at least 8 characters"} </div> }                             
                {errors2.newPassword?.type === "validate" && <div className="err">{"⚠ " + errors2.newPassword.message} </div> }                             

            </Form.Group>
            <Form.Group controlId="Password.SelectCustom3">
                <Form.Label><center>Confirm Password</center></Form.Label>
                <InputGroup>
                    <Form.Control name="confirmPassword" type={confirmPassShow? "text" : "password"} placeholder="Type here..." {...register2("confirmPassword",  
                    {required:true, 
                    minLength:8,
                    validate: value => value === password.current || "The passwords do not match"
                    })} />
                    <InputGroup.Append>
                        <InputGroup.Text id="basic-addon2" style={styles.eyeBtn} onClick={ () => setConfirmPassShow(!confirmPassShow)}> <i className="material-icons">{confirmPassShow ? "lock_open" : "lock"}</i></InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                {errors2.confirmPassword?.type === "required" && <div className="err">{"⚠ This field is mandatory."} </div> }
                {errors2.confirmPassword?.type === "minLength" && <div className="err">{"⚠ Password must have at least 8 characters"} </div> }                             
                {errors2.confirmPassword?.type === "validate" && <div className="err">{"⚠ " + errors2.confirmPassword.message} </div> }                             
                
            </Form.Group>
                <Row>
                    <Col>
                        <Button size="sm" variant="dark" type="submit" className="float-left">
                            Save changes
                        </Button>
                    </Col>
                    <Col>
                        <Button size="sm" variant="dark" className="float-right" onClick={resetHandler}>
                            Cancel
                        </Button>
                    </Col>         
                </Row>

        </Form>            
    );
}


PassField.defaultProps = {
    display:false
}

export default PassField;