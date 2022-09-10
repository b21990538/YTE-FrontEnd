import React, {useEffect, useState} from 'react';
import ListUsers from "./ListUsers/ListUsers";
import axios from "axios";

function AdminListUsers() {

    const [users, setUsers] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    console.log(selectedRows);

    useEffect(() => {
        fetchStudents().then();
    }, []);

    async function fetchStudents() {
        const response = await axios.get("/getUsers");
        setUsers(response.data);
    }

    return (
        <div>
            <ListUsers users={users} setRows={setSelectedRows}/>
        </div>
    );
}

export default AdminListUsers;