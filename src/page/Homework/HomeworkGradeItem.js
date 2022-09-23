import React, {useState} from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import {Button, ListItem, ListItemText, Paper, TextField} from "@mui/material";
import FileDownload from "js-file-download";
import ScoreSetter from "../../function/ScoreSetter";

function HomeworkGradeItem({homeworkGrade}) {

    const [score, setScore] = useState("");

    async function updateScore() {
        if (score === "") {
            toast.warn("Score value is not given");
            return;
        }
        try {
            const response = await axios.put(`/hw-grade/${homeworkGrade.homeworkId}/${homeworkGrade.studentId}/${score}`);
            toast.success(response.data.message);
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
    }

    async function handleDownload() {
        try {
            const response = await axios.get(`/hw-grade/${homeworkGrade.homeworkId}/${homeworkGrade.studentId}`,
                {responseType: "blob"});
            const filename = response.headers["content-disposition"]
                .split(';')
                .find(n => n.includes('filename='))
                .replace('filename=\"', '')
                .replace("\"", '')
                .trim()
            ;
            FileDownload(response.data, filename);
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
                primary={homeworkGrade.studentName + " " + homeworkGrade.studentSurname}
                secondary={homeworkGrade.score !== null ? "Score: " + homeworkGrade.score :""}
            />
            <TextField value={score} type={"number"} onChange={handleScoreField} sx={{mx: 1}}></TextField>
            <Button onClick={updateScore} variant={"contained"}>Set Score</Button>
            {homeworkGrade.fileName ? <Button onClick={handleDownload} variant={"contained"}>Download File</Button>: ""}
        </Paper>
    </ListItem>;
}

export default HomeworkGradeItem;