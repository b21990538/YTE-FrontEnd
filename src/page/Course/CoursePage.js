import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import CourseTimetable from "./CourseTimetable";
import axios from "axios";

function CoursePage() {

    const [course, setCourse] = useState({
        name: "",
        code: "",
        type: "",
        room: "",
        description: "",
        lecturerName: "",
        lecturerSurname: "",
        assistants: [{name: "", surname: "", id:0}],
    });
    const [cellState, setcellState] = useState([
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false]
    ]);
    let {courseId} = useParams();

    useEffect(() => {
        fetchCourse().then();
    }, []);

    async function fetchCourse() {
        const response = await axios.get(`/course-page/${courseId}`);

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
        setcellState(cellState);
        setCourse(response.data);
    }

    return <div className={"coursePage-main"}>
        <h2>{course.code}: {course.name} - {course.type}</h2>
        <div>Room: {course.room}</div>
        <div>Lecturer: {course.lecturerName} {course.lecturerSurname}</div>
        <div>Assistants</div>
        {course.assistants.map((item)=> {
            return <div key={item.id}>{item.name} {item.surname}</div>;
        })}
        <p>Description: {course.description}</p>
        <CourseTimetable cellState={cellState}/>
    </div>;
}

export default CoursePage;