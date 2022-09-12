import React, {useContext} from 'react';
import axios from "axios";
import UserContext from "../context/UserContext";
import {Button} from "@mui/material";
import {toast} from "react-toastify";

function LogoutButton() {

    const {setUserData} = useContext(UserContext);

    function handleLogout() {
        axios.post("/logout")
            .then(() => {
                toast.success("Logged out");
            })
            .catch(error => {
                console.log(error);
            })
        setUserData({id: -1, username: "", authorities:[]});
    }

    return <Button onClick={handleLogout} variant={"contained"}
    color={"error"}>Logout</Button>;
}

export default LogoutButton;