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

    const logoutClickHandler = (e) => {
      e.preventDefault()
      dispatch(logout())
      dispatch(clearStack())
      dispatch(setCurrentFolder(0))
    }

    return (
        <>
          <Navbar bg="light" expand="lg" className="p-0">
            <Container className="main-conatainer-menu">
              <Navbar.Brand href="#" onClick={goHomeHandler} >
                <CustomLink to="/cloud">
                  <div className="navbar-logo">
                    <AiOutlineCloud />Magic
                  </div>
                </CustomLink></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto"></Nav>
                <Nav>
                    {!isAuth && <Nav.Link href="#"><CustomLink to="/login">Sing in</CustomLink></Nav.Link>}
                    {!isAuth && <Nav.Link href="#"><CustomLink to="/registration">Registration</CustomLink></Nav.Link>}
                    { isAuth && <Nav.Link href="#"><CustomLink to="/profile">Profile</CustomLink></Nav.Link>}
                    
                    { isAuth && <Nav.Link href="#" onClick={logoutClickHandler}>Log out</Nav.Link>}
                    
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Outlet />
        </>
    );
};

export { Layout };