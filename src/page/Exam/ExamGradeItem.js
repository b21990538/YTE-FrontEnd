import React, {useState} from 'react';
import {Button, ListItem, ListItemText, TextField} from "@mui/material";
import {toast} from "react-toastify";
import axios from "axios";

function ExamGradeItem({examGrade}) {

    const [score, setScore] = useState(null);

    async function updateScore() {
        try {
            const response = await axios.put(`/exam-grade/${examGrade.examId}/${examGrade.studentId}/${score}`);
            toast.success(response.data.message);
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return <ListItem>
        <ListItemText
            primary={examGrade.studentName + " " + examGrade.studentSurname}
            secondary={examGrade.score ? "Score: " + examGrade.score :""}
        />
        <TextField type={"number"} onChange={
            (e) => setScore(e.target.value)
        }></TextField>
        <Button onClick={updateScore} variant={"contained"}>Set Score</Button>
    </ListItem>;
}

export default ExamGradeItem;