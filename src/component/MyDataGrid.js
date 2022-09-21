import React from 'react';
import {Box} from "@mui/material";
import {DataGrid} from '@mui/x-data-grid';

function MyDataGrid({values, setRows, columns}) {
    return <Box sx={{width: '100%'}}>
        <DataGrid
            autoHeight
            rows={values}
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

export default MyDataGrid;