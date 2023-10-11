import React, { useState } from "react";

import FormContainer from "../components/FormContainer";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/authentication";
import { setuser } from "../slices/UserSlice";

const SignUpScreen = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conformPass, setConformPass] = useState('');

  const [nameErr, setNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [conformPassErr, setConformPassErr] = useState('');

  const submitHandler = (e) => {

    e.preventDefault();

    if(name != '' && email  != '' && password != '' && conformPass != ''){
      setNameErr('');
      setEmailErr('');
      setPasswordErr('');
      setConformPassErr('');

      if(password === conformPass){
        setConformPassErr('');
        const datas = fetch('http://localhost:8000/api/users/register', {
                method: 'POST',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json', // Specify the content type
                },
                body: JSON.stringify({name:name,email:email,password:password}), 
              })
                .then((response) => {
                  
                  response.status == 403 ? setEmailErr('User with email id already exists') : setEmailErr('');
                  if (!response.ok || response.status == 403) {
                    throw new Error('Network response was not ok');
                  }
                  return response.json();
                })
                .then((data) => {
                 
                  console.log('Response data:', data);
                  dispatch(setuser(data));
                  navigate('/')
                })
                .catch((error) => {
                  // Handle errors
                  console.error('Error:', error);
                })

      }else{
        setConformPassErr('Password does not match');
      }

      
      

    }else{
      name == '' ? setNameErr('Enter Name') : setNameErr('');
      email == ''? setEmailErr('Enter Email') : setEmailErr('');
      password == ''? setPasswordErr('Enter Password') : setPasswordErr('');
      conformPass == ''? setConformPassErr('Retype Password') : setConformPassErr('');
    }
  }

    return (
        <FormContainer>
            <h1>Signup User</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
          <p className='pl-20 text-danger'>{nameErr}</p>
        </Form.Group>

        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
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
          <p className='pl-20 text-danger'>{passwordErr}</p>
        </Form.Group>
        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            onChange={(e) => setConformPass(e.target.value)}
          ></Form.Control>
          <p className='pl-20 text-danger'>{conformPassErr}</p>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Signup
        </Button>

        
      </Form>

      <Row className='py-3'>
        <Col>
          Already have an account? <Link to='/login'>login</Link>
        </Col>
      </Row>
        </FormContainer>
    )
}

export default SignUpScreen;