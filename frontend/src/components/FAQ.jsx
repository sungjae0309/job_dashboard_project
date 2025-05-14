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
      <div className="tab-buttons">
        <button className={selectedTab === "분석" ? "active" : ""} onClick={() => setSelectedTab("분석")}>분석</button>
        <button className={selectedTab === "추천" ? "active" : ""} onClick={() => setSelectedTab("추천")}>추천</button>
      </div>
      <div className="faqs">
        {currentFaqs.map((faq, index) => (
          <div className="faq" key={index}>
            <div className="info">
              {faq.icon}
              <h4>{faq.text}</h4>
            </div>
            <IoIosArrowForward />
          </div>
        ))}
      </div>
    </Section>
  );
}

const Section = styled.section`
  ${cardStyles};
  padding: 1.5rem 1rem;
  height: fit-content;         // 높이 자동
  min-height: 15rem;           // 너무 작아지지 않게 최소 높이

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .tab-buttons {
    display: flex;
    background-color: #333;
    border-radius: 10px;
    overflow: hidden;

    button {
      flex: 1;
      padding: 0.5rem 0.6rem;
      font-size: 0.9rem;
      background-color: #444;
      color: white;
      border: none;
      font-weight: bold;
      cursor: pointer;

      &:hover {
        background-color: #ffc107;
        color: black;
      }

      &.active {
        background-color: #ffc107;
        color: black;
      }

      &:not(:last-child) {
        border-right: 2px solid #666;
      }
    }
  }

  .faqs {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem; //문장 위아래 간격

    .faq {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.2rem 0.4rem;
      border-bottom: 1px solid #555;

      .info { //아이콘, 글씨 
        display: flex;
        align-items: center;
        gap: 1.5rem;

        svg { //아이콘 크기
          font-size: 2rem;
        }

        h4 { //글씨 크기
          font-size: 0.9rem;
          font-weight: 400;
        }
      }

      svg { //옆에 괄호 아이콘 크기
        font-size: 2.15rem;
        color: #aaa;
      }
    }
  }
`;