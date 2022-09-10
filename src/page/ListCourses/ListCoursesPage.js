import React, {useEffect, useState} from 'react';
import axios from "axios";
import CourseGrid from "./CouseGrid";
import {Box, Button, Grid} from "@mui/material";
import {toast} from "react-toastify";
import AddCourse from "./AddCourse";
import EditCourse from "./EditCourse";

function ListCoursesPage() {
    const [courses, setCourses] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [isAddDialogOpen, setAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const [editId, setEditId] = useState(0);

    useEffect(() => {
        fetchCourses().then();
    }, []);

    async function fetchCourses() {
        const response = await axios.get("/courses");
        setCourses(response.data);
    }

    async function handleDelete() { //TODO multiple deletes, refresh list?
        if (selectedIds.length < 1) {
            toast.warn("No course selected");
            return;
        }
        const response = await axios.delete(`/courses/${selectedIds[0]}`);
        toast.success(response.data.message);
        await fetchCourses();
    }

    async function handleAdd(formState) {
        const response = await axios.post("/courses", formState);
        toast.success(response.data.message);
        setAddDialogOpen(false);
        await fetchCourses();
    }

    async function handleEdit(formState) {
        const response = await axios.put(`/courses/${editId}`, formState);
        toast.success(response.data.message);
        setEditDialogOpen(false);
        await fetchCourses();
    }

    function openEditDialog() {
        if (selectedIds.length < 1) {
            toast.warn("No course selected");
            return;
        }
        setEditId(selectedIds[0]);
        setEditDialogOpen(true);
    }

    return <div>
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Button variant={"outlined"} fullWidth
                            onClick={() => setAddDialogOpen(true)}>Add</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button variant={"outlined"} fullWidth
                            onClick={openEditDialog}>Edit</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button fullWidth color={"error"} variant={"outlined"} onClick={handleDelete}>Delete</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button variant={"outlined"} fullWidth color={"secondary"}
                            onClick={fetchCourses}>Refresh</Button>
                </Grid>
                <Grid item xs={12}>
                    <CourseGrid courses={courses} setRows={setSelectedIds}/>
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