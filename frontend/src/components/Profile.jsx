import React, { useState } from "react";
import styled from "styled-components";
import { cardStyles } from "./ReusableStyles";
import { FaCheckCircle, FaCertificate, FaQuestionCircle } from "react-icons/fa";

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

  const tips = [
    { tip: "자기소개 부탁드립니다." },
    { tip: "지원한 직무에서 가장 중요한 역량은 무엇이라고 생각하나요?" },
    { tip: "최근에 읽은 기술 관련 기사나 책이 있다면 소개해주세요." },
    { tip: "본인의 단점은 무엇이며, 이를 어떻게 극복하고 있나요?" },
    { tip: "우리 회사를 선택한 이유는 무엇인가요?" },
    { tip: "팀 프로젝트에서 갈등이 있었을 때 어떻게 해결했나요?" },
    { tip: "지원 직무에 필요한 기술을 어떻게 습득했나요?" },
    { tip: "1년 뒤 본인의 모습을 상상해본다면 어떤 모습일까요?" }
  ];

  return (
    <Section>
      <div className="tabs">
        <button className={activeTab === "spec" ? "active" : ""} onClick={() => setActiveTab("spec")}>합격 스펙</button>
        <button className={activeTab === "news" ? "active" : ""} onClick={() => setActiveTab("news")}>트렌드</button>
        <button className={activeTab === "tip" ? "active" : ""} onClick={() => setActiveTab("tip")}>면접 질문</button>
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
          <div className="list">
            {tips.map((t, index) => (
              <div className="item" key={index}>
                <FaQuestionCircle className="icon yellow" />
                <div className="question">
                  <p>{t.tip}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}

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
    overflow-y: auto;
    padding-right: 0.5rem;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .spec-label {
      font-size: 0.8rem;
      color: #ffc107;
      margin-bottom: 0.3rem;
      font-weight: bold;
    }
  }

  .item {
    display: flex;
    gap: 0.8rem;
    align-items: flex-start;
    line-height: 1.3;

    .icon {
      font-size: 1.4rem;
      margin-top: 0.2rem;
    }

    .green {
      color: #00e676;
    }

    .yellow {
      color: #ffc107;
    }

    .post {
      .company {
        font-size: 0.85rem;
        color: #4da6ff;
        font-weight: 600;
        margin-bottom: 0.3rem;
      }

      .spec-content {
        font-size: 0.9rem;
        color: #ccc;
      }
    }

    .question {
      p {
        font-size: 0.9rem;
        color: #ccc;
        margin: 0;
      }
    }
  }

  .news-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .news-card {
    background-color: #2a2a2a;
    padding: 0.9rem 1rem;
    border-radius: 0.6rem;
    border-left: 4px solid #ffc107;

    .news-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;

      h4 {
        color: #fff;
        margin: 0;
        font-size: 1rem;
      }

      .source {
        color: #aaa;
        font-size: 0.8rem;
      }
    }

    .summary {
      font-size: 0.9rem;
      color: #ccc;
      margin: 0;
    }
  }
`
