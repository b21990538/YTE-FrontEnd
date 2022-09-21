import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Box, Button, Grid} from "@mui/material";
import {toast} from "react-toastify";
import AddCourse from "./AddCourse";
import EditCourse from "./EditCourse";
import UserContext from "../../context/UserContext";
import MyDataGrid from "../../component/MyDataGrid";
import {CourseColumns} from "../../values/Columns";

function ListCoursesPage() {
    const [courses, setCourses] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [isAddDialogOpen, setAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const [editId, setEditId] = useState(0);

    const {userData} = useContext(UserContext);
    const role = userData.authorities[0];

    useEffect(() => {
        fetchCourses().then();
    }, []);

    async function fetchCourses() {
        try {
            const response = await axios.get("/courses");
            setCourses(response.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    async function handleDelete() { //TODO multiple deletes
        if (selectedIds.length < 1) {
            toast.warn("No course selected");
            return;
        }
        try {
            const response = await axios.delete(`/courses/${selectedIds[0]}`);
            toast.success(response.data.message);
            await fetchCourses();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    async function handleAdd(formState) {
        try {
            const response = await axios.post("/courses", formState);
            toast.success(response.data.message);
            await fetchCourses();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    async function handleEdit(formState) {
        try {
            const response = await axios.put(`/courses/${editId}`, formState);
            toast.success(response.data.message);
            setEditDialogOpen(false);
            await fetchCourses();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    function openEditDialog() {
        if (selectedIds.length < 1) {
            toast.warn("No course selected");
            return;
        }
        setEditId(selectedIds[0]);
        setEditDialogOpen(true);
    }

    async function handleTakeCourse() {
        if (selectedIds.length < 1) {
            toast.warn("No course selected");
            return;
        }
        try {
            const response = await axios.post(`/take-course/${selectedIds[0]}`);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    let takeCourseButton = <div/>;
    let adminAddButton = <div/>;
    let adminEditButton = <div/>;
    let adminDeleteButton = <div/>;
    if (role === "ADMIN") {
        adminAddButton = <Grid item xs={2}>
            <Button variant={"outlined"} fullWidth
                    onClick={() => setAddDialogOpen(true)}>Add</Button>
        </Grid>;
        adminEditButton = <Grid item xs={2}>
            <Button variant={"outlined"} fullWidth
                    onClick={openEditDialog}>Edit</Button>
        </Grid>;
        adminDeleteButton = <Grid item xs={2}>
            <Button fullWidth color={"error"} variant={"outlined"} onClick={handleDelete}>Delete</Button>
        </Grid>;
    }
    if (role === "STUDENT") {
        takeCourseButton = <Grid item xs={2}>
            <Button variant={"outlined"} fullWidth
                    onClick={handleTakeCourse}>Take Course</Button>
        </Grid>;
    }

    return <div>
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={2}>
                {takeCourseButton}
                {adminAddButton}
                {adminEditButton}
                {adminDeleteButton}
                <Grid item xs={2}>
                    <Button variant={"outlined"} fullWidth color={"secondary"}
                            onClick={fetchCourses}>Refresh</Button>
                </Grid>
                <Grid item xs={12}>
                    <MyDataGrid values={courses} setRows={setSelectedIds} columns={CourseColumns}/>
                </Grid>
            </Grid>
        </Box>
        <AddCourse isOpen={isAddDialogOpen}
                   close={() => setAddDialogOpen(false)}
                   submit={handleAdd}/>
        <EditCourse isOpen={isEditDialogOpen}
                    close={() => setEditDialogOpen(false)}
                    submit={handleEdit} id={editId}/>
    </div>;
}

export default ListCoursesPage;