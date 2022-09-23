const UserColumns = [
    {field: 'id', headerName: 'ID', width: 90},
    {field: 'username', headerName: 'Username', width: 150},
    {field: 'isEnabled', headerName: 'Enabled', width: 150},
    {field: 'name', headerName: 'Name', width: 150},
    {field: 'surname', headerName: 'Surname', width: 150},
    {field: 'email', headerName: 'E-Mail', width: 150},
    {field: 'authority', headerName: 'Type', width: 150},
];

const CourseColumns = [
    {field: 'name', headerName: 'Name', width: 150},
    {field: 'type', headerName: 'Type', width: 150},
    {field: 'code', headerName: 'Code', width: 150},
    {field: 'room', headerName: 'Room', width: 150},
    {field: 'lectUsername', headerName: 'Lecturer', width: 150},
];

const RoomColumns = [
    {field: 'name', headerName: 'Name', width: 100},
    {field: 'capacity', headerName: 'Capacity', width: 100},
    {field: 'hasProjection', headerName: 'Has Projection', width: 150},
    {field: 'hasComputer', headerName: 'Has Computer', width: 150},
    {field: 'hasAirCond', headerName: 'Has Air Conditioning', width: 150},
    {field: 'hasWindow', headerName: 'Has Window', width: 150},
];

export {UserColumns, CourseColumns, RoomColumns};