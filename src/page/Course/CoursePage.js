import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import CourseTimetable from "./CourseTimetable";
import axios from "axios";
import {toast} from "react-toastify";
import {Button, Grid} from "@mui/material";
import UserContext from "../../context/UserContext";
import AddExam from "./AddExam";
import AddHomework from "./AddHomework";
import ExamList from "./List/ExamList";
import HomeworkList from "./List/HomeworkList";

function CoursePage() {

    const [course, setCourse] = useState({
        name: "",
        code: "",
        type: "",
        room: "",
        description: "",
        lecturerName: "",
        lecturerSurname: "",
        assistants: [],
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
    const [isAddExamOpen, setAddExamOpen] = useState(false);
    const [isAddHomeworkOpen, setAddHomeworkOpen] = useState(false);

    let {courseId} = useParams();
    const {userData} = useContext(UserContext);
    const role = userData.authorities[0];

    useEffect(() => {
        fetchCourse().then();
    }, []);

    async function fetchCourse() {
        try {
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
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    //TODO refresh lists
    async function handleAddExam(formState) {
        try {
            formState.courseId = courseId;
            const response = await axios.post("/exams", formState);
            toast.success(response.data.message);
            await fetchCourse();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    async function handleAddHomework(formData) {
        try {
            const response = await axios.post("/hw", formData,
                {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                });
            toast.success(response.data.message);
            await fetchCourse();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    let examList = <Grid item xs={12}>
        <ExamList courseId={courseId}/>
    </Grid>;
    let homeworkList = <Grid item xs={12}>
        <HomeworkList courseId={courseId}/>
    </Grid>;
    let addExamButton = <div/>;
    let addHomeworkButton = <div/>;
    if (role === "LECTURER" || role === "ASSISTANT") {
        addExamButton = <Grid item xs={6}>
            <Button variant={"outlined"} fullWidth
                    onClick={() => setAddExamOpen(true)}>Add Exam</Button>
        </Grid>;
        addHomeworkButton = <Grid item xs={6}>
            <Button variant={"outlined"} fullWidth
                    onClick={() => setAddHomeworkOpen(true)}>Add Homework</Button>
        </Grid>;
    }

    return <div className={"coursePage-outer"}>
        <div className={"coursePage-main"}>
            <h2>{course.code}: {course.name} - {course.type}</h2>
            <div>Room: {course.room}</div>
            <div>Lecturer: {course.lecturerName} {course.lecturerSurname}</div>
            <div>{course.assistants.length > 0 ?"Assistants:": ""}</div>
            {course.assistants.map((item) => {
                return <div key={item.id}>{item.name} {item.surname}</div>;
            })}
            <p>Description: {course.description}</p>
            <CourseTimetable cellState={cellState}/>
            <AddExam isOpen={isAddExamOpen}
                     close={() => setAddExamOpen(false)}
                     submit={handleAddExam}/>
            <AddHomework isOpen={isAddHomeworkOpen} courseId={courseId}
                         close={() => setAddHomeworkOpen(false)}
                         submit={handleAddHomework}/>
        </div>
        <div className={"coursePage-side"}>
            <Grid container spacing={2}>
                {addExamButton}
                {addHomeworkButton}
                {examList}
                {homeworkList}
            </Grid>
        </div>
    </div>;
}

export default CoursePage;