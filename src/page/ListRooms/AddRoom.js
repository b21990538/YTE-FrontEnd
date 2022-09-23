import React, {useState} from 'react';
import {
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    TextField
} from "@mui/material";

function AddRoom({isOpen, close, submit}) {

    const [formState, setFormState] = useState({
        hasProjection: false,
        hasComputer: false,
        hasAirCond: false,
        hasWindow: false,
    });

    function onFormChange(event) {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        });
    }

    function handleCheckBoxChange(event) {
        setFormState({
            ...formState,
            [event.target.name]: event.target.checked,
        });
    }

    function resetStateAndClose() {
        setFormState({});
        close();
    }

    return <Dialog open={isOpen} fullWidth maxWidth={"md"}>
        <DialogTitle>Add Room</DialogTitle>
        <DialogContent>
            <TextField label="Name" variant="outlined" fullWidth
                       onChange={onFormChange} margin={"normal"}
                       name={"name"}/>
            <TextField label="Capacity" variant="outlined" fullWidth
                       onChange={onFormChange} margin={"normal"}
                       name={"capacity"} type={"number"}/>
            <FormControlLabel control={
                <Checkbox onChange={handleCheckBoxChange} name="hasProjection"/>
            } label="Has Projection"/>
            <FormControlLabel control={
                <Checkbox onChange={handleCheckBoxChange} name="hasComputer"/>
            } label="Has Computer"/>
            <FormControlLabel control={
                <Checkbox onChange={handleCheckBoxChange} name="hasAirCond"/>
            } label="Has Air Conditioning"/>
            <FormControlLabel control={
                <Checkbox onChange={handleCheckBoxChange} name="hasWindow"/>
            } label="Has Window"/>
        </DialogContent>
        <DialogActions>
            <Button onClick={resetStateAndClose} color="secondary">Cancel</Button>
            <Button onClick={() => submit(formState)}>Submit</Button>
        </DialogActions>
    </Dialog>;
}

export default AddRoom;