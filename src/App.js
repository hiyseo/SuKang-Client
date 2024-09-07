import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfessorMainPage from './pages/ProfessorMainPage';
import StudentMainPage from './pages/StudentMainPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/professor-main" element={<ProfessorMainPage />} />
        <Route path="/student-main" element={<StudentMainPage />} />
      </Routes>
    </Router>
  );
}

export default App;