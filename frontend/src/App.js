
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';


function App() {
  return (
    <>
      <ToastContainer />
      <Container>
        <Outlet/>
      </Container>
    </>
    
  );
}

export default App;
