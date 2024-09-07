// src/pages/StudentMainPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarMain from '../components/NavbarMain';
import '../styles/MainPage.css';

const StudentMainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에서 userId가 없으면 로그인 페이지로 이동
    const userId = localStorage.getItem('userId');
    console.log("userId: ", userId);
    if (!userId) {
      navigate('/');  // 로그인 페이지로 이동
    }
  }, [navigate]);

  return (
    <div className="main-container">
      <NavbarMain />
      <div className="main-content">
        <div className="site-title">
          <h1>고려대학교 수강신청 사이트</h1>
          <h2>suKang</h2>
        </div>
        <img src={require('../assets/main-image.png')} alt="Main" className="main-image" />
      </div>
    </div>
  );
};

export default StudentMainPage;
