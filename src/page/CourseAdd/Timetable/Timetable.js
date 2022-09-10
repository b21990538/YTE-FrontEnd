import React, {useState} from 'react';
import TableDragSelect from "react-table-drag-select";
import {Button} from "@mui/material";

const startCellState = [
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false]
];

function Timetable({setSlots}) {

    const [cells, setCells] = useState(startCellState);

    function handleChange(newCells) {
        let slots = [];
        for (let i = 1; i < 6; i++) {
            for (let j = 1; j < 8; j++) {
                if (newCells[j][i]) {
                    slots.push({
                        day: i,
                        slot: j
                    });
                }
            }
        }
        setCells(newCells);
        setSlots(slots);
    }

    function handleReset() {
        setCells(startCellState);
    }

    return <div>
        <TableDragSelect value={cells} onChange={handleChange}>
            <tr>
                <td disabled/>
                <td disabled>Monday</td>
                <td disabled>Tuesday</td>
                <td disabled>Wednesday</td>
                <td disabled>Thursday</td>
                <td disabled>Friday</td>
            </tr>
            <tr>
                <td disabled>08:40</td>
                <td/>
                <td/>
                <td/>
                <td/>
                <td/>
            </tr>
            <tr>
                <td disabled>09:40</td>
                <td/>
                <td/>
                <td/>
                <td/>
                <td/>
            </tr>
            <tr>
                <td disabled>10:40</td>
                <td/>
                <td/>
                <td/>
                <td/>
                <td/>
            </tr>
            <tr>
                <td disabled>11:40</td>
                <td/>
                <td/>
                <td/>
                <td/>
                <td/>
            </tr>
            <tr>
                <td disabled>13:40</td>
                <td/>
                <td/>
                <td/>
                <td/>
                <td/>
            </tr>
            <tr>
                <td disabled>14:40</td>
                <td/>
                <td/>
                <td/>
                <td/>
                <td/>
            </tr>
            <tr>
                <td disabled>15:40</td>
                <td/>
                <td/>
                <td/>
                <td/>
                <td/>
            </tr>
            <tr>
                <td disabled>16:40</td>
                <td/>
                <td/>
                <td/>
                <td/>
                <td/>
            </tr>
        </TableDragSelect>
        <Button onClick={handleReset} variant={"outlined"}>Reset</Button>
    </div>;
}

export default Timetable;