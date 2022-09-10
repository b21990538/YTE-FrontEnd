import React, {useState} from 'react';
import TypeSelector from "../../component/TypeSelector";
import axios from "axios";
import {toast} from "react-toastify";
import TypeList from "../../values/TypeList";
import {Button, TextField} from "@mui/material";

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
        <TypeSelector onChange={handleTypeSelect} value={type} options={TypeList}/>
        <TextField label="Name" variant="outlined"
                   onChange={(e) => setName(e.target.value)} margin={"normal"}/>
        <TextField label="Surname" variant="outlined"
                   onChange={(e) => setSurname(e.target.value)} margin={"normal"}/>
        <TextField label="Email" variant="outlined"
                   onChange={(e) => setEmail(e.target.value)} margin={"normal"}/>
        <Button onClick={handleAddUser} variant={"outlined"}>Add User</Button>
        <div>
            {username ?
                <TextField label="Generated Username"
                           InputProps={{readOnly: true,}}
                           value={username} margin={"normal"}/>
                : ""}
        </div>
        <div>
            {pass ?
                <TextField label="Generated Password"
                           InputProps={{readOnly: true,}}
                           value={pass} margin={"normal"}/>
                : ""}
        </div>
    </div>;
}

export default AdminAddUser;