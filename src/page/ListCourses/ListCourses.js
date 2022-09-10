import React, {useEffect, useState} from 'react';
import axios from "axios";
import CourseGrid from "./CouseGrid";

function ListCourses() {
    const [courses, setCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    console.log(selectedCourses);

    useEffect(() => {
        fetchCourses().then();
    }, []);

    async function fetchCourses() {
        const response = await axios.get("/courses");
        setCourses(response.data);
    }

    return (
        <div>
            <CourseGrid courses={courses} setRows={setSelectedCourses}/>
        </div>
    );
}

export default ListCourses;