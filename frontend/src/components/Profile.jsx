import React, { useState } from "react"
import { ListGroup } from "react-bootstrap"
import EditProfile from "./EditProfile";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authentication";

const Profile = () => {
    const { user } = useSelector((state) => state.user);
    const [editProfile, setEditProfile] = useState(false);
    const [passForm, setPassForm] = useState(false);
    const [passErr, setPassErr] =  useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleEdit = () => {
        setEditProfile(!editProfile);
    }

    const handleVisible = () => {
        setEditProfile(false);
    }
    const deleteForm = () => {
        setPassForm(!passForm);
    }
    const handleDelete = (e) => {
        e.preventDefault();
        const datas = fetch(`http://localhost:8000/api/users/delete?password=${pass}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        })
        .then((response) => {
            if (response.status == 404) {
                setPassErr('Incorrect Password');
            }
            if (!response.ok) {
                throw new Error(response);
            }
            return response.json();
        })
        .then((data) => {
            console.log('Response data:', data);
            dispatch(logout());
            alert("User Deleted Successfully !");
            navigate('/')
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }

    return (
        <>
        <a href='/' style={{marginLeft:'19px'}}>Back to Tasks</a>
        <ListGroup style={{marginTop:'10px',width:'350px',border:'none'}} as="ul">
            <ListGroup.Item as="li" style={{border:'none'}}>
                Name :  {user.name} 
            </ListGroup.Item>
            <ListGroup.Item as="li" style={{border:'none'}}>Email : {user.email }</ListGroup.Item>
            <ListGroup.Item type="button" as="li" className="text-success" style={{border:'none'}} onClick={handleEdit} >Edit Profile</ListGroup.Item>
            <ListGroup.Item type="button" as="li" className="text-danger" style={{border:'none'}} onClick={deleteForm}>Delete Profile</ListGroup.Item>
        </ListGroup>
        { 
            editProfile &&
            <EditProfile visible={ handleVisible } name={user.name} email={user.email} />
        }
        {
            passForm &&
            <Form onSubmit={handleDelete}>
            <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
              <Form.Label>Enter Password to delete</Form.Label>
              <Form.Control onChange={(e) => {setPass(e.target.value)} } type="password" placeholder="Enter Password" autoFocus/>
              <p className='text-danger'>{ passErr }</p>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        }
        </>
    )
}

export default Profile;