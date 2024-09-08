// src/pages/LoginPage.js
import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../styles/LoginPage.css';
import {useNavigate} from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Success:', values);
    axios.post('http://localhost:3000/users/login', values, { withCredentials: true })
      .then(response => {
        console.log('로그인 성공:', response.data);
        const {userId, status, name, username} = response.data;
        localStorage.setItem('userId', userId);
        localStorage.setItem('status', status);
        localStorage.setItem('name', name);
        localStorage.setItem('username', username);
        console.log("userId: ", userId)
        console.log("status: ", status);
        console.log("name: ", name);
        console.log("username: ", username);
        if (status === 'Professor'){
            console.log("userID: ", userId);
            navigate('/professor-main');
        } else if (status === 'Student'){
            console.log("userID: ", userId);
            navigate('/student-main');
        }
      })
      .catch(error => {
        console.error('로그인 실패:', error);
      });
  };

  const handleSignUpClick = () => {
    navigate('/signup');  // /signup 페이지로 이동
  };

  return (
    <div className="login-container">
      <Navbar />
      <div className="login-content">
        {/* 좌측에 이미지 배치 */}
        <div className="left-section">
          <img src={require('../assets/login-image.png')} alt="Login" className="login-image" />
        </div>
        <div className="right-section">
          <div className="site-title">
            <h1>고려대학교 수강신청 사이트</h1>
            <h2>suKang</h2>
          </div>
          <Form
            name="login-form"
            className="login-form"
            onFinish={onFinish}
          >
            <h2>로그인</h2>
            <Form.Item
              name="username"
              rules={[{ required: true, message: '아이디를 입력해주세요!' }]}
            >
              <Input placeholder="아이디를 입력해주세요" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}
            >
              <Input.Password placeholder="비밀번호를 입력해주세요" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-button">
                확인
              </Button>
              <Button type="link" className="signup-link" onClick={handleSignUpClick}>
              회원가입
            </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
