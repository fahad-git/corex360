import React from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { TOGGLE_HEADER } from '../Actions/user';
import {Base_URL} from '../Config';
import { useUserContext } from '../UserContext';



export function Authenticate (credentials){
    return axios.post(Base_URL + '/authenticate', credentials)
}

export function Register (details){
    return axios.post(Base_URL + '/register', details)
}

function Logout(){
    
    const {state, dispatch} = useUserContext()
    const history = useHistory();
    
    localStorage.removeItem("user");
    dispatch({type:TOGGLE_HEADER, "header":"HOME"})
    history.push("/home");
    
    // return null;
}
export default Logout;