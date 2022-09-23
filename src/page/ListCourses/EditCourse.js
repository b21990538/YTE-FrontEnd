import React, {useEffect, useState} from 'react';
import {Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import Timetable from "./Timetable";
import TypeSelector from "../../component/TypeSelector";
import axios from "axios";
import PrepCellsFromResponse from "../../function/PrepCellsFromResponse";
import GetAutocompleteData from "../../function/GetAutocompleteData";
import CourseTypes from "../../values/CourseTypes";

function EditCourse({isOpen, close, submit, id}) {

    const [formState, setFormState] = useState({
        name : "",
        code : "",
        room : "",
        lectUsername : "",
        description : "",
    });
    const [type, setType] = useState("REQUIRED");
    const [timeSlots, setTimeSlots] = useState([]);
    const [lectOptions, setLectOptions] = useState([]);
    const [roomOptions, setRoomOptions] = useState([]);
    const [startState, setStartState] = useState([]);

    useEffect(() => {
        if (isOpen) {
            fetchCourse().then();
        }
    }, [isOpen]);

    async function fetchCourse() {  // TODO use setFormState
        const response = await axios.get(`/courses/${id}`);
        formState.name = response.data.name;
        formState.code = response.data.code;
        formState.room = response.data.room;
        formState.lectUsername = response.data.lectUsername;
        formState.description = response.data.description;

        setType(response.data.type);

        PrepCellsFromResponse(response, setStartState);
        setTimeSlots(response.data.timeSlots);
    }

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
            <Autocomplete
                freeSolo
                options={roomOptions} value={formState.room}
                onInputChange={handleRoomAutocomplete}
                renderInput={(params) =>
                    <TextField {...params} fullWidth
                               label="Room"
                               margin={"normal"} />}/>
            <Autocomplete
                freeSolo
                options={lectOptions} value={formState.lectUsername}
                onInputChange={handleLectAutocomplete}
                renderInput={(params) =>
                    <TextField {...params} fullWidth
                               label="Lecturer Username"
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

export default EditCourse;