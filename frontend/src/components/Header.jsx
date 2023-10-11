import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import { logout } from '../slices/authentication';

function Header() {
    const { userInfo } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const logoutHandler = () =>{
        dispatch(logout());
        const datas = fetch('http://localhost:8000/api/users/logout', {
                method: 'POST',
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
                  alert("Logout Successfully!");
                })
                .catch((error) => {

                  console.error('Error:', error);
                })
    }
  return (
    <Navbar expand="lg" className='text-white' style={{backgroundColor:'#2568b0'}}>
      <Container>
        <Navbar.Brand style={{fontWeight:'bold',color:'#fff'}}>Task Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
            {
                user ? (
                    <>
                    <NavDropdown style={{color:'#fff'}} title={user.name} id='username'>
                        <LinkContainer to='/profile'>
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={ logoutHandler }>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                    </>
                ) :
                (
                    <>
                        <Nav.Link href='/login'>Login</Nav.Link>
                        <Nav.Link href='/signup'>Signup</Nav.Link>
                    </>
                )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;