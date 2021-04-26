import React from 'react';
import axios from 'axios';
import {Base_URL} from './../Config';

export function GetAllEmployeesByCompanyId(){
    const user = JSON.parse(localStorage.getItem("user"));
    if(!user)
        return axios.get(Base_URL + "/getAllEmployeesByCompanyId")
    
    const AuthorizationHeader = { "Authorization": "Bearer " + user.jwt }
    return axios.get(Base_URL + "/getAllEmployeesByCompanyId", {params:{"companyId": user.companyId}, headers:AuthorizationHeader })
}


export function GetAllAdminsByCompanyId(){
    const user = JSON.parse(localStorage.getItem("user"));
    if(!user)
        return axios.get(Base_URL + "/getAllEmployeesByCompanyId")
    
    const AuthorizationHeader = { "Authorization": "Bearer " + user.jwt }
    return axios.get(Base_URL + "/getAllAdminsByCompanyId", {params:{"companyId": user.companyId}, headers:AuthorizationHeader })
}

export function ChangeEmployeeCurrentStatus(parameters){
    const user = JSON.parse(localStorage.getItem("user"));
    if(!user)
        return axios.get(Base_URL + "/changeStatus")
    
    const AuthorizationHeader = { "Authorization": "Bearer " + user.jwt }
    return axios.get(Base_URL + "/changeStatus", {params:parameters, headers:AuthorizationHeader })
}

export function ChangeAdminCurrentStatus(parameters){
    const user = JSON.parse(localStorage.getItem("user"));
    if(!user)
        return axios.get(Base_URL + "/changeAdminStatus")
    
    const AuthorizationHeader = { "Authorization": "Bearer " + user.jwt }
    return axios.get(Base_URL + "/changeAdminStatus", {params:parameters, headers:AuthorizationHeader })
}