
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { updatetask, deletetask, addtask, setuser } from '../slices/UserSlice';

function CreateTask( {visible} ) {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [taskName, setTaskName] = useState('');
  const [startDate, setStartdate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('')

  const [taskNameErr, setTaskNameErr] = useState('');
  const [startDateErr, setStartdateErr] = useState('');
  const [endDateErr, setEndDateErr] = useState('');
  const [statusErr, setStatusErr] = useState('')


  const handleStartDate = (e) => {
    setStartdate(e.target.value);
  }

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(taskName != '' && startDate != '' && endDate != '' && status != ''){
        setTaskNameErr('')
        setStartdateErr('')
        setEndDateErr('')
        setStatusErr('')

        const datas = fetch('http://localhost:8000/api/users/addtask', {
                method: 'POST',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json' 
                },
                body: JSON.stringify({
                  task_name:taskName,
                  start_date:startDate,
                  end_date:endDate,
                  status:status
                }), 
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
                  visible();
                  alert("Task created Successfully !")  
                })
                .catch((error) => {
                  console.error('Error:', error);
                })

    }else{
        taskName == '' ? setTaskNameErr('Please Enter Task Name') : setTaskNameErr('');
        startDate == '' ? setStartdateErr('Please Select Task Start Date') : setStartdateErr('');
        endDate == '' ? setEndDateErr('Please Select Task End Date') : setEndDateErr('');
        status == '' ? setStatusErr('Please Select Task End Date') : setStatusErr('');
    }
  }

  return (
    <>

      <Modal show={true}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setTaskName(e.target.value)}
              />
              <p className='text-danger'>{taskNameErr}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                onChange={handleStartDate}
                max={endDate}
              />
              <p className='text-danger'>{startDateErr}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                onChange={handleEndDate}
                min={startDate}
              />
              <p className='text-danger'>{endDateErr}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Status</Form.Label>
              <Form.Select value='In Progress' onChange={(e) => setStatus(e.target.value)}>
                <option value='In Progress'>In Progress</option>
                <option value='completed'>Completed</option>
                <option value='due'>Due</option>
                <option value='past due'>Past Due</option>
                </Form.Select>
                <p className='text-danger'>{statusErr}</p>
            </Form.Group>
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={visible} variant="secondary">
            Close
          </Button>
          <Button type='submit' variant="primary">
            Submit
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default CreateTask;