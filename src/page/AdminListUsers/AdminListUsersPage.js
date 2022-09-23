import React, {useEffect, useState} from 'react';
import MyDataGrid from "../../component/MyDataGrid";
import axios from "axios";
import {Box, Button, Grid} from "@mui/material";
import AddUser from "./AddUser";
import {toast} from "react-toastify";
import {UserColumns} from "../../values/Columns";

function AdminListUsersPage() {

    const [users, setUsers] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [isAddDialogOpen, setAddDialogOpen] = useState(false);

    useEffect(() => {
        fetchUsers().then();
    }, []);

    async function fetchUsers() {
        try {
            const response = await axios.get("/getUsers");
            setUsers(response.data);
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
    }

    async function handlePacify() {
        if (selectedIds.length < 1) {
            toast.warn("No user selected");
            return;
        }
        try {
            const response = await axios.put(`/pacify-user/${selectedIds[0]}`);
            toast.success(response.data.message);
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
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
                            onClick={handlePacify}>Toggle Pacify</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button variant={"outlined"} fullWidth color={"secondary"}
                            onClick={fetchUsers}>Refresh</Button>
                </Grid>
                <Grid item xs={12}>
                    <MyDataGrid values={users} setRows={setSelectedIds} columns={UserColumns}/>
                </Grid>
            </Grid>
        </Box>
        <AddUser isOpen={isAddDialogOpen}
                   close={() => setAddDialogOpen(false)}/>
    </div>;
}

export default AdminListUsersPage;