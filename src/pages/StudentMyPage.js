import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarMain from '../components/NavbarMain';
import { Modal } from 'antd'; // antd의 Modal 컴포넌트 사용
import '../styles/StudentMyPage.css';

const StudentMyPage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null); // 선택된 강의 저장
  const [posts, setPosts] = useState([]); // 강의 게시물 저장
  const [isModalVisible, setIsModalVisible] = useState(false); // 모달 창 표시 여부

  useEffect(() => {
    // 학생이 신청한 강의 목록 가져오기
    axios.get('http://localhost:3000/mypages/student', {withCredentials: true})
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('강의 목록 가져오기 실패:', error);
      });
  }, []);

  // 강의 클릭 시 강의 상세 내용을 가져오는 함수
  const handleCourseClick = (course_id) => {
    axios.get(`http://localhost:3000/mypages/student/posts?course_id=${course_id}`, {withCredentials: true})
      .then(response => {
        setPosts(response.data);
        setSelectedCourse(courses.find(course => course.course_id === course_id)); // 선택된 강의 정보 저장
        setIsModalVisible(true); // 모달 창 열기
      })
      .catch(error => {
        console.error('강의 게시물 가져오기 실패:', error);
      });
  };

  // 모달 창 닫기
  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedCourse(null);
    setPosts([]);
  };

  // 수강취소 함수
  const handleCancelCourse = (course_id) => {
    const user_id = localStorage.getItem('userId');
    axios.delete(`http://localhost:3000/mypages/student?course_id=${course_id}&student_id=${user_id}`, {withCredentials: true})
      .then(response => {
        console.log('수강 취소 성공:', response.data);
        setCourses(courses.filter(course => course.course_id !== course_id)); // 목록에서 해당 강의 제거
      })
      .catch(error => {
        console.error('수강 취소 실패:', error);
      });
  };

  return (
    <div className="page-container">
      <NavbarMain />
      <div className="mypage-container">
        <h1>내 강의 목록</h1>

        <table className="mypage-table">
          <thead>
            <tr>
              <th>교과명</th>
              <th>교수명</th>
              <th>강의장소</th>
              <th>강의요일</th>
              <th>강의시간</th>
              <th>수강취소</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.course_id} onClick={() => handleCourseClick(course.course_id)} style={{ cursor: 'pointer' }}>
                <td>{course.course_name}</td>
                <td>{course.professor_name}</td>
                <td>{course.course_location}</td>
                <td>{course.course_days}</td>
                <td>{course.course_time}</td>
                <td>
                  <button onClick={(e) => { e.stopPropagation(); handleCancelCourse(course.course_id); }} className="cancel-button">
                    수강취소
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 모달 창 */}
        <Modal title={`${selectedCourse?.course_name} 강의 상세`} open={isModalVisible} onCancel={handleModalClose} footer={null} className='course-modal'>
          {selectedCourse && (
            <div>
              <h2>강의 정보</h2>
              <p>교수명: {selectedCourse.professor_name}</p>
              <p>강의장소: {selectedCourse.course_location}</p>
              <p>강의시간: {selectedCourse.course_days} {selectedCourse.course_time}</p>

              <h2>게시물 목록</h2>
                <ul>
                  {posts.length > 0 ? (
                    posts.map(post => (
                      <li key={post.post_id} className="post-item">
                        <strong>{post.title}</strong>: {post.content}
                      </li>
                    ))
                  ) : (
                    <p>등록된 게시물이 없습니다.</p>
                  )}
                </ul>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default StudentMyPage;
