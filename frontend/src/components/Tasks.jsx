
import React, { useCallback, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import EditTaskPopup from './PopupForm';
import CreateTask from './CreateTask';
import { PencilFill, Trash3Fill } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deletetask, setuser } from '../slices/UserSlice';


function Tasks({ data }) {

  var i = 1;

  const dispatch = useDispatch();
  const [isFormVisible, setFormVisibility] = useState(false);
  const [task, setTask] = useState(null);
  const [addTask, setAddTask] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [filter, setFilter] = useState('');

  const handleTask = (task) => {
    setTask(task);
    setFormVisibility(true);
  }
  const addTaskVisible = () => {
    setAddTask(false);
  }
  const handleFormVisibility = () => {
    setFormVisibility(false);
  }

  const handleDelete = (id) => {

    const datas = fetch(`http://localhost:8000/api/users/deleteTask?task_id=${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
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
        alert("Task Deleted Successfully !") 
      })
      .catch((error) => {
        console.error('Error:', error);
      })

  }

  const createTask = () => {
    setAddTask(true);
  }


  return (
    <>

      <Container style={{marginTop:'40px'}} className="mt-5">
        <Row>
          <Col style={{marginLeft:'auto'}} sm={4}>
            <Form className="d-flex">
              <Form.Control
              style={{marginLeft:'auto', width:'200px'}}
                type="search"
                placeholder="Search Task"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setFilterValue(e.target.value)}
              />
              <Button >
                Search
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      <Table style={{marginTop:'20px'}} expand="lg" className='mt-40'>
        <thead style={{backgroundColor:'#2568b0'}}>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {

            data.tasks.map((task) => {
              return (
                task.task_name.toLowerCase().includes(filterValue.toLowerCase()) &&
              <tr key={task._id}>
                <td>{i++}</td>
                <td>{task.task_name}</td>
                <td>{task.start_date}</td>
                <td>{task.end_date}</td>
                <td>{task.status}</td>
                <th><PencilFill role='button' onClick={() => {handleTask(task)}} className='text-success mr-10 cursor-pointer' /> <Trash3Fill role='button' onClick={() => handleDelete(task._id)} className='text-danger mx-4' /> </th>
              </tr> );
            })
          }
          <tr style={{fontSize:'14px',color:'grey',fontStyle:'italic',cursor:'pointer'}}>
                <td></td>
                <td onClick={createTask}>Create new +</td>
                <td></td>
                <td></td>
                <td></td>
                <th></th>
              </tr>
          
        </tbody>
      </Table>
      { isFormVisible && <EditTaskPopup task={task} isVisible={handleFormVisibility} />}
      { addTask && <CreateTask visible={addTaskVisible} /> }
    </>
  );
}

export default Tasks;