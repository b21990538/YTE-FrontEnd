import React, {useEffect, useState} from 'react';
import {Box, Button, Grid} from "@mui/material";
import CourseGrid from "../ListCourses/CouseGrid";
import axios from "axios";

function MyCoursesPage() {

    const [courses, setCourses] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        fetchCourses().then();
    }, []);

    async function fetchCourses() {
        const response = await axios.get("/my-courses");
        setCourses(response.data);
    }

    return <div>
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Button variant={"outlined"} fullWidth color={"secondary"}
                            onClick={fetchCourses}>Refresh</Button>
                </Grid>
                <Grid item xs={12}>
                    <CourseGrid courses={courses} setRows={setSelectedIds}/>
                </Grid>
            </Grid>
        </Box>
    </div>;
}

export default MyCoursesPage;