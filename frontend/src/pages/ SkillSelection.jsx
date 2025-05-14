import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const languageSkills = ["C", "C++", "C#", "Java", "Python", "Ruby", "JavaScript"];
const frameworkSkills = ["ReactJS", "Node.js", "TypeScript", "Vue.js", "jQuery", "Flutter"];
const collaborationTools = ["Git", "Slack", "Jira", "Notion", "Trello", "Figma"];

export default function SkillSelection() {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedFrameworks, setSelectedFrameworks] = useState([]);
  const [selectedTools, setSelectedTools] = useState([]);

  const [otherLanguage, setOtherLanguage] = useState("");
  const [otherFramework, setOtherFramework] = useState("");
  const [otherTool, setOtherTool] = useState("");

  const navigate = useNavigate();

  const toggleSelection = (skill, setFunc, selected) => {
    setFunc(
      selected.includes(skill)
        ? selected.filter((s) => s !== skill)
        : [...selected, skill]
    );
  };

  const handleNext = () => {
    const fullSkills = {
      languages: [...selectedLanguages, ...(otherLanguage ? [otherLanguage] : [])],
      frameworks: [...selectedFrameworks, ...(otherFramework ? [otherFramework] : [])],
      tools: [...selectedTools, ...(otherTool ? [otherTool] : [])],
    };
    console.log("선택된 스킬:", fullSkills);
    // navigate("/next-step");
  };

  const handleBack = () => {
    navigate("/job-interest");
  };

  return (
    <Container>
      <Box>
        <Section>
          <Title>언어</Title>
          <SubTitle>가장 자신있는 언어를 골라주세요</SubTitle>
          <SkillGrid>
            {languageSkills.map((skill) => (
              <SkillTag
                key={skill}
                selected={selectedLanguages.includes(skill)}
                onClick={() => toggleSelection(skill, setSelectedLanguages, selectedLanguages)}
              >
                {skill}
              </SkillTag>
            ))}
          </SkillGrid>
          <OtherInput
            placeholder="기타 자유롭게 작성"
            value={otherLanguage}
            onChange={(e) => setOtherLanguage(e.target.value)}
          />
        </Section>

        <Divider />

        <Section>
          <Title>프레임워크</Title>
          <SubTitle>가장 잘 다룰 수 있는 프레임워크를 골라주세요</SubTitle>
          <SkillGrid>
            {frameworkSkills.map((skill) => (
              <SkillTag
                key={skill}
                selected={selectedFrameworks.includes(skill)}
                onClick={() => toggleSelection(skill, setSelectedFrameworks, selectedFrameworks)}
              >
                {skill}
              </SkillTag>
            ))}
          </SkillGrid>
          <OtherInput
            placeholder="기타 자유롭게 작성"
            value={otherFramework}
            onChange={(e) => setOtherFramework(e.target.value)}
          />
        </Section>

        <Divider />

        <Section>
          <Title>협업 툴</Title>
          <SubTitle>가장 많이 다뤄본 협업 툴을 골라주세요</SubTitle>
          <SkillGrid>
            {collaborationTools.map((tool) => (
              <SkillTag
                key={tool}
                selected={selectedTools.includes(tool)}
                onClick={() => toggleSelection(tool, setSelectedTools, selectedTools)}
              >
                {tool}
              </SkillTag>
            ))}
          </SkillGrid>
          <OtherInput
            placeholder="기타 자유롭게 작성"
            value={otherTool}
            onChange={(e) => setOtherTool(e.target.value)}
          />
        </Section>

        <ButtonWrapper>
          <BackButton onClick={handleBack}>이전</BackButton>
          <NextButton onClick={handleNext}>완료</NextButton>
        </ButtonWrapper>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  background-color: #0d0d0d;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  background-color: #3a3a3a;
  padding: 2.5rem;
  border-radius: 1rem;
  width: 700px;
  color: white;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #ffc107;
  margin-bottom: 0.5rem;
`;

const SubTitle = styled.p`
  font-weight: bold;
  margin-bottom: 0.8rem;
`;

const SkillGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SkillTag = styled.div`
  padding: 0.6rem 1rem;
  border-radius: 2rem;
  background-color: ${({ selected }) => (selected ? "#ffc107" : "#eee")};
  color: ${({ selected }) => (selected ? "black" : "#333")};
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
`;

const OtherInput = styled.input`
  width: 100%;
  margin-top: 0.8rem;
  padding: 0.7rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 1rem;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #999;
  margin: 2rem 0;
`;

const ButtonWrapper = styled.div`
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
    background-color: rgb(184, 179, 173);
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
