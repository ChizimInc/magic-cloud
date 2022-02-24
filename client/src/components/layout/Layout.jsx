import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Nav, Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { AiOutlineCloud } from 'react-icons/ai'

import { logout } from "../../reducers/userReducer";
import { CustomLink } from '../utils/customLink/CustomLink';
import { setCurrentFolder, clearStack } from "../../reducers/cloudReducer";

import './main.css'


const Layout = () => {

    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    const goHomeHandler = (e) => {
      e.preventDefault()
      dispatch(setCurrentFolder(0))
      dispatch(clearStack())
    }

    return (
        <>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand href="#" onClick={goHomeHandler}>
                <CustomLink to="/">
                  <div className="navbar-logo">
                    <AiOutlineCloud />Magic
                  </div>
                </CustomLink></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto"></Nav>
                <Nav>
                    {!isAuth && <Nav.Link href="/login"><CustomLink to="/login">Sing in</CustomLink></Nav.Link>}
                    {!isAuth && <Nav.Link href="/registration"><CustomLink to="/registration">Registration</CustomLink></Nav.Link>}
                    { isAuth && <Nav.Link href="/profile"><CustomLink to="/profile">Profile</CustomLink></Nav.Link>}
                    
                    { isAuth && <Nav.Link href="#" onClick={() => dispatch(logout())}>Log out</Nav.Link>}
                    
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Outlet />
        </>
    );
};

export { Layout };