import React, {useContext, useEffect} from 'react';
import Login from "../page/Login/Login";
import axios from "axios";
import UserContext from "../context/UserContext";
import Navbar from "./Navbar";
import RoleRoutes from "./RoleRoutes";

function AppWrapper() {

    const {userData, setUserData} = useContext(UserContext);

    useEffect(() => {
        axios.get("/sessionValid")
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {})
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