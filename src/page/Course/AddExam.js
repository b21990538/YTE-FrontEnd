import React, {useState} from 'react';
import axios from "axios";
import {Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";


let lastCallTime = Date.now();

function AddExam({isOpen, close, submit}) {

    const [formState, setFormState] = useState({});
    const [roomOptions, setRoomOptions] = useState([]);

    function onFormChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const newState = {...formState};
        newState[name] = value;
        setFormState(newState);
    }

    async function handleRoomAutocomplete(event, newValue) {
        const newState = {...formState};
        newState.roomName = newValue;
        setFormState(newState);

        if (newValue === "") {
            return;
        }
        const now = Date.now();
        if (now - lastCallTime < 400) {
            return;
        }
        lastCallTime = now;
        try {
            const response = await axios.get(`/auto-room/${newValue}`);
            setRoomOptions(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    function resetStateAndClose() {
        setFormState({});
        close();
    }

    return <Dialog open={isOpen} fullWidth maxWidth={"sm"}>
        <DialogTitle>Add Course</DialogTitle>
        <DialogContent>
            <TextField label="Name" variant="outlined" fullWidth
                       onChange={onFormChange} margin={"normal"}
                       name={"name"}/>
            <Autocomplete
                freeSolo
                options={roomOptions}
                onInputChange={handleRoomAutocomplete}
                renderInput={(params) =>
                    <TextField {...params} fullWidth
                               label="Room"
                               margin={"normal"}/>}/>
            <TextField label="Exam date and time" variant="outlined" fullWidth
                       onChange={onFormChange} margin={"normal"}
                       name={"startTime"} type="datetime-local"
                       InputLabelProps={{
                           shrink: true,
                       }}/>
            <TextField label="Exam info" variant="outlined" fullWidth
                       onChange={onFormChange} margin={"normal"} multiline
                       name={"info"}/>
        </DialogContent>
        <DialogActions>
            <Button onClick={resetStateAndClose} color="secondary">Cancel</Button>
            <Button onClick={() => submit(formState)}>Submit</Button>
        </DialogActions>
    </Dialog>;
}

export default AddExam;