import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../page/Home/Home";
import Login from "../page/Login/Login";
import UserContext from "../context/UserContext";
import ListCourses from "../page/ListCourses/ListCourses";
import AdminAddUser from "../page/AdminAddUser/AdminAddUser";
import AdminListUsers from "../page/AdminListUsers/AdminListUsers";
import NotFound from "../page/NotFound";
import CourseAdd from "../page/CourseAdd/CourseAdd";

function RoleRoutes() {

    const {userData} = useContext(UserContext);
    const role = userData.authorities[0];

    if (role === "STUDENT") {
        return <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/courses" element={<ListCourses/>}/>
            <Route path="/*" element={<NotFound/>}/>
        </Routes>;
    }

    if (role === "ADMIN") {
        return <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/addUser" element={<AdminAddUser/>}/>
            <Route path="/listUsers" element={<AdminListUsers/>}/>
            <Route path="/addCourse" element={<CourseAdd/>}/>
            <Route path="/courses" element={<ListCourses/>}/>
            <Route path="/*" element={<NotFound/>}/>
        </Routes>;
    }

    if (role === "ASSISTANT") {
        return <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/courses" element={<ListCourses/>}/>
            <Route path="/*" element={<NotFound/>}/>
        </Routes>;
    }

    // LECTURER
    return <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/courses" element={<ListCourses/>}/>
        <Route path="/*" element={<NotFound/>}/>
    </Routes>;
}

export default RoleRoutes;