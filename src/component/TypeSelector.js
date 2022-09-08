import React from 'react';
import {ToggleButton, ToggleButtonGroup} from "@mui/material";

function TypeSelector({value, options, onChange}) {
    return <ToggleButtonGroup value={value} exclusive onChange={onChange}>
        {options.map((option) => (
            <ToggleButton key={option} value={option}>{option}</ToggleButton>
        ))}
    </ToggleButtonGroup>;
}

export default TypeSelector;