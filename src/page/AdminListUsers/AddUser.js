import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import TypeSelector from "../../component/TypeSelector";
import TypeList from "../../values/TypeList";
import axios from "axios";
import {toast} from "react-toastify";

function AddUser({isOpen, close}) {

    const [formState, setFormState] = useState({});
    const [type, setType] = useState("STUDENT");

    const [username, setUsername] = useState(null);
    const [pass, setPass] = useState(null);

    function onFormChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const newState = {...formState};
        newState[name] = value;
        setFormState(newState);
    }

    async function prepareAndSubmit() {
        formState.type = type;
        const response = await axios.post("/addUser", formState);
        setUsername(response.data.username);
        setPass(response.data.password);
    }

    return <Dialog open={isOpen} fullWidth maxWidth={"md"}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
            <TypeSelector setType={setType}
                          value={type} options={TypeList}/>
            <TextField label="Name" variant="outlined" fullWidth
                       onChange={onFormChange} margin={"normal"}
                       name={"name"}/>
            <TextField label="Surname" variant="outlined" fullWidth
                       onChange={onFormChange} margin={"normal"}
                       name={"surname"}/>
            <TextField label="Email" variant="outlined" fullWidth
                       onChange={onFormChange} margin={"normal"}
                       name={"email"}/>
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
        </DialogContent>
        <DialogActions>
            <Button onClick={() => close()} color="secondary">Close</Button>
            <Button onClick={prepareAndSubmit}>Submit</Button>
        </DialogActions>
    </Dialog>;
}

export default AddUser;