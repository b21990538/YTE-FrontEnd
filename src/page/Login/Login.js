import React, {useContext, useState} from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import UserContext from "../../context/UserContext";
import {useNavigate} from "react-router-dom";
import {Button, TextField} from "@mui/material";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {setUserData} = useContext(UserContext);
    const navigate = useNavigate();

    function handleLogin() {
        axios.post("/login", {
            username: username,
            password: password
            })
            .then((response) => {
                localStorage.setItem("user_data", JSON.stringify(response.data));  // TODO get info from server about user roles, id...
                setUserData(response.data);
                navigate("/");
            })
            .catch((error) => {
                console.log(error);         // TODO error print
                toast.warn(error.response.data);
            })
    }

    return <div className="login-main">
        <h1>YTE Student Management System</h1>
        <TextField id="outlined-basic" label="Username" variant="outlined"
                   onChange={(e) => setUsername(e.target.value)} margin={"normal"}/>
        <TextField id="outlined-password-input" label="Password" variant="outlined"
                   onChange={(e) => setPassword(e.target.value)} type="password" margin={"normal"}/>
        <Button onClick={handleLogin} variant={"outlined"}>Login</Button>
    </div>;
}

export default Login;