import React, { useEffect } from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

function Profile(){

    const styles = {
        error: {
            color:"red",
        }
    }

    const { register, watch, handleSubmit, formState: { errors } } = useForm();  

    const onSubmit = data => {
        console.log(data)
    }

    useEffect(() => {

    }, [])

    return  <>
            <Container>
                        <Form onSubmit={handleSubmit(onSubmit)}>

                 <Form.Group as={Row} controlId="formBasicFirstName">
                    <Col sm={{span:12, offset:0}}>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control disabled={true} name="firstName" type="text" placeholder="First Name" {...register("firstName", {required: true, minLength:3  })} />
                        {errors.firstName?.type === "required" && <div style={styles.error}>{"⚠ This field is mandatory."} </div> }
                        {errors.firstName?.type === "minLength" && <div style={styles.error}>{"⚠ Your input is less than minimum length"} </div> }                             
                    </Col>
                </Form.Group>   
                <Row>
                    <Col sm={{span:12, offset:0}}>
                        <Button size="lg" variant="dark" type="submit" block>
                            Register
                        </Button>
                    </Col>
                </Row>
                </Form>
            </Container>
            </>

}
export default Profile;