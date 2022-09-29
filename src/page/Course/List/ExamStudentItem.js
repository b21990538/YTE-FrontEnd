import React, {useEffect, useState} from 'react';
import {Button, ListItem, ListItemText} from "@mui/material";
import {toast} from "react-toastify";
import axios from "axios";
import GradeDetails from "./GradeData/GradeDetails";

function ExamStudentItem({exam}) {

    const [score, setScore] = useState();
    const [gradeData, setGradeData] = useState([]);
    const [isDetailsOpen, setDetailsOpen] = useState(false);

    useEffect(() => {
        fetchScore().then();
        fetchGradeData().then();
    }, []);

    async function fetchScore() {
        try {
            const response = await axios.get(`/exam-grade-student/${exam.id}`);
            setScore(response.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    async function fetchGradeData() {
        try {
            const response = await axios.get(`/exam-grade/grade-data/${exam.id}`);
            setGradeData(response.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return <ListItem >
        <ListItemText
            primary={exam.name + " room:" + exam.roomName
                + " date:" + exam.startTime}
            secondary={exam.info}
        />
        <div>Score: {score ? score : "-"}</div>
        <Button onClick={() => setDetailsOpen(true)} variant={"contained"}>Details</Button>
        <GradeDetails isOpen={isDetailsOpen} close={() => setDetailsOpen(false)} data={gradeData}/>
    </ListItem>;
}

export default ExamStudentItem;