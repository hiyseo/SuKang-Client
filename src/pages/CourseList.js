import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CourseList.css';
import NavbarMain from '../components/NavbarMain';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');

  // 학과 목록을 가져오는 함수
  useEffect(() => {
    axios.get('http://localhost:3000/courses/department', {withCredentials: true})  // 학과 목록 API 경로
      .then(response => {
        setDepartments(response.data);  // 학과 목록 설정
      })
      .catch(error => {
        console.error('학과 목록 가져오기 실패:', error);
      });
  }, []);

  // 선택된 학과에 따라 강의 목록을 가져오는 함수
  useEffect(() => {
    if (selectedDepartment) {
      console.log('강의 목록 요청: ', selectedDepartment);
      axios.get(`http://localhost:3000/courses/enroll?department_id=${selectedDepartment}`, {withCredentials: true})
        .then(response => {
          setCourses(response.data);
        })
        .catch(error => {
          console.error('강의 목록 가져오기 실패:', error);
        });
    }
  }, [selectedDepartment]);

  // 강의 신청 함수
  const handleEnroll = (course_id) => {
    const user_id = localStorage.getItem('userId'); // LocalStorage에서 userId 가져오기
    console.log('userId:', user_id);
    console.log('courseId:', course_id);
    if (!user_id) {
        console.error('사용자 ID가 없습니다.');
        return;
    }

    axios.post('http://localhost:3000/courses/enroll', { user_id, course_id }, {withCredentials: true})
      .then(response => {
        console.log('강의 신청 성공:', response.data);
        alert('강의 신청이 완료되었습니다.');
        // 강의 목록에서 해당 강의의 신청자 수를 증가시킴
        setCourses(prevCourses => prevCourses.map(course =>
            course.courseId === course_id
              ? { ...course, applicants: course.applicants + 1 }
              : course
          ));
      })
      .catch(error => {
        console.error('강의 신청 실패:', error);
        alert('강의 신청에 실패했습니다.');
      });
  };

  // 학과 선택 시 처리
  const handleDepartmentChange = (event) => {
    const selectedId = event.target.value;
    console.log('선택한 학과 ID: ', selectedId);
    setSelectedDepartment(selectedId);  // 선택된 학과 ID 설정
  };

  return (
    <div className="page-container">
      {/* NavbarMain을 상단에 추가 */}
      <NavbarMain />
      <div className="course-list-container">
        <h1>학과별 강의 목록</h1>

        {/* 학과명 선택 */}
        <div className="department-select">
          <label htmlFor="department">학과 선택: </label>
          <select id="department" value={selectedDepartment} onChange={handleDepartmentChange}>
            <option value="">학과를 선택하세요</option>
            {departments.map(department => (
              <option key={department.department_id} value={department.department_id}>
                {department.department_name}
              </option>
            ))}
          </select>
        </div>

        <table className="course-table">
          <thead>
            <tr>
              <th>교과명</th>
              <th>교수명</th>
              <th>강의장소</th>
              <th>강의요일</th>
              <th>강의시간</th>
              <th>학점</th>
              <th>신청자</th>
              <th>정원</th>
              <th>신청</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.course_id}>
                <td>{course.course_name}</td>
                <td>{course.professor_name}</td>
                <td>{course.course_location}</td>
                <td>{course.course_days}</td>
                <td>{course.course_time}</td>
                <td>{course.credits}</td>
                <td>{course.applicants}</td>
                <td>{course.capacity}</td>
                <td>
                  <button
                    onClick={() => handleEnroll(course.course_id)}
                    disabled={course.applicants >= course.capacity}
                    className={course.applicants >= course.capacity ? 'full-capacity' : 'enroll-button'}
                  >
                    {course.applicants >= course.capacity ? '정원 초과' : '신청'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseList;
