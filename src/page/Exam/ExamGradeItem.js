import React, {useState} from 'react';
import {Button, ListItem, ListItemText, Paper, TextField} from "@mui/material";
import {toast} from "react-toastify";
import axios from "axios";
import ScoreSetter from "../../function/ScoreSetter";

function ExamGradeItem({examGrade}) {

    const [score, setScore] = useState("");

    async function updateScore() {
        if (score === "") {
            toast.warn("Score value is not given");
            return;
        }
        try {
            const response = await axios.put(`/exam-grade/${examGrade.examId}/${examGrade.studentId}/${score}`);
            toast.success(response.data.message);
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
    }

    function handleScoreField(e) {
        ScoreSetter(e.target.value, setScore);
    }

    return <ListItem>
        <Paper sx={{flexDirection: "row", display: "flex", width : 1, alignItems: "center", padding: 0.5}}>
            <ListItemText
                primary={examGrade.studentName + " " + examGrade.studentSurname}
                secondary={examGrade.score !== null ? "Score: " + examGrade.score :""}
            />
            <TextField value={score} type={"number"} onChange={handleScoreField} sx={{mx: 1}}></TextField>
            <Button onClick={updateScore} variant={"contained"}>Set Score</Button>
        </Paper>
    </ListItem>;
}

export default ExamGradeItem;