import React, {useState} from 'react';
import '../styles/NavbarMain.css';
import { FaUserCircle, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import Modal from 'react-modal';

const NavbarMain = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [profileData, setProfileData] = useState({ name: '', status: '' });

  // 사람 아이콘을 클릭하면 프로필 정보를 가져오는 함수
  const handleProfileClick = () => {
    axios.get('http://localhost:3000/users/profile', {withCredentials: true})
      .then(response => {
        setProfileData(response.data);  // 응답에서 name과 status 가져오기
        setModalIsOpen(true);  // 모달 창 열기
      })
      .catch(error => {
        console.error('프로필 가져오기 실패:', error);
      });
  };

  // 회원탈퇴 버튼 클릭 시 DELETE 요청
  const handleDeleteAccount = () => {
    axios.delete('http://localhost:3000/users/profile', {withCredentials: true})
      .then(response => {
        console.log('회원탈퇴 성공:', response.data);
        localStorage.removeItem('userId');
        setModalIsOpen(false);  // 모달 창 닫기
        window.location.href = '/';
        
      })
      .catch(error => {
        console.error('회원탈퇴 실패:', error);
      });
  };

  const handleLogout = () => {
    // 로그아웃 처리 로직
    localStorage.removeItem('userId'); // 로컬 스토리지에서 사용자 정보 제거
    setModalIsOpen(false);
    // 로그아웃 후 리디렉션 (예: 로그인 페이지로)
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">suKang</div>
      <div className="navbar-menu">
        <a href="/courses">강의</a>
        <a href="/boards">게시물</a>
        <a href="/mypage">마이페이지</a>
        <FaUserCircle className="navbar-icon" onClick={handleProfileClick}/>
      </div>
      {/* 모달 창 */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Profile Modal"
        className="profile-modal"
        overlayClassName="profile-modal-overlay"
        ariaHideApp={false}
      >
        <div className="profile-container">
          <FaTimes className="close-icon" onClick={() => setModalIsOpen(false)} />
          <p>{profileData.status === 'Professor' ? '교수' : '학생'} {profileData.name}님 반갑습니다</p>
          <button onClick={handleLogout}>로그아웃</button>
          <button onClick={handleDeleteAccount}>회원탈퇴</button>
        </div>
      </Modal>
    </nav>
  );
};

export default NavbarMain;
