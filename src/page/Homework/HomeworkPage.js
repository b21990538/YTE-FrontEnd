import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import HomeworkGradesList from "./HomeworkGradesList";

function HomeworkPage() {

    const [homework, setHomework] = useState({});
    const [homeworkGrades, setHomeworkGrades] = useState([]);

    let {homeworkId} = useParams();

    useEffect(() => {
        fetchHomeworkData().then();
    }, []);

    async function fetchHomeworkData() {
        try {
            const examResponse = await axios.get(`/hw/${homeworkId}`);
            const examGradeResponse = await axios.get(`/hw-grade/${homeworkId}`);
            setHomework(examResponse.data);
            setHomeworkGrades(examGradeResponse.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }


    return <div style={{padding: "0 15px"}}>
        <h2>{homework.info}</h2>
        <HomeworkGradesList homeworkGrades={homeworkGrades}/>
    </div>;
}

export default HomeworkPage;