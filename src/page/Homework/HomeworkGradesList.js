import React from 'react';
import {List} from "@mui/material";
import HomeworkGradeItem from "./HomeworkGradeItem";

function HomeworkGradesList({homeworkGrades}) {
    return <List>
        {homeworkGrades.map((item) => {
            return <HomeworkGradeItem key={item.studentId} homeworkGrade={item} />;
        })}
    </List>;
}

export default HomeworkGradesList;