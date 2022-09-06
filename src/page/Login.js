import React, {useContext, useState} from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import UserContext from "../context/UserContext";
import {useNavigate} from "react-router-dom";

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
        <b>Username</b>
        <input onChange={(e) => setUsername(e.target.value)}/>
        <b>Password</b>
        <input type={"password"} onChange={(e) => setPassword(e.target.value)}/>
        <button className={"login-button"} onClick={handleLogin}>Login</button>
    </div>;
}

export default Login;