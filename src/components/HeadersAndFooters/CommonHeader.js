import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import '../../assets/css/Navbar.css';
import '../../assets/bootstrap/css/bootstrap.min.css';
import '../../assets/fonts/ionicons.min.css';

import logo from '../../assets/img/logo-white.png';
import { useUserContext } from '../UserContext';
import { PROFILE_MODAL_OPEN, TOGGLE_HEADER } from '../Actions/user';
import Logout from './../Services/Auth';

function CommonHeader() {

    const history = useHistory()
    const {state, dispatch} = useUserContext()

    const logoutHandler = () => {        
        localStorage.removeItem("user");
        dispatch({type:TOGGLE_HEADER, "header":"HOME"})
        history.push("/corax-board");
    }

    return <>
          <Navbar collapseOnSelect expand="md" bg="transparent" variant="dark" sticky='top' className="Application-header Application-header2">
          <Navbar.Brand ><h1 className="header">CORAX BOARD</h1></Navbar.Brand>

          {/* <Navbar.Brand ><img src={logo} className="d-inline-block align-top" alt="EMS" /></Navbar.Brand> */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto" >
              <Nav.Link href="/corax-board/dashboard" >Dashboard</Nav.Link>
              <Nav.Link className="ml-4" href="#profile" style={{display: history.location.pathname == "/corax-board/dashboard" ? "block": "none"}} onClick={() => dispatch({type:PROFILE_MODAL_OPEN})}>Profile</Nav.Link>
              <Nav.Link className="ml-4" style={{display: state.payload.role == "admin" ? "block": "none"}} className="ml-4" href="/corax-board/employee-management">Employee Management</Nav.Link>
              <Nav.Link className="ml-4" href="/logout" onClick={logoutHandler}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        </>
}

export default CommonHeader;