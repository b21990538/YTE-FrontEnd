import React, {useEffect, useState} from 'react';
import {Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import Timetable from "./Timetable";
import TypeSelector from "../../component/TypeSelector";
import axios from "axios";

const CourseTypes = [
    "REQUIRED",
    "ELECTIVE"
];
let lastCallTime = Date.now();

function EditCourse({isOpen, close, submit, id}) {

    const [formState, setFormState] = useState({
        name : "",
        code : "",
        room : "",
        lectUsername : "",
        description : "",
    });
    const [type, setType] = useState("REQUIRED");
    const [timeSlots, setTimeSlots] = useState([{}]);
    const [lectOptions, setLectOptions] = useState([]);
    const [startState, setStartState] = useState([]);

    useEffect(() => {
        if (isOpen) {
            fetchCourse().then();
        }
    }, [isOpen]);

    async function fetchCourse() {
        const response = await axios.get(`/courses/${id}`);
        formState.name = response.data.name;
        formState.code = response.data.code;
        formState.room = response.data.room;
        formState.lectUsername = response.data.lectUsername;
        formState.description = response.data.description;

        setType(response.data.type);

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
        setTimeSlots(response.data.timeSlots);
    }

    function onFormChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const newState = {...formState};
        newState[name] = value;
        setFormState(newState);
    }

    function handleLectAutocomplete(event) {
        onFormChange(event);
        if (event.target.value === "") {
            return;
        }
        const now = Date.now();
        if (now - lastCallTime < 400) {
            return;
        }
        // TODO get lecturer options
        lastCallTime = now;
    }

    function prepareAndSubmit() {
        formState.timeSlots = timeSlots;
        formState.type = type;
        submit(formState);
    }

    return <Dialog open={isOpen} fullWidth maxWidth={"lg"}>
        <DialogTitle>Edit Course ID: {id}</DialogTitle>
        <DialogContent>
            <Timetable setSlots={setTimeSlots} startState={startState}></Timetable>
            <TextField label="Name" variant="outlined" fullWidth
                       onChange={onFormChange} margin={"normal"}
                       name={"name"} value={formState.name}/>
            <TypeSelector setType={setType}
                          value={type} options={CourseTypes}/>
            <TextField label="Course Code" variant="outlined" fullWidth
                       onChange={onFormChange} margin={"normal"}
                       name={"code"} value={formState.code}/>
            <TextField label="Room" variant="outlined" fullWidth
                       onChange={onFormChange} margin={"normal"}
                       name={"room"} value={formState.room}/>
            <Autocomplete
                freeSolo
                options={lectOptions} value={formState.lectUsername}
                renderInput={(params) =>
                    <TextField {...params} fullWidth
                               label="Lecturer Username"
                               margin={"normal"} name={"lectUsername"}
                               onChange={handleLectAutocomplete}/>}/>
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

export default EditCourse;