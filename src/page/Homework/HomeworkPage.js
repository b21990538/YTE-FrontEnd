import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import HomeworkGradesList from "./HomeworkGradesList";
import {Button} from "@mui/material";
import GradeDetails from "../Course/List/GradeData/GradeDetails";

function HomeworkPage() {

    const [homework, setHomework] = useState({});
    const [homeworkGrades, setHomeworkGrades] = useState([]);
    const [isDetailsOpen, setDetailsOpen] = useState(false);

    let {homeworkId} = useParams();

    useEffect(() => {
        fetchHomeworkData().then();
        fetchHomeworkGrades().then();
    }, []);

    async function fetchHomeworkData() {
        try {
            const examResponse = await axios.get(`/hw/${homeworkId}`);
            setHomework(examResponse.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    async function fetchHomeworkGrades() {
        try {
            const examGradeResponse = await axios.get(`/hw-grade/${homeworkId}`);
            setHomeworkGrades(examGradeResponse.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return <div style={{padding: "0 15px"}}>
        <h2>{homework.info}</h2>
        <Button onClick={() => setDetailsOpen(true)} variant={"contained"}>Details</Button>
        <GradeDetails isOpen={isDetailsOpen} close={() => setDetailsOpen(false)} data={homeworkGrades.map(
            (homeworkGrade) => homeworkGrade.score
        )}/>
        <HomeworkGradesList homeworkGrades={homeworkGrades}/>
    </div>;
}

export default HomeworkPage;