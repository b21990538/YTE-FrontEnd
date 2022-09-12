import React, {useState} from 'react';
import {Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import Timetable from "./Timetable";
import TypeSelector from "../../component/TypeSelector";
import axios from "axios";

const CourseTypes = [
    "REQUIRED",
    "ELECTIVE"
];
let lastCallTime = Date.now();

function AddCourse({isOpen, close, submit}) {

    const [formState, setFormState] = useState({});
    const [type, setType] = useState("REQUIRED");
    const [timeSlots, setTimeSlots] = useState([{}]);
    const [lectOptions, setLectOptions] = useState([]);

    function onFormChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const newState = {...formState};
        newState[name] = value;
        setFormState(newState);
    }

    async function handleLectAutocomplete(event, newValue) {
        const newState = {...formState};
        newState.lectUsername = newValue;
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
            const response = await axios.get(`/auto-lecturer/${newValue}`);
            setLectOptions(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    function prepareAndSubmit() {
        formState.timeSlots = timeSlots;
        formState.type = type;
        submit(formState);
    }

    return <Dialog open={isOpen} fullWidth maxWidth={"lg"}>
        <DialogTitle>Add Course</DialogTitle>
        <DialogContent>
            <Timetable setSlots={setTimeSlots}></Timetable>
            <TextField label="Name" variant="outlined" fullWidth
                       onChange={onFormChange} margin={"normal"}
                       name={"name"}/>
            <TypeSelector setType={setType}
                          value={type} options={CourseTypes}/>
            <TextField label="Course Code" variant="outlined" fullWidth
                       onChange={onFormChange} margin={"normal"}
                       name={"code"}/>
            <TextField label="Room" variant="outlined" fullWidth
                       onChange={onFormChange} margin={"normal"}
                       name={"room"}/>
            <Autocomplete
                freeSolo
                options={lectOptions}
                onInputChange={handleLectAutocomplete}
                renderInput={(params) =>
                    <TextField {...params} fullWidth
                               label="Lecturer Username"
                               margin={"normal"} />}/>
            <TextField label="Course Description" variant="outlined" fullWidth
                       onChange={onFormChange} margin={"normal"} multiline
                       name={"description"}/>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => close()} color="secondary">Cancel</Button>
            <Button onClick={prepareAndSubmit}>Submit</Button>
        </DialogActions>
    </Dialog>;
}

export default AddCourse;