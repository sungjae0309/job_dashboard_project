import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Register() {
    const navigate = useNavigate(); // ✅ 컴포넌트 함수 내부에 위치시켜야 함
  
    const [form, setForm] = useState({
      name: "",
      id: "",
      password: "",
      confirmPassword: "",
    });
  
    const handleNext = () => {
      if (form.password !== form.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
  
      // 유효성 검사 통과 → 다음 페이지로 이동
      console.log("입력된 회원정보:", form);
      navigate("/userinfo");
    };
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    return (
      <Container>
        <Form>
          <h2>회원가입</h2>
          <input
            type="text"
            name="name"
            placeholder="이름"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="id"
            placeholder="아이디"
            value={form.id}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={handleNext}>
            다음
          </button>
        </Form>
      </Container>
    );
  }
  

  const Container = styled.div`
  min-height: 100vh;
  background-color: rgb(13, 13, 13);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  background-color: rgb(71, 69, 69);
  padding: 2rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  width: 20rem;

  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #ffc107;
  }

  input {
    padding: 0.8rem;
    margin-bottom: 1.3rem;
    border: none;
    border-radius: 0.5rem;
    background-color: rgb(241, 238, 238);
    color: black;
  }

  button {
    padding: 1rem;
    background-color: #ffc107;
    color: black;
    font-weight: bold;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;

    &:hover {
      background-color: #e6ac00;
    }
  }
`;
