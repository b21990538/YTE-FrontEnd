import React, {useContext, useEffect, useState} from 'react';
import {Box, Button, Grid} from "@mui/material";
import CourseGrid from "../ListCourses/CouseGrid";
import axios from "axios";
import AddAssistant from "./AddAssistant";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import EditCourseLimited from "./EditCourseLimited";
import UserContext from "../../context/UserContext";

function MyCoursesPage() {

    const [courses, setCourses] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [isAddAssistOpen, setAddAssistOpen] = useState(false);
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const [editId, setEditId] = useState(0);

    const navigate = useNavigate();
    const {userData} = useContext(UserContext);
    const role = userData.authorities[0];

    useEffect(() => {
        fetchCourses().then();
    }, []);

    async function fetchCourses() {
        const response = await axios.get("/my-courses");
        setCourses(response.data);
    }

    function handleGotoCourse() {
        if (selectedIds.length < 1) {
            toast.warn("No course selected");
            return;
        }
        navigate(`/courses/${selectedIds[0]}`);
    }

    function openAddAssistant() {
        if (selectedIds.length < 1) {
            toast.warn("No course selected");
            return;
        }
        setAddAssistOpen(true);
    }

    async function handleAddAssistant(formState) {
        formState.courseId = selectedIds[0];
        const response = await axios.post("/my-courses/assistant", formState);
        toast.success(response.data.message);
        setAddAssistOpen(false);
    }

    function openEditDialog() {
        if (selectedIds.length < 1) {
            toast.warn("No course selected");
            return;
        }
        setEditId(selectedIds[0]);
        setEditDialogOpen(true);
    }

    async function handleEdit(formState) {
        const response = await axios.put(`/my-courses/${editId}`, formState);
        toast.success(response.data.message);
        setEditDialogOpen(false);
        await fetchCourses();
    }

    let addAssistantButton = <div/>;
    let editCourseButton = <div/>;
    if (role === "LECTURER") {
        addAssistantButton = <Grid item xs={2}>
            <Button variant={"outlined"} fullWidth
                    onClick={openAddAssistant}>Add Assistant</Button>
        </Grid>;
    }
    if (role === "LECTURER" || role === "ASSISTANT") {
        editCourseButton = <Grid item xs={2}>
            <Button variant={"outlined"} fullWidth
                    onClick={openEditDialog}>Edit</Button>
        </Grid>;
    }

    return <div>
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Button variant={"outlined"} fullWidth
                            onClick={handleGotoCourse}>Course Page</Button>
                </Grid>
                {addAssistantButton}
                {editCourseButton}
                <Grid item xs={2}>
                    <Button variant={"outlined"} fullWidth color={"secondary"}
                            onClick={fetchCourses}>Refresh</Button>
                </Grid>
                <Grid item xs={12}>
                    <CourseGrid courses={courses} setRows={setSelectedIds}/>
                </Grid>
            </Grid>
        </Box>
        <AddAssistant isOpen={isAddAssistOpen}
                      close={() => setAddAssistOpen(false)}
                      submit={handleAddAssistant}/>
        <EditCourseLimited isOpen={isEditDialogOpen}
                           close={() => setEditDialogOpen(false)}
                           submit={handleEdit} id={editId}/>
    </div>;
}

export default MyCoursesPage;