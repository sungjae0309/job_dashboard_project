import React, { useState } from "react";
import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import { FaLanguage, FaUserCheck, FaGraduationCap, FaBriefcase } from "react-icons/fa";
import { MdRecommend } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { IoIosRocket } from "react-icons/io";
import { RiTeamLine } from "react-icons/ri";
import { cardStyles } from "./ReusableStyles";

export default function FAQ() {
  const [selectedTab, setSelectedTab] = useState("분석");

  const analysisFaqs = [
    { icon: <FaLanguage />, text: "[어학] 평균보다 20점 높아요" },
    { icon: <FaUserCheck />, text: "[자격증] 평균보다 2개를 더 보유하고 있어요" },
    { icon: <FaGraduationCap />, text: "[학점] 평균보다 다소 낮아요" },
    { icon: <MdRecommend />, text: "[개선] 학점을 더 개선하셔야 해요" },
  ];

  const diagnosisFaqs = [
    { icon: <BiCategoryAlt />, text: "[분야] 스펙에 적합한 분야는 DB 구축이에요." },
    { icon: <FaBriefcase />, text: "[직무] 스펙에 적합한 직무는 데이터 분석가에요" },
    { icon: <RiTeamLine />, text: "[사례] 현재 스펙과 가장 유사한 합격 사례로 3건이 있어요." },
    { icon: <IoIosRocket />, text: "[확장] 글로벌 직무에도 충분히 도전 가능해요." },
  ];

  const currentFaqs = selectedTab === "분석" ? analysisFaqs : diagnosisFaqs;

  return (
    <Section>
      <Header>
        <TabButton
          className={selectedTab === "분석" ? "active" : ""}
          onClick={() => setSelectedTab("분석")}
        >
          분석
        </TabButton>
        <TabButton
          className={selectedTab === "추천" ? "active" : ""}
          onClick={() => setSelectedTab("추천")}
        >
          추천
        </TabButton>
      </Header>

      <FaqList>
        {currentFaqs.map((faq, index) => (
          <FaqItem key={index}>
            <Info>
              <IconWrapper>{faq.icon}</IconWrapper>
              <span>{faq.text}</span>
            </Info>
            <IoIosArrowForward />
          </FaqItem>
        ))}
      </FaqList>
    </Section>
  );
}

const Section = styled.section`
  ${cardStyles};
  height: 100%;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  background-color: #333;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 0.4rem 0;            // ✅ 세로 패딩 줄임
  height: 1.9rem;               // ✅ 세로 높이 줄여서 스크롤 제거
  background-color: #444;
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  border: none;
  cursor: pointer;

  &.active {
    background-color: #ffc107;
    color: black;
  }

  &:hover {
    background-color: #ffc107;
    color: black;
  }

  &:not(:last-child) {
    border-right: 2px solid #666;
  }
`;


const FaqList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FaqItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.5rem;
  border-bottom: 1px solid #555;

  svg {
    font-size: 1.8rem;
    color: #aaa;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  span {
    font-size: 0.85rem;
    font-weight: 400;
  }
`;

const IconWrapper = styled.div`
  svg {
    font-size: 1.8rem;
    color: white; // ✅ 모든 아이콘 색 흰색으로 통일
  }
`;
