import React from "react";

import FormContainer from "../components/FormContainer";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from "react";

const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
         
        
        toast.error('This is an error message!');
        
    }

    return(
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                type='email'
                placeholder='Enter email'
                onChange={(e) => setEmail(e.target.value)}
                
                ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                type='password'
                placeholder='Enter password'
                onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button
                type='submit'
                variant='primary'
                className='mt-3'
            >
                Sign In
            </Button>
            </Form>

            

            <Row className='py-3'>
            <Col>
                New Customer? 
            </Col>

            </Row>

        </FormContainer>
    );
}

export default LoginScreen;