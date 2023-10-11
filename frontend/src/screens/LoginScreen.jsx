import React from "react";

import FormContainer from "../components/FormContainer";
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { login } from "../slices/authentication";
import { setuser } from "../slices/UserSlice";


const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErr, setemailErr] = useState('');
    const [passErr, setpassErr] = useState('');
    const [user, setUser] = useState({email:'',password:''});
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
       
        if(email != '' && password != '' ){
            setemailErr('');
            setpassErr('');

            console.log(user);
            
            const datas = fetch('http://localhost:8000/api/users/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json' 
                },
                body: JSON.stringify({email:email,password:password}), 
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error(response);
                  }
                  return response.json();
                })
                .then((data) => {
                  console.log('Response data:', data);
                  setUser(data);
                  dispatch(login(data));
                  dispatch(setuser(data));
                  navigate('/')
                })
                .catch((error) => {
                  // Handle errors
                  console.error('Error:', error);
                })

                
                
                
        

            
        }else{
            if(email == ''){
                setemailErr('Enter email!')
            }else{
                setemailErr('')
            }
            if(password == ''){
                setpassErr('Enter password!')
            }else{
                setpassErr('')
            }
        }
        
        
        
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
                <p className='pl-20 text-danger'>{emailErr}</p>
            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                type='password'
                placeholder='Enter password'
                onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
                <p className='pl-20 text-danger'>{passErr}</p>
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
                New Customer? <Link to='/signup'>signup</Link>
            </Col>

            </Row>

        </FormContainer>
    );
}

export default LoginScreen;