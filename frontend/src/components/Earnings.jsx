import React from "react";
import styled from "styled-components";
import { cardStyles } from "./ReusableStyles";

export default function Certifications() {
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

  return (
    <Section>
      <h3>필수 자격증 안내</h3>
      <div className="cert-list">
        {certs.map((c, index) => (
          <div className="cert" key={index}>
            <div className="left">
              <h4>{c.name}</h4>
              <p>{c.job}</p>
              <span>{c.detail}</span>
            </div>
            <div className="right">
              <p className="due">{c.due}</p>
              <a href={`https://${c.link}`} target="_blank" rel="noreferrer">{c.link}</a>
            </div>
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
  height: 25rem;
  h3 {
    text-align: center;
    color: #ffc107;
    font-family: "Pretendard-Bold", sans-serif;
    letter-spacing: 0.05rem;
  }

  .cert-list {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    max-height: 30rem; /* 적당한 세로 제한 */
    overflow-y: auto;
    padding-right: 0.5rem; /* 스크롤바 공간 확보 */

    /* 스크롤바 스타일 (선택) */
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

    .cert {
      display: flex;
      justify-content: space-between;
      background-color: #2b2b2b;
      padding: 1rem;
      border-radius: 0.8rem;
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
  }
`;