import React, {useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/Header.css';

import logo from '../assets/img/logo.png';

function Header () {

    const history = useHistory();

    const [navLinkOpen, navLinkToggle] = useState(true);
    const [profileLinkOpen, profileLinkToggle] = useState(true);

    const profileNode = useRef();
    const profileButtonNode = useRef();
    
    const [accountType, setAccountType] = useState();
    const [accountProfileUrl, setAccountProfileUrl] = useState();
    const [userName, setUserName] = useState();

    var [screenName, setScreenName] = useState("Dashboard");

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        if(user) {
            setAccountType(user.accountType);
            setAccountProfileUrl(user.accountProfileUrl);
            setUserName(user.userName);
        }

    },[user]);

    const profileInfoHandler = () => {
    }

    const changePasswordHandler = () => {

    }
    
    const logoutHandler = () =>{
        // alert("logout");
        localStorage.removeItem("user");
        // dispatch({
        //     type: "LOGOUT"
        // });
        history.push('/home');
    }

    const handleProfileLinkToggle = () => {
        console.log("working")
        profileLinkToggle(!profileLinkOpen);
    }
    const renderClasses = () => {
        let classes = 'headernavlink';

        if(navLinkOpen){
            classes += ' headeractive';
        }

        return classes;
    }

    const renderProfileClasses = () => {
        let classes = 'headerprofilelink';

        if(profileLinkOpen){
            classes += ' headerprofileactive';
        }
        return classes;
    }

    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
      }, []);

    const handleClick = e => {
        if(profileButtonNode.current.contains(e.target)){
            // inside click
            return;
        }
        // else if (settingNode.current.contains(e.target)) {
        //   // inside click
        //   return;
        // }
        // else if (profileNode.current.contains(e.target)) {
        //     // inside click
        //     return;
        //   }
        // outside click 
        // ... do whatever on click outside here ...
        profileLinkToggle(true);
        navLinkToggle(true);
       
      };


      const setHeaderTestHandler = (text) =>{
        setScreenName(text);
        //do other stuff
        switch(text){
            case "Dash Board":
                history.push("/dashboard");
                break;
            case "User Manager":
                history.push("/usermanagement");
                break;
            case "Plan Management":
                history.push("/planmanagement");
                break;
            case "Goal Management":
                history.push("/goalmanagement");
                break;
            case "Settings":
                history.push("/settings");
                break;                               
            case "Profile":
                history.push("/profile");
                break;
            default:
                break;
        }
      }

    return (
        <nav className="navigation_class gradient">

            {/* this is profile avatar */}
            <div onClick={handleProfileLinkToggle} className="header-profile-toggle" ref={profileButtonNode}>
                <i className="ion-navicon-round"></i>
            </div>

            
                <ul className={renderProfileClasses()} ref={profileNode}>
            
                    <div className="headerlogo">
                        <i><img src={logo} style={{width:"150px", height:"100px"}} /></i>
                        {/* <h3>C</h3> */}
                    </div>

                    <hr className="divider"/>
                    <div className="container">
                        <li className="row profilelink">
                            <label className="col-12"  onClick={e => setHeaderTestHandler("Dash Board")}><i className="ion-monitor"> Dash Board</i></label>    
                        </li>
                        
                        <li className="row profilelink">
                            <label className="col-12"  onClick={e => setHeaderTestHandler("User Manager")}><i className="ion-ios-people"> User Manager</i></label>
                        {/* ion-person-stalker */}
                        </li>

                        <li className="row profilelink">
                            <label className="col-12" onClick={e => setHeaderTestHandler("Plan Management")}><i className="ion-clipboard"> Plan Management</i></label>    
                        </li>

                        <li className="row profilelink">
                            <label className="col-12" onClick={e => setHeaderTestHandler("Goal Management")}><i className="ion-disc"> Goal Management</i></label>    
                        </li>

                        <li className="row  profilelink">
                            <label className="col-12" onClick={e => setHeaderTestHandler("Settings")} ><i className="ion-ios-gear-outline"> Settings</i></label>    
                        </li>

                        <li className="row profilelink">
                            <label className="col-12"  onClick={e => setHeaderTestHandler("Profile")}><i className="ion-person"> Profile</i> </label>    
                        </li>

                        <li className="row profilelink">
                            <label className="col-12" onClick={logoutHandler}><i className="ion-log-out"> Logout</i></label>    
                      </li>
                    </div>
                </ul>

            <div className="row">
                    <h1 className="col-12 screen-name">{screenName}</h1>
            </div>

        </nav>
    )
}

export default Header;