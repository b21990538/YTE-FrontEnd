import React from 'react';
import {Button, ListItem, ListItemText} from "@mui/material";
import {useNavigate} from "react-router-dom";

function ExamItem({exam}) {

    let navigate = useNavigate();

    function gotoExamPage() {
        navigate(`/exams/${exam.id}`);
    }

    return <ListItem secondaryAction={
        <Button onClick={gotoExamPage} variant={"contained"}>Grades</Button>
    }>
        <ListItemText
            primary={exam.name + " room:" + exam.roomName
                + " date:" + exam.startTime}
            secondary={exam.info}
        />
    </ListItem>;
}

export default ExamItem;