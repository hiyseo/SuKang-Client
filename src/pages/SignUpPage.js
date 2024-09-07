// src/pages/SignUpPage.js
import React, { useState } from 'react';
import { Form, Input, Button, Radio } from 'antd';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../styles/SignUpPage.css';
import {useNavigate} from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('Professor'); // 기본값을 '교수'로 설정

  const onFinish = (values) => {
    const dataToSend = {
        username: values.username,
        password: values.password,
        name: values.name,
        student_id: userType === 'Student' ? values.student_id : null,  // 학생이면 student_id 포함
        // department_id: userType === 'Student' ? values.department_id : null,  // 학생일 경우 학과 ID
        status: userType  // status 값으로 'Professor' 또는 'Student' 전송
      };

    axios.post('http://localhost:3000/users/signup', dataToSend, { withCredentials: true })
      .then(response => {
        console.log('회원가입 성공:', response.data);
        navigate('/');
      })
      .catch(error => {
        console.log("values: ", dataToSend);
        console.error('회원가입 실패:', error);
      });
  };

  const onUserTypeChange = (e) => {
    setUserType(e.target.value);
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
          name="signup-form"
          className="signup-form"
          onFinish={onFinish}
        >
          <h2>회원가입</h2>
          <Form.Item>
            <Radio.Group onChange={onUserTypeChange} value={userType}>
              <Radio.Button value="Professor">교수</Radio.Button>
              <Radio.Button value="Student">학생</Radio.Button>
            </Radio.Group>
          </Form.Item>
          
          <Form.Item
            name="username"
            rules={[{ required: true, message: '아이디를 입력해주세요!' }]}
          >
            <Input placeholder="아이디를 입력해주세요" />
          </Form.Item>

          {userType === 'Student' && (
            <Form.Item
              name="student_id"
              rules={[{ required: true, message: '학번을 입력해주세요!' }]}
            >
              <Input placeholder="학번을 입력해주세요" />
            </Form.Item>
          )}

          <Form.Item
            name="password"
            rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}
          >
            <Input.Password placeholder="비밀번호를 입력해주세요" />
          </Form.Item>

          <Form.Item
            name="confirm_password"
            rules={[{ required: true, message: '비밀번호 확인을 입력해주세요!' }]}
          >
            <Input.Password placeholder="비밀번호 확인" />
          </Form.Item>

          <Form.Item
            name="name"
            rules={[{ required: true, message: '이름을 입력해주세요!' }]}
          >
            <Input placeholder="이름을 입력해주세요" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              확인
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
    </div>
  );
};

export default SignUpPage;
