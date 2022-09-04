import React, {useState} from 'react';
import DropdownList from "../component/DropdownList";
import axios from "axios";
import {toast} from "react-toastify";
import TypeList from "../values/TypeList";

function AdminAddUser() {



    const [username, setUsername] = useState(null);
    const [pass, setPass] = useState(null);
    const [type, setType] = useState("STUDENT");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");

    function handleTypeSelect(event) {
        setType(event.target.value);
    }

    function handleAddUser() {
        axios.post("/addUser", {
            type: type,
            name: name,
            surname: surname,
            email: email
        })
            .then((response) => {
                console.log(response);
                setUsername(response.data.username);
                setPass(response.data.password);
            })
            .catch((error) => {
                console.log(error);         // TODO error print
            })
    }

    return <div className={"addUser-main"}>
        <h2>Add User</h2>
        <DropdownList onChange={handleTypeSelect} value={type} label={"select user type"} options={TypeList}/>
        <b>Name</b>
        <input onChange={(e) => setName(e.target.value)}/>
        <b>Surname</b>
        <input onChange={(e) => setSurname(e.target.value)}/>
        <b>Email</b>
        <input onChange={(e) => setEmail(e.target.value)}/>
        <button onClick={handleAddUser}>Add User</button>
        <div>{username ? "Generated Username:" + username: ""}</div>
        <div>{pass ? "Generated Password:" + pass: ""}</div>
    </div>;
}

export default AdminAddUser;