import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function UserInfo() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    education: "",
    school: "",
    major: "",
    grade: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    // 나중에 이 데이터를 context나 localStorage 등에 저장해도 좋음
    navigate("/experience");
  };

  return (
    <Wrapper>
      <FormContainer>
        <Title>개인정보 입력 (필수) </Title>
        <form onSubmit={handleNext}>
        <Label>학교명</Label>
          <Input name="school" value={form.school} onChange={handleChange} placeholder="학교를 입력해주세요" required />

          <Label>전공</Label>
          <Input name="major" value={form.major} onChange={handleChange} placeholder="주전공을 입력해주세요" required />

          <Label>학점</Label>
          <Input name="major" value={form.major} onChange={handleChange} placeholder="학점을 입력해주세요" required />

          <Label>학년</Label>
          <select style={inputStyle} defaultValue="">
            <option value="" disabled hidden>학년을 선택해주세요</option>
            <option value="1">1학년</option>
            <option value="2">2학년</option>
            <option value="3">3학년</option>
            <option value="4">4학년</option>
          </select>
          


          <ButtonGroup>
            <BackButton type="button">이전</BackButton>
            <NextButton type="submit">다음</NextButton>
          </ButtonGroup>
        </form>
      </FormContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  background: #121212;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  background: #3a3a3a;
  padding: 2.5rem;
  border-radius: 1.2rem;
  width: 40rem;
`;

const inputStyle = {
    width: "100%",
    padding: "0.8rem",
    marginBottom: "1.3rem",
    border: "none",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    backgroundColor: "rgb(241, 238, 238)",
    color: "black"
  };
  

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #ffc107;
`;

const Label = styled.label`
  display: block;
  margin: 1rem 0 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #f2f2f2;
  color: #000;
  font-size: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.9rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #f2f2f2;
  color: #000;
  font-size: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const BackButton = styled.button`
  padding: 0.8rem 2rem;
  background-color: #f2f2f2;
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color:rgb(184, 179, 173);
  }
`;

const NextButton = styled.button`
  padding: 0.8rem 2rem;
  background-color: #ffc107; 
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #e6ac00; 
  }
`;

