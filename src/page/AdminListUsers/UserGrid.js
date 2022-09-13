import React from 'react';
import {Box} from "@mui/material";
import {DataGrid} from '@mui/x-data-grid';

const columns = [
    {field: 'id', headerName: 'ID', width: 90},
    {field: 'username', headerName: 'Username', width: 150},
    {field: 'isEnabled', headerName: 'Enabled', width: 150},
    {field: 'name', headerName: 'Name', width: 150},
    {field: 'surname', headerName: 'Surname', width: 150},
    {field: 'email', headerName: 'E-Mail', width: 150},
    {field: 'authority', headerName: 'Type', width: 150},
];


function UserGrid({users, setRows}) {
    return <Box sx={{width: '100%'}}>
        <DataGrid
            autoHeight
            rows={users}
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

export default UserGrid;