import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 선택지 리스트
const jobOptions = [
  "프론트엔드 개발자", "백엔드 개발자", "데이터 분석가", "AI 엔지니어",
  "UX/UI 디자이너", "PM/PO", "모바일 앱 개발자", "DevOps 엔지니어",
  "게임 개발자", "보안 전문가", "QA 엔지니어"
];

export default function JobInterest() {
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [customJob, setCustomJob] = useState("");
  const navigate = useNavigate();

  // 태그 토글
  const toggleJob = (job) => {
    setSelectedJobs((prev) =>
      prev.includes(job) ? prev.filter((j) => j !== job) : [...prev, job]
    );
  };

  const handleNext = (e) => {
    e.preventDefault();
    const allJobs = [...selectedJobs];
    if (customJob.trim()) allJobs.push(customJob.trim());

    if (allJobs.length === 0) {
      alert("관심 직무를 하나 이상 선택하거나 입력해주세요.");
      return;
    }

    console.log("관심 직무:", allJobs);
    navigate("/skillselection");
  };

  return (
    <Wrapper>
      <FormContainer>
        <Title>희망 직무를 선택해주세요</Title>

        <SubTitle></SubTitle>
        <JobGrid>
          {jobOptions.map((job) => (
            <JobTag
              key={job}
              selected={selectedJobs.includes(job)}
              onClick={() => toggleJob(job)}
            >
              {job}
            </JobTag>
          ))}
        </JobGrid>

        <Input
          type="text"
          placeholder="기타 자유롭게 작성"
          value={customJob}
          onChange={(e) => setCustomJob(e.target.value)}
        />

        <ButtonGroup>
          <Button type="button" onClick={() => navigate(-1)}>이전</Button>
          <NextButton type="submit" onClick={handleNext}>다음</NextButton>
        </ButtonGroup>
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
  width: 42rem;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 3.5rem;
  font-size: 1.7rem;
  color: #ffc107;
`;

const SubTitle = styled.p`
  margin-bottom: 0.7rem;
  font-weight: bold;
`;

const JobGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const JobTag = styled.div`
  padding: 0.6rem 1rem;
  border-radius: 2rem;
  background-color: ${({ selected }) => (selected ? "#ffc107" : "#eee")};
  color: ${({ selected }) => (selected ? "#000" : "#333")};
  font-weight: 500;
  cursor: pointer;
  user-select: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-top: 1rem;
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

const Button = styled.button`
  padding: 0.8rem 2rem;
  background: #f2f2f2;
  color: #000;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background: #ccc;
  }
`;

const NextButton = styled(Button)`
  background-color: #ffc107;

  &:hover {
    background-color: #e6ac00;
  }
`;
