import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../page/Home/Home";
import UserContext from "../context/UserContext";
import ListCoursesPage from "../page/ListCourses/ListCoursesPage";
import AdminListUsersPage from "../page/AdminListUsers/AdminListUsersPage";
import NotFound from "../page/NotFound";
import MyCoursesPage from "../page/MyCourses/MyCoursesPage";
import CoursePage from "../page/Course/CoursePage";
import ExamPage from "../page/Exam/ExamPage";
import HomeworkPage from "../page/Homework/HomeworkPage";

function RoleRoutes() {

    const {userData} = useContext(UserContext);
    const role = userData.authorities[0];

    if (role === "STUDENT") {
        return <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/courses" element={<ListCoursesPage/>}/>
            <Route path="/courses/:courseId" element={<CoursePage/>}/>
            <Route path="/my-courses" element={<MyCoursesPage/>}/>
            <Route path="/*" element={<NotFound/>}/>
        </Routes>;
    }

    if (role === "ADMIN") {
        return <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/users" element={<AdminListUsersPage/>}/>
            <Route path="/courses" element={<ListCoursesPage/>}/>
            <Route path="/courses/:courseId" element={<CoursePage/>}/>
            <Route path="/*" element={<NotFound/>}/>
        </Routes>;
    }

    if (role === "ASSISTANT") {
        return <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/courses" element={<ListCoursesPage/>}/>
            <Route path="/courses/:courseId" element={<CoursePage/>}/>
            <Route path="/my-courses" element={<MyCoursesPage/>}/>
            <Route path="/exams/:examId" element={<ExamPage/>}/>
            <Route path="/homeworks/:homeworkId" element={<HomeworkPage/>}/>
            <Route path="/*" element={<NotFound/>}/>
        </Routes>;
    }

    // LECTURER
    return <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/courses" element={<ListCoursesPage/>}/>
        <Route path="/courses/:courseId" element={<CoursePage/>}/>
        <Route path="/my-courses" element={<MyCoursesPage/>}/>
        <Route path="/exams/:examId" element={<ExamPage/>}/>
        <Route path="/homeworks/:homeworkId" element={<HomeworkPage/>}/>
        <Route path="/*" element={<NotFound/>}/>
    </Routes>;
}

export default RoleRoutes;