import React, {useEffect, useState} from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import {Box, Button, Grid} from "@mui/material";
import MyDataGrid from "../../component/MyDataGrid";
import {RoomColumns} from "../../values/Columns";
import AddRoom from "./AddRoom";
import EditRoom from "./EditRoom";

function ListRoomsPage() {

    const [rooms, setRooms] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [isAddDialogOpen, setAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);

    useEffect(() => {
        fetchRooms().then();
    }, []);

    async function fetchRooms() {
        try {
            const response = await axios.get("/rooms");
            setRooms(response.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    async function handleDelete() {
        if (selectedIds.length < 1) {
            toast.warn("No room selected");
            return;
        }
        try {
            const response = await axios.delete(`/rooms/${selectedIds[0]}`);
            toast.success(response.data.message);
            await fetchRooms();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    async function handleAdd(formState) {
        try {
            const response = await axios.post("/rooms", formState);
            toast.success(response.data.message);
            await fetchRooms();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    async function handleEdit(formState) {
        try {
            const response = await axios.put(`/rooms/${selectedIds[0]}`, formState);
            toast.success(response.data.message);
            setEditDialogOpen(false);
            await fetchRooms();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    function openEditDialog() {
        if (selectedIds.length < 1) {
            toast.warn("No course selected");
            return;
        }
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
                            onClick={fetchRooms}>Refresh</Button>
                </Grid>
                <Grid item xs={12}>
                    <MyDataGrid values={rooms} setRows={setSelectedIds} columns={RoomColumns}/>
                </Grid>
            </Grid>
        </Box>
        <AddRoom isOpen={isAddDialogOpen}
                   close={() => setAddDialogOpen(false)}
                   submit={handleAdd}/>
        <EditRoom isOpen={isEditDialogOpen}
                    close={() => setEditDialogOpen(false)}
                    submit={handleEdit} id={selectedIds[0]}/>
    </div>;
}

export default ListRoomsPage;