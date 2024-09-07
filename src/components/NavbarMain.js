import React from 'react';
import '../styles/NavbarMain.css';
import { FaUserCircle } from 'react-icons/fa';

const NavbarMain = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">suKang</div>
      <div className="navbar-menu">
        <a href="/courses">강의</a>
        <a href="/boards">게시물</a>
        <a href="/mypage">마이페이지</a>
        <FaUserCircle className="navbar-icon" />
      </div>
    </nav>
  );
};

export default NavbarMain;
