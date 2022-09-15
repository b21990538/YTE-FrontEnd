import React, {useEffect, useState} from 'react';
import {Button, ListItem, ListItemText} from "@mui/material";
import {toast} from "react-toastify";
import axios from "axios";

function ExamStudentItem({exam}) {

    const [score, setScore] = useState();

    useEffect(()=> {
        fetchScore().then();
    },[]);

    async function fetchScore() {
        try {
            const response = await axios.get(`/exam-grade-student/${exam.id}`);
            setScore(response.data);
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return <ListItem>
        <ListItemText
            primary={exam.name + " room:" + exam.roomName
                + " date:" + exam.startTime}
            secondary={exam.info}
        />
        <div>Score: {score ? score: "-"}</div>
    </ListItem>;
}

export default ExamStudentItem;