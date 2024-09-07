import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarMain from '../components/NavbarMain';
import '../styles/BoardList.css';

const BoardList = () => {
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      axios.get('http://localhost:3000/boards/lists', {withCredentials: true})
        .then(response => {
          setPosts(response.data);
        })
        .catch(error => {
          console.error('게시물 가져오기 실패:', error);
        });
    }, []);
  
    // 게시물 내용을 100자까지만 보이게 하는 함수
    const truncateContent = (content) => {
      return content.length > 100 ? content.slice(0, 100) + '...' : content;
    };
  
    return (
    <div className="page-container">
        <NavbarMain />
        <div className="board-list-container">
          <h1>게시물 목록</h1>
          <table className="board-table">
            <thead>
              <tr>
                <th>강의명</th>
                <th>제목</th>
                <th>내용</th>
                <th>작성 시간</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.post_id}>
                  <td>{post.course_name}</td>
                  <td>{post.title}</td>
                  <td>{truncateContent(post.content)}</td>
                  <td>{new Date(post.created_time).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default BoardList;