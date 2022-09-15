import React from 'react';
import {List} from "@mui/material";
import ExamGradeItem from "./ExamGradeItem";

function ExamGradesList({examGrades}) {
    return <List>
        {examGrades.map((item) => {
            return <ExamGradeItem key={item.studentId} examGrade={item}/>;
        })}
    </List>;
}

export default ExamGradesList;