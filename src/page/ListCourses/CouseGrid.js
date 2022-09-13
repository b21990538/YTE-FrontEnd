import React from 'react';
import {Box} from "@mui/material";
import {DataGrid} from '@mui/x-data-grid';

const columns = [
    //{field: 'id', headerName: 'ID', width: 90},
    {field: 'name', headerName: 'Name', width: 150},
    //{field: 'description', headerName: 'Desc', width: 150},
    {field: 'type', headerName: 'Type', width: 150},
    {field: 'code', headerName: 'Code', width: 150},
    {field: 'room', headerName: 'Room', width: 150},
    {field: 'lectUsername', headerName: 'Lecturer', width: 150},
];


function CourseGrid({courses, setRows}) {

    return <Box sx={{width: '100%'}}>
        <DataGrid
            autoHeight
            rows={courses}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={(selectionModel) => {
                setRows(selectionModel);
            }}
            experimentalFeatures={{newEditingApi: true}}
            sx={{
                boxShadow: 2,
                border: 2,
                color: "white",
                borderColor: 'primary.light',
                '& .MuiDataGrid-cell:hover': {
                    color: 'primary.main',
                },
            }}
        />
    </Box>;
}

export default CourseGrid;