import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfessorMainPage from './pages/ProfessorMainPage';
import StudentMainPage from './pages/StudentMainPage';
import CourseList from './pages/CourseList';
import BoardList from './pages/BoardList';
import StudentMyPage from './pages/StudentMyPage';
import RegisterCourse from './pages/RegisterCourse';
import BoardPost from './pages/BoardPost';
import ProfessorMyPage from './pages/ProfessorMyPage';

function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);  // userId 상태 업데이트
  }, [userId]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/professor-main" element={userId ? <ProfessorMainPage /> : <Navigate to="/" />} />
        <Route path="/student-main" element={userId ? <StudentMainPage /> : <Navigate to="/" />} />
        <Route path="/courses/enroll" element={userId ? <CourseList /> : <Navigate to="/" />} />
        <Route path="/boards/lists" element={userId ? <BoardList /> : <Navigate to="/" />} />
        <Route path="/mypages/student" element={userId ? <StudentMyPage /> : <Navigate to="/" />} />
        <Route path="/courses/register" element={userId ? <RegisterCourse /> : <Navigate to="/" />} />
        <Route path="/boards/post" element={userId ? <BoardPost /> : <Navigate to="/" />} />
        <Route path="/mypages/professor" element={userId ? <ProfessorMyPage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
