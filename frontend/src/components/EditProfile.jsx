import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { setuser } from '../slices/UserSlice';

function EditProfile({name, email, visible}) {
    const [userName, setName] = useState(name)
    const [userEmail, setEmail] = useState(email);
    const [err, setErr] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(userName != name || userEmail != email){

            const datas = fetch('http://localhost:8000/api/users/update', {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body:JSON.stringify({
        name:userName,
        email:userEmail
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Response data:', data);
        dispatch(setuser(data));
        alert("User updated Successfully !") 
        visible();
      })
      .catch((error) => {
        console.error('Error:', error);
      })
        }else{
            setErr('Please Make changes to Submit!')
        }
    }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control onChange={(e) => {setName(e.target.value)} } value={userName} type="text" placeholder="Enter email" autoFocus/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Email</Form.Label>
        <Form.Control onChange={(e) => {setEmail(e.target.value)}} value={userEmail} type="email" placeholder="email" />
        <p className="text-danger">{ err }</p>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default EditProfile;