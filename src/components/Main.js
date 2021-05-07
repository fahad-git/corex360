import React, { useEffect } from 'react';
import {Route, Switch, Redirect, useHistory} from 'react-router-dom';
import Home from './Front/Home';
import About from './Front/About';
import Services from './Front/Services';
import Contact from './Front/Contact';
import Dashboard from "./Admin/Dashboard";
import CorexBoard from './Front/CorexBoard';
import UserManagement from './Admin/UserManagement';
import PlanManagement from './Admin/PlanManagement';
import GoalManagement from './Admin/GoalManagement';
import Settings from './Admin/Settings';
import Profile from './Admin/Profile';
import { useUserContext } from './UserContext';
import USER, { TOGGLE_HEADER } from './Actions/user';
import DashboardUser from './DashboardUser';
import EmployeeManagement from './EmployeeManagement';

function Main () {

    const { state, dispatch } = useUserContext();
    const history = useHistory();

    const OpenUrls = ["/home", "/corax-board", "/services", "/contact-us", "/about-us"]

    useEffect(() => {
        try{
            const user = localStorage.getItem("user")
            if(user){
                const usr = JSON.parse(user)
                dispatch({type: USER, payload: usr})
                if(usr.role == "super admin"){
                    dispatch({type: TOGGLE_HEADER, header:"ADMIN"})
                    if(OpenUrls.includes(history.location.pathname))
                        history.push("/dashboard")
                }
                else{
                    dispatch({type: TOGGLE_HEADER, header:"USER"})
                    if(OpenUrls.includes(history.location.pathname))
                        history.push("/corax-board/dashboard")
                }
            }
        }catch(e){
            history.push("/home")
        }
    }, [])

    return(
        <Switch>
            <Route path='/home'><Home /></Route>
            <Route exact path='/about-us'><About /></Route>
            <Route exact path='/services'> <Services /> </Route>
            <Route exact path='/contact-us'> <Contact /> </Route>
            <Route exact path='/dashboard'> <Dashboard /> </Route>
            <Route exact path='/usermanagement'> <UserManagement /> </Route>
            <Route exact path='/planmanagement'> <PlanManagement /> </Route>
            <Route exact path='/goalmanagement'> <GoalManagement /> </Route>
            <Route exact path='/settings'> <Settings /> </Route>
            <Route exact path='/profile'> <Profile /> </Route>

            <Route exact path='/corax-board'><CorexBoard /> </Route>
            <Route exact path='/corax-board/dashboard'><DashboardUser /> </Route>
            <Route path="/corax-board/employee-management"><EmployeeManagement /> </Route>

            <Redirect to="/home" />
        </Switch>
    )

}

export default Main;