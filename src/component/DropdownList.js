import React from 'react';

function DropdownList({label, value, options, onChange}) {
    return <label className={"dropdown-label"}>
        {label}
        <select value={value} onChange={onChange}>
            {options.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </label>;
}

export default DropdownList;