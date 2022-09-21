import React, {useState} from 'react';
import {Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import GetAutocompleteData from "../../function/GetAutocompleteData";

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

        await GetAutocompleteData(newValue, setRoomOptions, "/auto-room/");
    }

    function resetStateAndClose() {
        setFormState({});
        close();
    }

    return <Dialog open={isOpen} fullWidth maxWidth={"sm"}>
        <DialogTitle>Add Exam</DialogTitle>
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