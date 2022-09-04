import React, {useContext} from 'react';
import axios from "axios";
import UserContext from "../context/UserContext";

function LogoutButton() {

    const {setUserData} = useContext(UserContext);

    function handleLogout() {
        axios.post("/logout")
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
        localStorage.removeItem("user_data");
        setUserData({id: -1});  // TODO logout handling
    }

    return (
        <button onClick={handleLogout} className={"logout-button"}>
            Logout
        </button>
    );
}

export default LogoutButton;