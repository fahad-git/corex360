import {BrowserRouter as Router} from "react-router-dom";
import Navbar from "./components/HeadersAndFooters/Navbar";
import Header from "./components/HeadersAndFooters/Header";
import CommonHeader from "./components/HeadersAndFooters/CommonHeader";

import Main from "./components/Main"
import {UserContextProvider, useUserContext} from './components/UserContext';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { Nav } from "react-bootstrap";


function App() {
  return (

      <Router>
        <UserContextProvider>
          <div >
            <RenderHeader />
            <Main  />
          </div>      
        </UserContextProvider>
      </Router>

  );
}

function RenderHeader(){
  const {state, dispatch} = useUserContext();
  return (
        <header>
            { state.header == "HOME" ? <Navbar /> : state.header == "ADMIN" ? <Header/>  : <CommonHeader /> }
        </header>
  )
}

export default App;
