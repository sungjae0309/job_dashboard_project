import React, { useState } from "react";
import styled from "styled-components";
import { cardStyles } from "./ReusableStyles";

export default function CertAndTechDashboard() {
  const [activeTab, setActiveTab] = useState("certs");

  const certs = [
    {
      name: "ADsP",
      job: "데이터 분석",
      detail: "통계/SQL 기초",
      due: "~ 2024-04-22",
      link: "datasemi.kr",
    },
    {
      name: "정보처리기사",
      job: "SW 개발",
      detail: "국가공인 자격증",
      due: "~ 2024-04-25",
      link: "q-net.or.kr",
    },
    {
      name: "SQLD",
      job: "DB 관리",
      detail: "SQL 데이터",
      due: "~ 2024-05-03",
      link: "kdata.or.kr",
    },
    {
      name: "AWS",
      job: "클라우드 기초",
      detail: "AWS 클라우드 기초 개념 이해",
      due: "~ 수시",
      link: "aws.amazon.com",
    },
    {
      name: "컴활1급",
      job: "사무직, 공공기관",
      detail: "엑셀 필수 역량",
      due: "~ 2024-04-30",
      link: "kamco.or.kr",
    },
  ];

  const stacks = [
    {
      name: "LangChain",
      domain: "LLM 기반 챗봇",
      desc: "GPT + 문서 질의, 에이전트형 서비스",
      link: "https://www.langchain.com",
    },
    {
      name: "FastAPI",
      domain: "백엔드 API 개발",
      desc: "Python 기반 서버, GPT 연동에 적합",
      link: "https://fastapi.tiangolo.com",
    },
    {
      name: "Pinecone",
      domain: "벡터 데이터베이스",
      desc: "임베딩 검색 특화 DB",
      link: "https://www.pinecone.io",
    },
    {
      name: "Streamlit",
      domain: "데이터 시각화",
      desc: "Python 코드만으로 분석 결과 가능",
      link: "https://www.streamlit.io",
    },
    {
      name: "Next.js",
      domain: "프론트엔드",
      desc: "React 기반 프레임워크",
      link: "https://nextjs.org",
    },
  ];

  return (
    <Section>
      <Tabs>
        <button
          className={activeTab === "certs" ? "active" : ""}
          onClick={() => setActiveTab("certs")}
        >
          필수 자격증
        </button>
        <button
          className={activeTab === "stacks" ? "active" : ""}
          onClick={() => setActiveTab("stacks")}
        >
          최소 기술 스택
        </button>
      </Tabs>

      {activeTab === "certs" && (
        <div className="content cert-list">
          {certs.map((c, index) => (
            <div className="cert" key={index}>
              <div className="left">
                <h4>{c.name}</h4>
                <p>{c.job}</p>
                <span>{c.detail}</span>
              </div>
              <div className="right">
                <p className="due">{c.due}</p>
                <a href={`https://${c.link}`} target="_blank" rel="noreferrer">
                  {c.link}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "stacks" && (
        <div className="content stack-list">
          {stacks.map((stack, index) => (
            <div className="stack-card" key={index}>
              <div className="stack-header">
                <h3>{stack.name}</h3>
              </div>
              <p className="domain">{stack.domain}</p>
              <p className="desc">{stack.desc}</p>
              <a
                className="link"
                href={stack.link}
                target="_blank"
                rel="noreferrer"
              >
                {new URL(stack.link).hostname}
              </a>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}

const Section = styled.section`
  ${cardStyles};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  height: 25rem;

  .content {
    flex: 1;
    overflow-y: auto;
    padding-right: 0.5rem;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-track {
      background-color: #1e1e1e;
    }
  }

  .cert-list .cert {
    display: flex;
    justify-content: space-between;
    background-color: #2b2b2b;
    padding: 1rem;
    border-radius: 0.8rem;
    margin-bottom: 0.8rem;
    transition: 0.3s ease-in-out;

    &:hover {
      background-color: #3a3a3a;
    }

    .left {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;

      h4 {
        font-size: 1.1rem;
        font-weight: bold;
        color: white;
      }

      p {
        font-size: 0.9rem;
        color: #cccccc;
      }

      span {
        font-size: 0.8rem;
        color: #999999;
      }
    }

    .right {
      text-align: right;

      .due {
        color: #ffc107;
        font-size: 0.85rem;
        margin-bottom: 0.2rem;
      }

      a {
        color: #87cefa;
        font-size: 0.8rem;
      }
    }
  }

  .stack-list .stack-card {
    background-color: #3a3a3a;
    padding: 1rem 1.2rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-bottom: 1rem;

    .stack-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        font-size: 1.1rem;
        font-weight: bold;
        color: white;
      }
    }

    .domain {
      font-weight: bold;
      color: white;
    }

    .desc {
      font-size: 0.9rem;
      color: #ccc;
    }

    .link {
      font-size: 0.85rem;
      color: #4da3f3;
      text-decoration: underline;
    }
  }
`;

const Tabs = styled.div`
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
`;
  