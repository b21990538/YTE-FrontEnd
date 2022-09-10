import React, {useEffect, useState} from 'react';
import UserGrid from "./UserGrid";
import axios from "axios";
import {Box, Button, Grid} from "@mui/material";
import CourseGrid from "../ListCourses/CouseGrid";
import AddCourse from "../ListCourses/AddCourse";
import EditCourse from "../ListCourses/EditCourse";
import AddUser from "./AddUser";

function AdminListUsersPage() {

    const [users, setUsers] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [isAddDialogOpen, setAddDialogOpen] = useState(false);

    useEffect(() => {
        fetchUsers().then();
    }, []);

    async function fetchUsers() {
        const response = await axios.get("/getUsers");
        setUsers(response.data);
    }

    return <div>
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Button variant={"outlined"} fullWidth
                            onClick={() => setAddDialogOpen(true)}>Add</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button variant={"outlined"} fullWidth color={"secondary"}
                            onClick={fetchUsers}>Refresh</Button>
                </Grid>
                <Grid item xs={12}>
                    <UserGrid users={users} setRows={setSelectedIds}/>
                </Grid>
            </Grid>
        </Box>
        <AddUser isOpen={isAddDialogOpen}
                   close={() => setAddDialogOpen(false)}/>
    </div>;
}

export default AdminListUsersPage;