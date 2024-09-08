import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/RegisterCourse.css';  // 스타일 파일 불러오기
import NavbarMain from '../components/NavbarMain';

const RegisterCourse = () => {
  const [courseName, setCourseName] = useState('');
  const [courseLocation, setCourseLocation] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [credits, setCredits] = useState(3);
  const [courseDays, setCourseDays] = useState('월수');
  const [courseTime, setCourseTime] = useState('09:00-10:15');
  const [professorEmail, setProfessorEmail] = useState('');
  const [professorName, setProfessorName] = useState('');
  const [professorUsername, setProfessorUsername] = useState('');
  const [departments, setDepartments] = useState([]);
  const [capacity, setCapacity] = useState(30);

  // localStorage에서 교수 이름과 사용자 이름 가져오기
  useEffect(() => {
    const name = localStorage.getItem('name');
    const username = localStorage.getItem('username');
    if (name) {
      setProfessorName(name);
    }
    if (username) {
      setProfessorUsername(username);
    }
    // 로그 출력하여 잘 나오는지 확인
    console.log("Professor Name: ", name);
    console.log("Professor Username: ", username);
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const courseData = {
      course_name: courseName,
      course_location: courseLocation,
      department_id: departmentId,
      credits: credits,
      course_days: courseDays,
      course_time: courseTime,
      professor_email: professorEmail,
      professor_name: professorName,
      professor_username: professorUsername,
      capacity: capacity
    };

    axios.post('http://localhost:3000/courses/register', courseData, {withCredentials: true})
      .then(response => {
        console.log('강의 등록 성공:', response.data);
        // 추가 처리 (페이지 리디렉션 등)
      })
      .catch(error => {
        console.error('강의 등록 실패:', error);
      });
  };

  return (
    <div className="page-container">
        <NavbarMain />
    <div className="register-course-container">
      <form className="register-course-form" onSubmit={handleSubmit}>
        <h2>강의 개설</h2>
        <div className="form-group">
          <label>강의명</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>교수 이메일</label>
          <input
            type="email"
            value={professorEmail}
            onChange={(e) => setProfessorEmail(e.target.value)}
            required
          />
        </div>
        {/* <p>Professor Name: {professorName}</p>
        <p>Professor Username: {professorUsername}</p> */}
        <div className="form-group">
          <label>강의장소</label>
          <input
            type="text"
            value={courseLocation}
            onChange={(e) => setCourseLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>학과</label>
          <select value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} required>
            <option value="">학과 선택</option>
            {departments.map((department) => (
              <option key={department.department_id} value={department.department_id}>
                {department.department_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>학점</label>
          <input
            type="number"
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>강의 요일</label>
          <select value={courseDays} onChange={(e) => setCourseDays(e.target.value)} required>
            <option value="월수">월수</option>
            <option value="화목">화목</option>
            <option value="금">금</option>
          </select>
        </div>
        <div className="form-group">
          <label>강의 시간</label>
          <select value={courseTime} onChange={(e) => setCourseTime(e.target.value)} required>
            <option value="09:00-10:15">09:00-10:15</option>
            <option value="10:30-11:45">10:30-11:45</option>
            <option value="12:00-13:15">12:00-13:15</option>
            <option value="13:30-14:45">13:30-14:45</option>
            <option value="15:00-16:15">15:00-16:15</option>
            <option value="16:30-17:45">16:30-17:45</option>
          </select>
        </div>
        <div className="form-group">
          <label>정원</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">강의 등록</button>
      </form>
    </div>
    </div>
  );
};

export default RegisterCourse;
