import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../page/Home";
import Login from "../page/Login";
import UserContext from "../context/UserContext";
import ListCourses from "../page/ListCourses";
import AdminAddUser from "../page/AdminAddUser";
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
            <Route path="/*" element={<NotFound/>}/>
        </Routes>;
    }

    if (role === "ASSISTANT") {
        return <div></div>;     //TODO
    }

    return <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
    </Routes>;
}

export default RoleRoutes;