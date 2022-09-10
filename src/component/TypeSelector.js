import React from 'react';
import {ToggleButton, ToggleButtonGroup} from "@mui/material";

function TypeSelector({value, options, setType}) {
    return <ToggleButtonGroup value={value} exclusive
                              onChange={(e) => setType(e.target.value)}>
        {options.map((option) => (
            <ToggleButton key={option} value={option}>{option}</ToggleButton>
        ))}
    </ToggleButtonGroup>;
}

export default TypeSelector;