
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { updatetask, deletetask, setuser } from '../slices/UserSlice';

function EditTaskPopup( {isVisible, task} ) {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [startDate, setStartdate] = useState(task.start_date.split('T')[0]);
  const [endDate, setEndDate] = useState(task.end_date.split('T')[0]);
  const [taskName, setTaskName] = useState(task.task_name);
  const [status, setStatus] = useState(task.status)

  const handleStartDate = (e) => {
    setStartdate(e.target.value);
  }

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const datas = fetch('http://localhost:8000/api/users/updatetask', {
                method: 'POST',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json' 
                },
                body: JSON.stringify({
                  task_id:task._id,
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
                  // Handle the response data
                  console.log('Response data:', data);
                  dispatch(setuser(data));
                  isVisible();
                  alert("Task Updated Successfully !");
                })
                .catch((error) => {
                  // Handle errors
                  console.error('Error:', error);
                })
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
               value={taskName}
                type="text"
                onChange={(e) => setTaskName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={handleStartDate}
                max={endDate}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={handleEndDate}
                min={startDate}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Status</Form.Label>
              <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value='In Progress'>In Progress</option>
                <option value='completed'>Completed</option>
                <option value='due'>Due</option>
                <option value='past due'>Past Due</option>
                </Form.Select>
            </Form.Group>
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={isVisible} variant="secondary">
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

export default EditTaskPopup;