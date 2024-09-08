import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfessorMainPage from './pages/ProfessorMainPage';
import StudentMainPage from './pages/StudentMainPage';
import CourseList from './pages/CourseList';
import BoardList from './pages/BoardList';
import StudentMyPage from './pages/StudentMyPage';
import RegisterCourse from './pages/RegisterCourse';
import BoardPost from './pages/BoardPost';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/professor-main" element={<ProfessorMainPage />} />
        <Route path="/student-main" element={<StudentMainPage />} />
        <Route path="/courses/enroll" element={<CourseList />} />
        <Route path="/boards/lists" element={<BoardList />} />
        <Route path="/mypages/student" element={<StudentMyPage/>} />
        <Route path="/courses/register" element={<RegisterCourse />} />
        <Route path="/boards/post" element={<BoardPost />} />
      </Routes>
    </Router>
  );
}

export default App;