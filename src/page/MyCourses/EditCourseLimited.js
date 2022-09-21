import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import Timetable from "../ListCourses/Timetable";
import {toast} from "react-toastify";
import PrepCellsFromResponse from "../../function/PrepCellsFromResponse";
import GetAutocompleteData from "../../function/GetAutocompleteData";

function EditCourseLimited({isOpen, close, submit, id}) {

    const [formState, setFormState] = useState({
        room: "",
        description: "",
    });
    const [timeSlots, setTimeSlots] = useState([]);
    const [startState, setStartState] = useState([]);
    const [roomOptions, setRoomOptions] = useState([]);

    useEffect(() => {
        if (isOpen) {
            fetchCourse().then();
        }
    }, [isOpen]);

    async function fetchCourse() {
        try {
            const response = await axios.get(`/courses/${id}`);
            formState.room = response.data.room;
            formState.description = response.data.description;

            PrepCellsFromResponse(response, setStartState);
            setTimeSlots(response.data.timeSlots);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    function onFormChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const newState = {...formState};
        newState[name] = value;
        setFormState(newState);
    }

    async function handleRoomAutocomplete(event, newValue) {
        const newState = {...formState};
        newState.room = newValue;
        setFormState(newState);

        await GetAutocompleteData(newValue, setRoomOptions, "/auto-room/");
    }

    function prepareAndSubmit() {
        formState.timeSlots = timeSlots;
        submit(formState);
    }

    return <Dialog open={isOpen} fullWidth maxWidth={"lg"}>
        <DialogTitle>Edit Course ID: {id}</DialogTitle>
        <DialogContent>
            <Timetable setSlots={setTimeSlots} startState={startState}></Timetable>
            <Autocomplete
                freeSolo
                options={roomOptions} value={formState.room}
                onInputChange={handleRoomAutocomplete}
                renderInput={(params) =>
                    <TextField {...params} fullWidth
                               label="Room"
                               margin={"normal"}/>}/>
            <TextField label="Course Description" variant="outlined" fullWidth
                       onChange={onFormChange} margin={"normal"} multiline
                       name={"description"} value={formState.description}/>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => close()} color="secondary">Cancel</Button>
            <Button onClick={prepareAndSubmit}>Submit</Button>
        </DialogActions>
    </Dialog>;
}

export default EditCourseLimited;