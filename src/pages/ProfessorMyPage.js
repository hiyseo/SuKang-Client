import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, List } from 'antd';
import NavbarMain from '../components/NavbarMain';
import '../styles/ProfessorMyPage.css';

const ProfessorMyPage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [students, setStudents] = useState([]);

  const userId = localStorage.getItem('userId');

  // 교수가 담당하는 강의 목록 가져오기
  useEffect(() => {
    axios.get(`http://localhost:3000/mypages/professor?user_id=${userId}`, { withCredentials: true })
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('강의 목록 가져오기 실패:', error);
      });
  }, [userId]);

  // 강의 삭제 핸들러
  const handleDeleteCourse = (courseId) => {
    axios.delete(`http://localhost:3000/mypages/professor?course_id=${courseId}`, { withCredentials: true })
      .then(response => {
        setCourses(courses.filter(course => course.course_id !== courseId));
      })
      .catch(error => {
        console.error('강의 삭제 실패:', error);
      });
  };

  // 모달 열기
  const showModal = (courseId) => {
    setSelectedCourse(courseId);
    setIsModalVisible(true);

    // 게시물 목록 가져오기 (최신 게시물이 상단에 오도록 정렬)
    axios.get(`http://localhost:3000/mypages/professor/posts?course_id=${courseId}`, { withCredentials: true })
      .then(response => {
        // 최신 게시물이 상단에 오도록 데이터 정렬
        const sortedPosts = response.data.sort((a, b) => new Date(b.created_time) - new Date(a.created_time));
        setPosts(sortedPosts);
      })
      .catch(error => console.error('게시물 목록 가져오기 실패:', error));

    // 수강생 목록 가져오기
    axios.get(`http://localhost:3000/mypages/professor/students?course_id=${courseId}`, { withCredentials: true })
      .then(response => {
        // 수강생 목록을 가공해서 student_id와 student_num (학번) 분리
        const updatedStudents = response.data.map(student => ({
          ...student,
          student_id: student.user_id, // student_id 필드를 user_id로 덮어쓰기
          student_num: student.student_id // 학번
        }));
        setStudents(updatedStudents);
      })
      .catch(error => console.error('수강생 목록 가져오기 실패:', error));
  };

  // 모달 닫기
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 게시물 삭제 핸들러
  const handleDeletePost = (postId) => {
    axios.delete(`http://localhost:3000/mypages/professor/posts?post_id=${postId}`, { withCredentials: true })
      .then(response => {
        setPosts(posts.filter(post => post.post_id !== postId));
      })
      .catch(error => {
        console.error('게시물 삭제 실패:', error);
      });
  };

  // 수강생 삭제 핸들러
  const handleDeleteStudent = (studentId) => {
    axios.delete(`http://localhost:3000/mypages/professor/students?course_id=${selectedCourse}&student_id=${studentId}`, { withCredentials: true })
      .then(response => {
        setStudents(students.filter(student => student.student_id !== studentId));
      })
      .catch(error => {
        console.error('수강생 삭제 실패:', error);
      });
  };

  return (
    <div className="professor-my-page">
      <NavbarMain />
      <h2>내 강의 목록</h2>
      <table className="course-table">
        <thead>
          <tr>
            <th>교과명</th>
            <th>강의장소</th>
            <th>강의요일</th>
            <th>강의시간</th>
            <th>과목삭제</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.course_id} onClick={() => showModal(course.course_id)} style={{ cursor: 'pointer' }}>
              <td>{course.course_name}</td>
              <td>{course.course_location}</td>
              <td>{course.course_days}</td>
              <td>{course.course_time}</td>
              <td><Button onClick={() => handleDeleteCourse(course.course_id)} className="delete-btn">삭제</Button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal title={`강의상세정보`} open={isModalVisible} onCancel={handleCancel} footer={null} width={800}>
        <h3>게시물 목록</h3>
        <List
          dataSource={posts}
          renderItem={post => (
            <List.Item actions={[<Button onClick={() => handleDeletePost(post.post_id)}>삭제</Button>]}>
              <div>
                <strong>{post.title}</strong><br />
                <small>{new Date(post.created_time).toLocaleString()}</small> {/* 작성 시간 표시 */}
              </div>
            </List.Item>
          )}
        />
        <h3>수강생 목록</h3>
        <List
          dataSource={students}
          renderItem={student => (
            <List.Item actions={[<Button onClick={() => handleDeleteStudent(student.student_id)}>삭제</Button>]}>
              <div>
                <strong>이름: {student.name}</strong><br />
                <small>학번: {student.student_num}</small> {/* 학번과 이름을 함께 표시 */}
              </div>
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default ProfessorMyPage;
