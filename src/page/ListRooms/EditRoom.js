import React, {useEffect, useState} from 'react';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    TextField
} from "@mui/material";
import axios from "axios";

function EditRoom({isOpen, close, submit, id}) {

    const [formState, setFormState] = useState({
        name: "",
        hasProjection: false,
        hasComputer: false,
        hasAirCond: false,
        hasWindow: false,
        capacity: 0
    });

    useEffect(() => {
        if (isOpen) {
            fetchRoom().then();
        }
    }, [isOpen]);

    async function fetchRoom() {
        const response = await axios.get(`/rooms/${id}`);
        setFormState(response.data);
    }

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

    return <Dialog open={isOpen} fullWidth maxWidth={"md"}>
        <DialogTitle>Edit Room ID: {id}</DialogTitle>
        <DialogContent>
            <TextField label="Name" variant="outlined" fullWidth
                       onChange={onFormChange} margin={"normal"}
                       name={"name"} value={formState.name}/>
            <TextField label="Capacity" variant="outlined" fullWidth
                       onChange={onFormChange} margin={"normal"}
                       name={"capacity"} type={"number"} value={formState.capacity}/>
            <FormControlLabel control={
                <Checkbox onChange={handleCheckBoxChange} name="hasProjection" checked={formState.hasProjection}/>
            } label="Has Projection"/>
            <FormControlLabel control={
                <Checkbox onChange={handleCheckBoxChange} name="hasComputer" checked={formState.hasComputer}/>
            } label="Has Computer"/>
            <FormControlLabel control={
                <Checkbox onChange={handleCheckBoxChange} name="hasAirCond" checked={formState.hasAirCond}/>
            } label="Has Air Conditioning"/>
            <FormControlLabel control={
                <Checkbox onChange={handleCheckBoxChange} name="hasWindow" checked={formState.hasWindow}/>
            } label="Has Window"/>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => close()} color="secondary">Cancel</Button>
            <Button onClick={() => submit(formState)}>Submit</Button>
        </DialogActions>
    </Dialog>;
}

export default EditRoom;