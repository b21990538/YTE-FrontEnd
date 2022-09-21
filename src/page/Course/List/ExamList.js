import React, {useContext, useEffect, useState} from 'react';
import {List} from "@mui/material";
import ExamItem from "./ExamItem";
import axios from "axios";
import {toast} from "react-toastify";
import UserContext from "../../../context/UserContext";
import ExamStudentItem from "./ExamStudentItem";

function ExamList({courseId, triggerUpdate}) {

    const [exams, setExams] = useState([]);

    const {userData} = useContext(UserContext);
    const role = userData.authorities[0];

    useEffect(() => {
        fetchExams().then();
    }, [triggerUpdate]);

    async function fetchExams() {
        try {
            const response = await axios.get(`/exams/course/${courseId}`);
            setExams(response.data);
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return <List>
        {exams.map((item) => {
            if (role === "STUDENT") {
                return <ExamStudentItem key={item.id} exam={item}/>
            }
            return <ExamItem key={item.id} exam={item}/>;
        })}
    </List>;
}

export default ExamList;