import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import ExamGradesList from "./ExamGradesList";

function ExamPage() {

    const [exam, setExam] = useState({});
    const [examGrades, setExamGrades] = useState([]);

    let {examId} = useParams();

    useEffect(() => {
        fetchExamData().then();
    }, []);

    async function fetchExamData() {
        try {
            const examResponse = await axios.get(`/exams/${examId}`);
            const examGradeResponse = await axios.get(`/exam-grade/${examId}`);
            setExam(examResponse.data);
            setExamGrades(examGradeResponse.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return <div>
        <h2>{exam.name}</h2>
        <ExamGradesList examGrades={examGrades}/>
    </div>;
}

export default ExamPage;