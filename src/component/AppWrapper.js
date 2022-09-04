import React, {useContext, useEffect} from 'react';
import Login from "../page/Login";
import axios from "axios";
import UserContext from "../context/UserContext";
import Navbar from "./Navbar";
import RoleRoutes from "./RoleRoutes";

function AppWrapper() {

    const {userData, setUserData} = useContext(UserContext);

    useEffect(() => {
        axios.get("/sessionValid")
            .then(response => {
                setUserData(JSON.parse(localStorage.getItem("user_data")));
            })
            .catch(error => {
                localStorage.removeItem("user_data");
            })
    }, []);

    if (userData.id < 0) {
        return <Login />;
    }

    return <div>
        <Navbar/>
        <RoleRoutes/>
    </div>;
}

export default AppWrapper;