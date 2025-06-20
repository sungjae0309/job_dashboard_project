import React, { useState, useEffect } from "react";

import { IoIosArrowForward } from "react-icons/io";
import { FaLanguage, FaUserCheck, FaGraduationCap, FaBriefcase } from "react-icons/fa";
import { MdRecommend } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { IoIosRocket } from "react-icons/io";
import { RiTeamLine } from "react-icons/ri";
import { cardStyles } from "./ReusableStyles";
import axios from "axios";
import styled from "styled-components";



// 아이콘 매핑 (API에서 text에 "어학" 등 들어오면 icon 매칭)
const iconMap = {
  "어학": <FaLanguage />,
  "자격증": <FaUserCheck />,
  "학점": <FaGraduationCap />,
  "나이": <MdRecommend />,
  "분야": <BiCategoryAlt />,
  "직무": <FaBriefcase />,
  "사례": <RiTeamLine />,
  "확장": <IoIosRocket />
};

export default function FAQ() {
  const [selectedTab, setSelectedTab] = useState("분석");
  const [faqs, setFaqs] = useState([]);

  // 탭 바뀌면 FastAPI에서 FAQ 받아옴
  useEffect(() => {
    const type = selectedTab === "분석" ? "analysis" : "diagnosis";
    axios
      .get(`http://192.168.101.36:8000/api/faqs?type=${type}`)
      .then(res => setFaqs(res.data))
      .catch(() => setFaqs([]));
  }, [selectedTab]);

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
        {faqs.map((faq, index) => (
          <FaqItem key={index}>
            <Info>
              <IconWrapper>
                {/* API에서 text: "[어학] ..." 형식이면, [ ] 안의 단어 추출해서 아이콘 매칭 */}
                {(() => {
                  const m = faq.text?.match(/\[(.*?)\]/);
                  const key = m ? m[1] : "";
                  return iconMap[key] || <FaLanguage />;
                })()}
              </IconWrapper>
              <span>{faq.text}</span>
            </Info>
            <IoIosArrowForward />
          </FaqItem>
        ))}
      </FaqList>
    </Section>
  );
}

// --- 스타일 컴포넌트는 네가 원래 쓰던 그대로 아래에 두면 됨 ---


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
