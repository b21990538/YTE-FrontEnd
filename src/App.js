import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router} from "react-router-dom";
import AppWrapper from "./component/AppWrapper";
import UserContext from "./context/UserContext";
import React, {useState} from "react";
import {ToastContainer} from "react-toastify";

function App() {

    const [userData, setUserData] = useState({id: -1});

    const userContextData = {
        userData,
        setUserData
    }

    return <Router>
        <UserContext.Provider value={userContextData}>
            <AppWrapper/>
            <ToastContainer/>
        </UserContext.Provider>
    </Router>;
}

export default App;
