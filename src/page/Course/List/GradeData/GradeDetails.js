import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import HistogramDrawer from "./HistogramDrawer";

function GradeDetails({isOpen, close, data}) {

    return <Dialog open={isOpen} fullWidth maxWidth={"md"}>
        <DialogTitle>Distribution of Grades</DialogTitle>
        <DialogContent>
            <HistogramDrawer data={data}/>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => close()} color="secondary">Close</Button>
        </DialogActions>
    </Dialog>;
}

export default GradeDetails;