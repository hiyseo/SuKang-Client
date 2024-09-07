import React from 'react';
import NavbarMain from '../components/NavbarMain';
import '../styles/MainPage.css';

const StudentMainPage = () => {
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
