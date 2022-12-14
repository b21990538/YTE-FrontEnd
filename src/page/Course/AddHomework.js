import React, {useState} from 'react';
import {Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import GetAutocompleteData from "../../function/GetAutocompleteData";

function AddHomework({isOpen, close, submit, courseId}) {

    const [formState, setFormState] = useState({});
    const [assistOptions, setAssistOptions] = useState([]);
    const [file, setFile] = useState();

    function onFormChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const newState = {...formState};
        newState[name] = value;
        setFormState(newState);
    }

    async function handleAssistAutocomplete(event, newValue) {
        const newState = {...formState};
        newState.assistantUsername = newValue;
        setFormState(newState);

        await GetAutocompleteData(newValue, setAssistOptions, "/auto-assistant/");
    }

    function handleFileSelect(event) {
        setFile(event.target.files[0]);
    }

    function prepareAndSubmit() {
        let formData = new FormData();
        formData.append("file", file);
        formState.courseId = courseId;
        formData.append("homework", new Blob([JSON.stringify(formState)],
            {
                type: "application/json"
            }));
        submit(formData);
    }

    function resetStateAndClose() {
        setFormState({});
        close();
    }

    return <Dialog open={isOpen} fullWidth maxWidth={"sm"}>
        <DialogTitle>Add Homework</DialogTitle>
        <DialogContent>
            <TextField label="Homework info" variant="outlined" fullWidth
                       onChange={onFormChange} margin={"normal"} multiline
                       name={"info"}/>
            <TextField label="Homework due date" variant="outlined" fullWidth
                       onChange={onFormChange} margin={"normal"}
                       name={"dueDateTime"} type="datetime-local"
                       InputLabelProps={{
                           shrink: true,
                       }}/>
            <Autocomplete
                freeSolo
                options={assistOptions}
                onInputChange={handleAssistAutocomplete}
                renderInput={(params) =>
                    <TextField {...params} fullWidth
                               label="Assistant Username"
                               margin={"normal"}/>}/>
            <input onChange={handleFileSelect} name={"info"} type={"file"}/>
        </DialogContent>
        <DialogActions>
            <Button onClick={resetStateAndClose} color="secondary">Cancel</Button>
            <Button onClick={prepareAndSubmit}>Submit</Button>
        </DialogActions>
    </Dialog>;
}

export default AddHomework;