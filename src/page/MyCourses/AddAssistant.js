import React, {useState} from 'react';
import {Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import axios from "axios";

let lastCallTime = Date.now();
function AddAssistant({isOpen, close, submit}) {

    const [formState, setFormState] = useState({});
    const [assistOptions, setAssistOptions] = useState([]);

    async function handleAssistAutocomplete(event, newValue) {
        const newState = {...formState};
        newState.assistantUsername = newValue;
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
            const response = await axios.get(`/auto-assistant/${newValue}`);
            setAssistOptions(response.data);
        }
        catch (error) {
            console.log(error);
        }
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
                onInputChange={handleAssistAutocomplete}
                renderInput={(params) =>
                    <TextField {...params} fullWidth
                               label="Assistant Username"
                               margin={"normal"}/>}/>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => close()} color="secondary">Cancel</Button>
            <Button onClick={prepareAndSubmit}>Submit</Button>
        </DialogActions>
    </Dialog>;
}

export default AddAssistant;