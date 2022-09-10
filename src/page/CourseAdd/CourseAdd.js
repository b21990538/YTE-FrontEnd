import React, {useState} from 'react';
import Timetable from "./Timetable/Timetable";
import {Autocomplete, Button, TextField} from "@mui/material";
import TypeSelector from "../../component/TypeSelector";
import axios from "axios";
import {toast} from "react-toastify";

const CourseTypes = [
    "REQUIRED",
    "ELECTIVE"
];

function CourseAdd() {

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [type, setType] = useState("REQUIRED");
    const [code, setCode] = useState("");
    const [timeSlots, setTimeSlots] = useState([{}]);
    const [room, setRoom] = useState("");
    const [lecturer, setLecturer] = useState("");
    const [lectOptions, setLectOptions] = useState([]);
    const [lastCallTime, setLastCallTime] = useState(Date.now());

    function handleTypeSelect(event) {
        setType(event.target.value);
    }

    function handleLectAutocomplete(event) {
        setLecturer(event.target.value);
        if (event.target.value === "") {
            return;
        }
        const now = Date.now();
        if (now - lastCallTime < 500) {
            return;
        }
        // TODO get lecturer options
        setLastCallTime(now);
    }

    function handleAddCourse() {
        axios.post("/courses", {
            name: name,
            description: desc,
            type: type,
            code: code,
            timeSlots: timeSlots,
            room: room,
            lectUsername: lecturer
        })
            .then((response) => {
                toast(response.data.message);
            })
            .catch((error) => {
                console.log(error);
                toast(error.data.message);
            })
    }

    return <div className={"courseAdd-main"}>
        <Timetable setSlots={setTimeSlots}></Timetable>
        <div className={"courseAdd-div"}>
            <TextField label="Course Name" variant="outlined"
                       onChange={(e) => setName(e.target.value)}
                       margin={"normal"}/>
            <TypeSelector onChange={handleTypeSelect} value={type} options={CourseTypes}/>
            <TextField label="Course Code" variant="outlined"
                       onChange={(e) => setCode(e.target.value)}
                       margin={"normal"}/>
            <TextField label="Room" variant="outlined"
                       onChange={(e) => setRoom(e.target.value)}
                       margin={"normal"}/>
        </div>
        <div className={"courseAdd-div"}>
            <Autocomplete
                freeSolo
                options={lectOptions}
                renderInput={(params) =>
                    <TextField sx={{width: 250}} {...params}
                               label="Lecturer Username"
                               margin={"normal"}
                               onChange={handleLectAutocomplete}/>}
            />
            <TextField label="Course Description" variant="outlined"
                       onChange={(e) => setDesc(e.target.value)}
                       margin={"normal"} multiline/>
            <Button onClick={handleAddCourse} variant={"outlined"}>Add Course</Button>
        </div>
    </div>;
}

export default CourseAdd;