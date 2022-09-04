import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Navbar from "./component/Navbar";
import Login from "./page/Login";
import Home from "./page/Home";
import AppWrapper from "./component/AppWrapper";
import UserContext from "./context/UserContext";
import {useState} from "react";

function App() {

    const [userData, setUserData] = useState({id: -1});

    const userContextData = {
        userData,
        setUserData
    }

    return <Router>
        <UserContext.Provider value={userContextData}>
            <AppWrapper/>
        </UserContext.Provider>
    </Router>;
}

export default App;
