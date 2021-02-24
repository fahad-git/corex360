import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Home from './Front/Home';
import About from './Front/About';
import Services from './Front/Services';
import Contact from './Front/Contact';
import Dashboard from "./Admin/Dashboard";
import UserManagement from './Admin/UserManagement';
import PlanManagement from './Admin/PlanManagement';
import GoalManagement from './Admin/GoalManagement';
import Settings from './Admin/Settings';
import Profile from './Admin/Profile';

function Main (props) {
    
    var setHeader = props.setHeader

    return(
        <Switch>
            <Route path='/home'><Home setHeader = {setHeader}/></Route>
            <Route path='/about'><About /></Route>
            <Route path='/services'> <Services /> </Route>
            <Route path='/contact'> <Contact /> </Route>
            <Route path='/dashboard'> <Dashboard /> </Route>
            <Route path='/usermanagement'> <UserManagement /> </Route>
            <Route path='/planmanagement'> <PlanManagement /> </Route>
            <Route path='/goalmanagement'> <GoalManagement /> </Route>
            <Route path='/settings'> <Settings /> </Route>
            <Route path='/profile'> <Profile /> </Route>
            <Redirect to="/home" />
        </Switch>
    )

}

export default Main;