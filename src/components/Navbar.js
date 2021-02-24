import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/css/Navbar.css';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/fonts/ionicons.min.css';


import logo from '../assets/img/logo.png';

const Navbar = () => {

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

    return <nav className="navclass">
                <div className="navlogo">
                    {/* <h3>Corex 360</h3> */}
                    <i><img src={logo} style={{width:"150px", height:"100px"}} alt="Not Found!" /></i>
                    
                </div>
                <ul className={renderClasses()}>

                {/* <i className="ion-navicon-round" style={{backgroundColor:"red"}}>Icon</i>            */}
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
}

export default Navbar;