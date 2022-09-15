import React from 'react';
import {Button, ListItem, ListItemText} from "@mui/material";
import {useNavigate} from "react-router-dom";

function HomeworkItem({homework}) {

    let navigate = useNavigate();

    function gotoHomeworkPage() {
        navigate(`/homeworks/${homework.id}`);
    }

    return <ListItem secondaryAction={
        <Button onClick={gotoHomeworkPage} variant={"contained"}>Grades</Button>
    }>
        <ListItemText
            primary={"Info: " + homework.info + " Due: " + homework.dueDateTime}
            secondary={"Assistant: " + homework.assistant.name + " " +
                homework.assistant.surname + " - " + homework.fileName}
        />
    </ListItem>;
}

export default HomeworkItem;