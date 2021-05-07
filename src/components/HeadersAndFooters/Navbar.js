import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import '../../assets/css/Navbar.css';
import '../../assets/bootstrap/css/bootstrap.min.css';
import '../../assets/fonts/ionicons.min.css';

import logo from '../../assets/img/logo-white.png';

const styles = {
    barColor:{
        color:"black"
    },
    logo:{
      width:"100px",
      height:"100px"
    }
}

const Navigationbar = () => {

    const [navLinkOpen, navLinkToggle] = useState(true);
    const history = useHistory();

    const handleNavLinkToggle = () => {
        navLinkToggle(!navLinkOpen);
    }

    const renderClasses = () => {
        let classes = 'navlink';

        if(navLinkOpen){
            classes += ' active';
        }

        return classes;
    }

    return <> 
          <Navbar collapseOnSelect expand="lg" bg="transparent" variant="dark" sticky='top' fixed="top" className="Application-header">
          <Navbar.Brand ><img src={logo} className="d-inline-block align-top" alt="EMS" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">

              <Nav.Link  href="/home">Home</Nav.Link>

              <Nav.Link className="ml-4" href="/about-us">About Us</Nav.Link>

              <NavDropdown className="ml-4" title="Services" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/corax-board" className="item-color">Corax Board</NavDropdown.Item>
                <NavDropdown.Item href="/services#action2" className="item-color">Corax Goal</NavDropdown.Item>
                <NavDropdown.Item href="/services#action3" className="item-color">Corax Planning</NavDropdown.Item>
                <NavDropdown.Item href="/services#action2" className="item-color">Corax Stats</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown className="ml-4" title="Accounts" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/services#action1" className="item-color">New Corporate Account</NavDropdown.Item>
                <NavDropdown.Item href="/services#action2" className="item-color">New User Account</NavDropdown.Item>
                <NavDropdown.Item href="/services#action3" className="item-color">Super Admin Account</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link className="ml-4" href="/contact-us">Contact Us</Nav.Link>
              
              <NavDropdown className="mx-4" drop="left" title="More" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/services#action1" className="item-color">User Management</NavDropdown.Item>
                <NavDropdown.Item href="/services#action2" className="item-color">Customer Account Management</NavDropdown.Item>
                <NavDropdown.Item href="/services#action3" className="item-color">List of Customers</NavDropdown.Item>
                <NavDropdown.Item href="/services#action3" className="item-color">List of Invoice</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
</>
    /*
    return <nav className="navclass">
                <div className="navlogo">
                    <i><img src={logo} style={{width:"150px", height:"100px"}} alt="Not Found!" /></i>
                    
                </div>
                <ul className={renderClasses()}>

                    <li className="linkinnav"><button type="button" className="link-button" onClick={() => { handleNavLinkToggle(); history.push('/home');} } >Home</button></li>

                    <li className="linkinnav"><button type="button" className="link-button" onClick={() => { handleNavLinkToggle(); history.push('/about');} } >About Us</button></li>
                    <li className="linkinnav"><button type="button" className="link-button" onClick={() => { handleNavLinkToggle(); history.push('/services'); }} >Services</button></li>
                    <li className="linkinnav"><button type="button" className="link-button" onClick={() => { handleNavLinkToggle(); history.push('/contact'); }} >Contact Us</button></li>
                    <li className="extra linkinnav"><button type="button" className="link-button" ></button></li>
                    <li className="extra linkinnav"><button type="button" className="link-button" ></button></li>

                </ul>
                
                <div onClick={handleNavLinkToggle} className="hamburger-toggle">
                    <i className="ion-navicon-round"></i>
                </div>
            </nav>
            */
}

export default Navigationbar;