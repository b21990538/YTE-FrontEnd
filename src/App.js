import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-table-drag-select/style.css';
import './css/table-drag.css'
import './css/course.css'
import {BrowserRouter as Router} from "react-router-dom";
import AppWrapper from "./component/AppWrapper";
import UserContext from "./context/UserContext";
import React, {useState} from "react";
import {ToastContainer} from "react-toastify";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {

    const [userData, setUserData] = useState({id: -1, username: "", authorities: []});

    const userContextData = {
        userData,
        setUserData
    }

    return <Router>
        <UserContext.Provider value={userContextData}>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <AppWrapper/>
                <ToastContainer theme={"dark"}/>
            </ThemeProvider>
        </UserContext.Provider>
    </Router>;
}

export default App;
