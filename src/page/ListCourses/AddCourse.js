import React, {useState} from 'react';
import {Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import Timetable from "./Timetable";
import TypeSelector from "../../component/TypeSelector";
import CourseTypes from "../../values/CourseTypes";
import GetAutocompleteData from "../../function/GetAutocompleteData";

function AddCourse({isOpen, close, submit}) {

    const [formState, setFormState] = useState({});
    const [type, setType] = useState("REQUIRED");
    const [timeSlots, setTimeSlots] = useState([]);
    const [lectOptions, setLectOptions] = useState([]);
    const [roomOptions, setRoomOptions] = useState([]);

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

        await GetAutocompleteData(newValue, setLectOptions, "/auto-lecturer/");
    }

    async function handleRoomAutocomplete(event, newValue) {
        const newState = {...formState};
        newState.room = newValue;
        setFormState(newState);

        await GetAutocompleteData(newValue, setRoomOptions, "/auto-room/");
    }

    function prepareAndSubmit() {
        formState.timeSlots = timeSlots;
        formState.type = type;
        submit(formState);
    }

    function resetStateAndClose() {
        setFormState({});
        setType("REQUIRED");
        setTimeSlots([]);
        close();
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
            <Autocomplete
                freeSolo
                options={roomOptions}
                onInputChange={handleRoomAutocomplete}
                renderInput={(params) =>
                    <TextField {...params} fullWidth
                               label="Room"
                               margin={"normal"} />}/>
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
            <Button onClick={resetStateAndClose} color="secondary">Cancel</Button>
            <Button onClick={prepareAndSubmit}>Submit</Button>
        </DialogActions>
    </Dialog>;
}

export default AddCourse;