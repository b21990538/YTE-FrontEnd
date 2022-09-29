import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import ExamGradesList from "./ExamGradesList";
import {Button} from "@mui/material";
import GradeDetails from "../Course/List/GradeData/GradeDetails";

function ExamPage() {

    const [exam, setExam] = useState({});
    const [examGrades, setExamGrades] = useState([]);
    const [isDetailsOpen, setDetailsOpen] = useState(false);

    let {examId} = useParams();

    useEffect(() => {
        fetchExamData().then();
        fetchExamGrades().then();
    }, []);

    async function fetchExamData() {
        try {
            const examResponse = await axios.get(`/exams/${examId}`);
            setExam(examResponse.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    async function fetchExamGrades() {
        try {
            const examGradeResponse = await axios.get(`/exam-grade/${examId}`);
            setExamGrades(examGradeResponse.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return <div style={{padding: "0 15px"}}>
        <h2>{exam.name}</h2>
        <Button onClick={() => setDetailsOpen(true)} variant={"contained"}>Details</Button>
        <GradeDetails isOpen={isDetailsOpen} close={() => setDetailsOpen(false)} data={examGrades.map(
            (examGrade) => examGrade.score
        )}/>
        <ExamGradesList examGrades={examGrades}/>
    </div>;
}

export default ExamPage;