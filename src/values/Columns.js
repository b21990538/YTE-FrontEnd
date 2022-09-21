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

export {UserColumns, CourseColumns};