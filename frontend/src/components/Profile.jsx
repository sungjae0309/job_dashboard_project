import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { cardStyles } from "./ReusableStyles";
import {
  FaCheckCircle,
  FaCertificate,
  FaQuestionCircle,
  FaUniversity,
  FaBook,
  FaBriefcase,
  FaSyncAlt,
  FaBuilding
} from "react-icons/fa";

export default function CareerInsightsCard() {
  const [activeTab, setActiveTab] = useState("spec");

  const specs = [
    { company: "카카오", content: "토익 850, 컴활 1급, 개발 동아리 2년 활동" },
    { company: "라인", content: "CS 전공자, 인턴 경험 1회, 코딩 테스트 3회 합격" },
  ];

  const news = [
    {
      title: "SQLD 자격 기준 변경",
      source: "kdata.or.kr",
      summary: "2024년부터 SQLD 시험은 일부 과목이 개편되어 출제 범위가 달라졌습니다."
    },
    {
      title: "ChatGPT 자격증 출시",
      source: "openai.com",
      summary: "AI 활용 능력을 평가하는 새로운 자격 인증이 도입되었습니다."
    },
    {
      title: "정보처리기사 CBT 전환",
      source: "q-net.or.kr",
      summary: "기존 필기시험이 컴퓨터 기반 테스트로 전면 전환됩니다."
    }
  ];

  const mentors = [
    { field: "토스", school: "중앙대학교", major: "소프트웨어학부", job: "프론트엔드 개발자" },
    { field: "우아한형제", school: "서울대학교", major: "통계학과", job: "데이터 분석가" },
    { field: "당근마켓", school: "연세대학교", major: "컴퓨터공학과", job: "백엔드 개발자" },
    { field: "AI", school: "KAIST", major: "AI학과", job: "AI 엔지니어" }
  ];

  const [currentMentor, setCurrentMentor] = useState(mentors[0]);
  const [isRotating, setIsRotating] = useState(false);

  const fetchMentor = () => {
    setIsRotating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * mentors.length);
      setCurrentMentor(mentors[randomIndex]);
      setIsRotating(false);
    }, 500);
  };

  return (
    <Section>
      <div className="tabs">
        <button className={activeTab === "spec" ? "active" : ""} onClick={() => setActiveTab("spec")}>합격 스펙</button>
        <button className={activeTab === "news" ? "active" : ""} onClick={() => setActiveTab("news")}>트렌드</button>
        <button className={activeTab === "tip" ? "active" : ""} onClick={() => setActiveTab("tip")}>멘토링 매칭</button>
      </div>

      <div className="content">
        {activeTab === "spec" && (
          <div className="list">
            <p className="spec-label">합격자 스펙 요약</p>
            {specs.map((spec, index) => (
              <div className="item" key={index}>
                <FaCheckCircle className="icon green" />
                <div className="post">
                  <p className="company">최종 합격 기업: {spec.company}</p>
                  <p className="spec-content">{spec.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "news" && (
          <div className="news-list">
            {news.map((item, index) => (
              <div className="news-card" key={index}>
                <div className="news-header">
                  <h4>{item.title}</h4>
                  <span className="source">{item.source}</span>
                </div>
                <p className="summary">{item.summary}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "tip" && (
          <>
            <h4 className="mentor-title">🎓 매칭 결과</h4>
            <div className="mentor-box">
              <div className="mentor-header">
                <h4>멘토 정보</h4>
                <FaSyncAlt
                  className={`refresh-icon ${isRotating ? "rotating" : ""}`}
                  onClick={fetchMentor}
                />
              </div>

              

              <div className="mentor-info">
                <p><FaBuilding /><strong>기업:</strong> {currentMentor.field}</p>
                <p><FaBriefcase /> <strong>직무:</strong> {currentMentor.job}</p>
                <p><FaUniversity /> <strong>학교:</strong> {currentMentor.school}</p>
                <p><FaBook /> <strong>전공:</strong> {currentMentor.major}</p>
              </div>

              <div className="mentor-actions">
                <button className="mentor-btn">멘토에게 질문하기</button>
                <button className="mentor-appoint-btn">멘토와 약속 잡기</button>
              </div>
            </div>
          </>
        )}
      </div>
    </Section>
  );
}

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Section = styled.section`
  ${cardStyles};
  height: 25rem;
  display: flex;
  flex-direction: column;
  padding: 1.2rem;
  gap: 1.2rem;

  .tabs {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #444;
    padding-bottom: 0.5rem;

    button {
      background: none;
      border: none;
      color: #999;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      padding: 0.4rem 0.6rem;
      position: relative;

      &.active {
        color: #ffc107;
      }

      &.active::after {
        content: "";
        position: absolute;
        bottom: -6px;
        left: 0;
        right: 0;
        height: 2px;
        background-color: #ffc107;
      }
    }
  }

  .content {
    flex: 1;
    padding-right: 0.5rem;
    overflow: hidden; /* 스크롤 없애기 */
  }

  .mentor-title {
    font-size: 1.1rem;
    font-weight: bold;
    color: #fff; /* 흰색으로 */
    margin-bottom: 0.5rem;
    padding-left: 0.3rem;
  }

  .mentor-box {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #2a2a2a;
    padding: 1rem;
    border-radius: 0.6rem;
    border-left: 4px solid #ffc107; /* 은은한 파랑 계열로 변경 */
    color: #ccc;

    .mentor-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h4 {
        margin: 0;
        font-size: 1.05rem;
        color: #fff;
      }

      .refresh-icon {
        font-size: 1.2rem;
        color:rgb(249, 248, 244); /* 동일한 파랑 */
        cursor: pointer;
        transition: transform 0.5s ease;

        &.rotating {
          animation: ${rotate360} 0.6s linear;
        }

        &:hover {
          color: #ffc107;
        }
      }
    }

    .mentor-field {
      p {
        font-size: 0.9rem;
        color: #eee;
        margin: 0;
      }
    }

    .mentor-info {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      p {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        color: #ccc;

        svg {
          color: #ccc; /* 아이콘도 글자와 통일 */
        }
      }
    }

    .mentor-actions {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .mentor-btn {
        background-color:rgb(97, 97, 95);
        color: white;
        font-weight: bold;
        border: none;
        border-radius: 0.5rem;
        
        padding: 0.6rem;
        cursor: pointer;
        font-size: 0.9rem;

        &:hover {
          background-color: #ffc107;
          color: black;
        }
      }

      .mentor-appoint-btn {
        background-color: rgb(97, 97, 95);
        color: white;
        font-weight: bold;
        
        border-radius: 0.5rem;
        padding: 0.6rem;
        cursor: pointer;
        font-size: 0.9rem;

        &:hover {
          background-color: #ffc107;
          color: black;
        }
      }
    }
  }
`;
