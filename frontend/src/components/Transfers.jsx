import React from "react";
import styled from "styled-components";
import { cardStyles } from "./ReusableStyles";

export default function TechStack() {
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
      <div className="title">
        <h3>
           <span className="highlight">최소 기술 스택</span>
        </h3>
      </div>
      <div className="tech-stack-box">
        {stacks.map((stack, index) => (
          <div className="stack-card" key={index}>
            <div className="stack-header">
              <h3>{stack.name}</h3>
              <span className="dday">{stack.dday}</span>
            </div>
            <p className="domain">{stack.domain}</p>
            <p className="desc">{stack.desc}</p>
            <a className="link" href={stack.link} target="_blank" rel="noreferrer">
              {new URL(stack.link).hostname}
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
}

const Section = styled.section`
  ${cardStyles};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  height: 25rem; /* ✅ 자격증 박스와 동일하게 고정 */

  .title {
    text-align: center;

    h3 {
      font-size: 1.1rem;
      color: white;
      span.highlight {
        color: #ffc107;
      }
    }
  }

  .tech-stack-box {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-height: 30rem; /* ✅ 자격증과 동일한 제한 */
    overflow-y: auto;  /* ✅ 넘칠 경우 스크롤 활성화 */
    padding-right: 0.5rem;

    /* ✅ 스크롤바 스타일 (웹킷 기반 브라우저용) */
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

  .stack-card {
    background-color: #3a3a3a;
    padding: 1rem 1.2rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    .stack-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        font-size: 1.1rem;
        font-weight: bold;
        color: white;
      }

      .dday {
        color: #ffc107;
        font-size: 0.85rem;
        font-weight: 500;
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
