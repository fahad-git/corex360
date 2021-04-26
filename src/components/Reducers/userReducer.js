import USER, 
{ TOGGLE_HEADER, LOGOUT, LOGIN_MODAL_OPEN, LOGIN_MODAL_CLOSE, 
    REGISTER_MODAL_OPEN, REGISTER_MODAL_CLOSE, FORGET_PASSWORD_MODAL_OPEN, FORGET_PASSWORD_MODAL_CLOSE,
    PROFILE_MODAL_OPEN, PROFILE_MODAL_CLOSE
} 
from './../Actions/user';

export const initialState = {
    payload:null,
    header:"HOME",
    loginModal:false,
    registerModal:false,
    forgetPassword:false,
    profile:false,
};

// Herders "HOME", "ADMIN", "USER"

export const reducer = (state, action) => {
    if(action.type == USER){
        return {...state, "payload": action.payload};
    }else if(action.type == TOGGLE_HEADER){
        return {...state, "header":  action.header};
    }else if(action.type == LOGOUT){
        return {...state, "payload": null, "header":"HOME"}
    }else if(action.type == LOGIN_MODAL_OPEN){
        return {...state, "loginModal": true, "registerModal":false, "forgetPassword":false}
    }else if(action.type == LOGIN_MODAL_CLOSE){
        return {...state, "loginModal": false, "registerModal":false, "forgetPassword":false}
    }else if(action.type == FORGET_PASSWORD_MODAL_OPEN){
        return {...state, "forgetPassword":true, "registerModal": false, "loginModal":false}
    }else if(action.type == FORGET_PASSWORD_MODAL_CLOSE){
        return {...state, "forgetPassword":false, "registerModal": false, "loginModal":false}
    }else if(action.type == REGISTER_MODAL_OPEN){
        return {...state, "registerModal": true, "loginModal":false, "forgetPassword":false}
    }else if(action.type == REGISTER_MODAL_CLOSE){
        return {...state, "registerModal": false, "loginModal":false, "forgetPassword":false}
    }else if(action.type == PROFILE_MODAL_OPEN){
        return {...state, "profile": true}
    }else if(action.type == PROFILE_MODAL_CLOSE){
        return {...state, "profile": false }
    }
    return state;
}