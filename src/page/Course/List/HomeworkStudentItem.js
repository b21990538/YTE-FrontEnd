import React, {useEffect, useState} from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import {Button, ListItem, ListItemText} from "@mui/material";
import FileDownload from "js-file-download";
import GradeDetails from "./GradeData/GradeDetails";

function HomeworkStudentItem({homework}) {

    const [score, setScore] = useState();
    const [gradeData, setGradeData] = useState([]);
    const [isDetailsOpen, setDetailsOpen] = useState(false);

    useEffect(()=> {
        fetchScore().then();
        fetchGradeData().then();
    },[]);

    async function fetchScore() {
        try {
            const response = await axios.get(`/hw-grade-student/${homework.id}`);
            setScore(response.data);
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
    }

    async function fetchGradeData() {
        try {
            const response = await axios.get(`/hw-grade/grade-data/${homework.id}`);
            setGradeData(response.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    async function handleFileSelect(event) {
        let formData = new FormData();
        formData.append("file", event.target.files[0]);
        try {
            const response = await axios.post(`/hw-student/${homework.id}`, formData,
                {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                });
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    async function handleDownload() {
        try {
            const response = await axios.get(`/hw/${homework.id}/file`,
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
            primary={"Info: " + homework.info + " Due: " + homework.dueDateTime}
            secondary={"Assistant: " + homework.assistant.name + " " +
                homework.assistant.surname + " - " + homework.fileName}
        />
        <div>Score: {score ? score: "-"}</div>
        <Button onClick={handleDownload} variant={"contained"}>Download File</Button>
        <Button onClick={() => setDetailsOpen(true)} variant={"contained"}>Details</Button>
        <input onChange={handleFileSelect} name={"info"} type={"file"}/>
        <GradeDetails isOpen={isDetailsOpen} close={() => setDetailsOpen(false)} data={gradeData}/>
    </ListItem>;
}

export default HomeworkStudentItem;