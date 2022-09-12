import React, {useState} from 'react';
import {Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import Timetable from "./Timetable";
import TypeSelector from "../../component/TypeSelector";

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
        <DialogTitle>Add Course</DialogTitle>
        <DialogContent>
            <Timetable setSlots={setTimeSlots} ></Timetable>
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
                renderInput={(params) =>
                    <TextField {...params} fullWidth
                               label="Lecturer Username"
                               margin={"normal"} name={"lectUsername"}
                               onChange={handleLectAutocomplete}/>}/>
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