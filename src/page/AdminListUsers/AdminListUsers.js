import React, {useEffect, useState} from 'react';
import ListUsers from "./ListUsers/ListUsers";
import axios from "axios";

function AdminListUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    async function fetchStudents() {
        const response = await axios.get("/getUsers");
        setUsers(response.data);
    }

    return (
        <div>
            <ListUsers users={users}/>
        </div>
    );
}

export default AdminListUsers;