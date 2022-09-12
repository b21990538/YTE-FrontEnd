import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import Timetable from "../ListCourses/Timetable";
import TypeSelector from "../../component/TypeSelector";

function EditCourseLimited({isOpen, close, submit, id}) {

    const [formState, setFormState] = useState({
        room : "",
        description : "",
    });
    const [timeSlots, setTimeSlots] = useState([{}]);
    const [startState, setStartState] = useState([]);

    useEffect(() => {
        if (isOpen) {
            fetchCourse().then();
        }
    }, [isOpen]);

    async function fetchCourse() {
        const response = await axios.get(`/courses/${id}`);
        formState.room = response.data.room;
        formState.description = response.data.description;

        let cellState = [
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false]
        ];

        for (const timeSlot of response.data.timeSlots) {
            cellState[timeSlot.slot][timeSlot.day] = true;
        }
        setStartState(cellState);
    }

    function onFormChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const newState = {...formState};
        newState[name] = value;
        setFormState(newState);
    }

    function prepareAndSubmit() {
        formState.timeSlots = timeSlots;
        submit(formState);
    }

    return <Dialog open={isOpen} fullWidth maxWidth={"lg"}>
        <DialogTitle>Edit Course ID: {id}</DialogTitle>
        <DialogContent>
            <Timetable setSlots={setTimeSlots} startState={startState}></Timetable>
            <TextField label="Room" variant="outlined" fullWidth
                       onChange={onFormChange} margin={"normal"}
                       name={"room"} value={formState.room}/>
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