import React, {useState} from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import {Button, ListItem, ListItemText, TextField} from "@mui/material";
import FileDownload from "js-file-download";

function HomeworkGradeItem({homeworkGrade}) {

    const [score, setScore] = useState(null);

    async function updateScore() {
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

    return <ListItem>
        <ListItemText
            primary={homeworkGrade.studentName + " " + homeworkGrade.studentSurname}
            secondary={homeworkGrade.score ? "Score: " + homeworkGrade.score :""}
        />
        <TextField type={"number"} onChange={
            (e) => setScore(e.target.value)
        }></TextField>
        <Button onClick={updateScore} variant={"contained"}>Set Score</Button>
        {homeworkGrade.fileName ? <Button onClick={handleDownload} variant={"contained"}>Download File</Button>: ""}
    </ListItem>;
}

export default HomeworkGradeItem;