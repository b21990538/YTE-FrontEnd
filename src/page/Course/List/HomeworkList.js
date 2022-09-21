import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import {List} from "@mui/material";
import HomeworkItem from "./HomeworkItem";
import UserContext from "../../../context/UserContext";
import HomeworkStudentItem from "./HomeworkStudentItem";

function HomeworkList({courseId, triggerUpdate}) {

    const [homeworks, setHomeworks] = useState([]);

    const {userData} = useContext(UserContext);
    const role = userData.authorities[0];

    useEffect(() => {
        fetchHomeworks().then();
    }, [triggerUpdate]);

    async function fetchHomeworks() {
        try {
            const response = await axios.get(`/hw/course/${courseId}`);
            setHomeworks(response.data);
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return <List>
        {homeworks.map((item) => {
            if (role === "STUDENT") {
                return <HomeworkStudentItem key={item.id} homework={item}/>
            }
            return <HomeworkItem key={item.id} homework={item}/>;
        })}
    </List>;
}

export default HomeworkList;