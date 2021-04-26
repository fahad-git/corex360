import React, { useContext, useReducer } from 'react';
import { createContext } from "react";

import { initialState, reducer } from './Reducers/userReducer'

const UserContext = createContext();

// this is custome hook to reduce code of importing useContext and UserContext again and again
export function useUserContext(){
     return useContext(UserContext);
    }

export function UserContextProvider( {children} ){

    const [state, dispatch] = useReducer(reducer, initialState);
    
    return(
        <UserContext.Provider value = {{ state, dispatch }}>
            { children }
        </UserContext.Provider>
    )
}

