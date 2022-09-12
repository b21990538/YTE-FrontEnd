import React, {useState} from 'react';
import {Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import Timetable from "../ListCourses/Timetable";
import TypeSelector from "../../component/TypeSelector";

let lastCallTime = Date.now();
function AddAssistant({isOpen, close, submit}) {

    const [formState, setFormState] = useState({});
    const [assistOptions, setAssistOptions] = useState([]);

    function onFormChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const newState = {...formState};
        newState[name] = value;
        setFormState(newState);
    }

    function handleAssistAutocomplete(event) {
        onFormChange(event);
        if (event.target.value === "") {
            return;
        }
        const now = Date.now();
        if (now - lastCallTime < 400) {
            return;
        }
        // TODO get assistant options
        lastCallTime = now;
    }

    function prepareAndSubmit() {
        submit(formState);
    }

    return <Dialog open={isOpen} fullWidth maxWidth={"sm"}>
        <DialogTitle>Add Assitant</DialogTitle>
        <DialogContent>
            <Autocomplete
                freeSolo
                options={assistOptions}
                renderInput={(params) =>
                    <TextField {...params} fullWidth
                               label="Assistant Username"
                               margin={"normal"} name={"assistantUsername"}
                               onChange={handleAssistAutocomplete}/>}/>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => close()} color="secondary">Cancel</Button>
            <Button onClick={prepareAndSubmit}>Submit</Button>
        </DialogActions>
    </Dialog>;
}

export default AddAssistant;