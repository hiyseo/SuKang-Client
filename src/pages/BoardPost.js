import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarMain from '../components/NavbarMain';
import '../styles/BoardPost.css';

const BoardPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [courseId, setCourseId] = useState('');
    const [courses, setCourses] = useState([]); // 강의 목록 저장
    const [message, setMessage] = useState('');

    const userId = localStorage.getItem('userId'); // localStorage에서 userId 가져오기
    const username = localStorage.getItem('username');
  
    // 서버에서 교수가 개설한 강의 목록 가져오기
    useEffect(() => {
      axios.get('http://localhost:3000/boards/courses', { withCredentials: true })
        .then((response) => {
          setCourses(response.data); // 강의 목록 설정
        })
        .catch((error) => {
          console.error('강의 목록 가져오기 실패:', error);
        });
    }, []);
  
    // 게시물 작성 핸들러
    const handlePostSubmit = (e) => {
      e.preventDefault();
  
      const postData = {
        title,
        content,
        course_id: courseId,
        user_id: userId // localStorage에서 가져온 user_id 사용
      };
  
      axios.post('http://localhost:3000/boards/post', postData, { withCredentials: true })
        .then((response) => {
          setMessage(response.data.message);
          console.log('게시물 작성 성공:', response.data);
        })
        .catch((error) => {
          console.error('게시물 작성 실패:', error);
          setMessage(error.response?.data?.message || '게시물 작성 실패');
        });
    };
  
    return (
    <div className="page-container">
        <NavbarMain />
      <div className="board-post-container">
        <h2>게시물 작성</h2>
        <form className="board-post-form" onSubmit={handlePostSubmit}>
          <label htmlFor="courseId">강의 선택</label>
          <select
            id="courseId"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          >
            <option value="">강의를 선택하세요</option>
            {courses.map((course) => (
              <option key={course.course_id} value={course.course_id}>
                {course.course_name}
              </option>
            ))}
          </select>
  
          <label htmlFor="title">제목</label>
          <input 
            type="text" 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="게시물 제목을 입력하세요" 
            required
          />
          
          <label htmlFor="content">내용</label>
          <textarea 
            id="content" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            placeholder="게시물 내용을 입력하세요" 
            required
          />
  
          <button type="submit">게시물 작성</button>
        </form>
        
        {message && <p className="board-post-message">{message}</p>}
      </div>
      </div>
    );
  };
  
  export default BoardPost;