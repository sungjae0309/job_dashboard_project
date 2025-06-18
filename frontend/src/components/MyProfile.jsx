import React, { useState } from "react";
import styled from "styled-components";

export default function Profile() {
  // 기본 프로필 state 예시
  const [form, setForm] = useState({
    name: "홍길동",
    email: "hong@jobmate.com",
    phone: "010-0000-0000",
    bio: "자기소개를 입력하세요.",
    // 필요한 항목 추가
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 서버로 수정 요청 보내는 코드 추가 가능
    alert("프로필이 저장되었습니다.");
  };

  return (
    <Wrapper>
      <h2>내 프로필</h2>
      <form onSubmit={handleSubmit}>
        <label>이름</label>
        <input name="name" value={form.name} onChange={handleChange} />

        <label>이메일</label>
        <input name="email" value={form.email} onChange={handleChange} />

        <label>전화번호</label>
        <input name="phone" value={form.phone} onChange={handleChange} />

        <label>소개</label>
        <textarea name="bio" value={form.bio} onChange={handleChange} />

        <button type="submit">프로필 저장</button>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 2rem auto;
  max-width: 500px;
  background: #232323;
  color: #fff;
  padding: 2rem 2rem 1.2rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 16px rgba(255,193,7,0.11);

  h2 {
    color: #ffc107;
    margin-bottom: 1.6rem;
    text-align: center;
  }
  label {
    font-weight: bold;
    margin-top: 1.2rem;
    display: block;
    margin-bottom: 0.4rem;
    color: #ffc107;
  }
  input, textarea {
    width: 100%;
    border: none;
    border-radius: 0.6rem;
    padding: 0.7rem;
    margin-bottom: 0.9rem;
    font-size: 1rem;
    background: #313131;
    color: #fff;
    resize: none;
  }
  button {
    width: 100%;
    padding: 0.7rem;
    background: #ffc107;
    color: #232323;
    font-weight: bold;
    border: none;
    border-radius: 0.7rem;
    font-size: 1.1rem;
    margin-top: 0.9rem;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    &:hover {
      background: #232323;
      color: #ffc107;
      border: 1px solid #ffc107;
    }
  }
`;
