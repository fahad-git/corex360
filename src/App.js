import {BrowserRouter as Router} from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Main from "./components/Main"
import { useState } from "react";

import HeaderContext from './HeaderContext';

function App() {

  var [header, setHeader] = useState(true);

  console.log("Header is here: " + header);

  return (
    <Router>
      <div >
      <header>
        { header ? <Navbar /> : <Header/> }
      </header>
        <Main setHeader = {setHeader} />
      </div>
      
    </Router>

  );
}

export default App;
