import React from "react";
import styled from "styled-components";
import { cardStyles } from "./ReusableStyles";
import { FaCheckCircle, FaClock, FaGithub, FaPenNib, FaTasks, FaLaptopCode } from "react-icons/fa";

const challenges = [
  {
    icon: <FaLaptopCode />,
    text: "프론트엔드 과제형 코딩테스트 1회 완수",
    status: "complete",
  },
  {
    icon: <FaGithub />,
    text: "깃허브에 포트폴리오 프로젝트 README 업로드",
    status: "in-progress",
  },
  {
    icon: <FaTasks />,
    text: "코테 준비용 알고리즘 문제 5문제 풀기",
    status: "pending",
  },
  {
    icon: <FaPenNib />,
    text: "자기소개서 2문항 클리닉 받기",
    status: "pending",
  },
];

export default function ChallengeRoadmap() {
  const progress = 25; // 예시 진행률 (나중에 계산 가능)
  const { img, message } = getProgressVisual(progress);

  return (
    <Wrapper>
      <h3>취업 로드맵</h3>
      <p className="subtext">🎯 목표 직무: 프론트엔드 개발자 · ⏱ D-5</p>
      <ChallengeList>
        {challenges.map((item, idx) => (
          <ChallengeItem key={idx} status={item.status}>
            <div className="icon">{item.icon}</div>
            <div className="text">{item.text}</div>
            <div className="status">
              {item.status === "complete" && "완료"}
              {item.status === "in-progress" && "진행 중"}
              {item.status === "pending" && "미완료"}
            </div>
          </ChallengeItem>
        ))}
      </ChallengeList>
      <ProgressBarWrapper>
        <img src={img} alt="패트와 매트" className="character" />
        <div className="label-box">
          <div className="label">이번 주 목표 달성률</div>
          <div className="message">{message}</div>
        </div>
        <div className="progress">
          <div className="fill" style={{ width: `${progress}%` }} />
        </div>
      </ProgressBarWrapper>
    </Wrapper>
  );
}

function getProgressVisual(progress) {
  if (progress < 26) return { img: "/images/patmat_removebg1.png", message: "아직 할 일이 많아요!" };
  if (progress < 51) return { img: "/images/patmat_removebg1.png", message: "조금씩 해내고 있어요!" };
  if (progress < 76) return { img: "/images/patmat_removebg1.png", message: "둘이 함께 힘내는 중!" };
  return { img: "/images/patmat_removebg1.png", message: "완전 성공적이에요!" };
}

const Wrapper = styled.section`
  ${cardStyles};
  padding: 1.5rem;
  color: white;
  width: 100%;
  max-width: 750px;
  max-height: 435px;
  background-color: #1e1e1e;
  border-radius: 1rem;
  box-shadow: 0 0 12px rgba(255, 193, 7, 0.15);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  h3 {
    font-size: 1.4rem;
    font-weight: bold;
    color: #ffc107;
    margin: 0;
    text-align: center;
  }

  .subtext {
    text-align: center;
    font-size: 0.85rem;
    color: #bbb;
    margin-bottom: 0.5rem;
  }
`;

const ChallengeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const ChallengeItem = styled.div`
  background-color: ${({ status }) =>
    status === "complete"
      ? "#2e7d32"
      : status === "in-progress"
      ? "#f9a825"
      : "#3a3a3a"};
  color: white;
  border-radius: 0.6rem;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: inset 0 0 0 1px #333;

  .icon {
    font-size: 1.3rem;
    color: white;
    flex-shrink: 0;
  }

  .text {
    flex: 1;
    font-size: 0.9rem;
  }

  .status {
    font-size: 0.8rem;
    font-weight: bold;
    color: ${({ status }) =>
      status === "complete"
        ? "#a5d6a7"
        : status === "in-progress"
        ? "#fff59d"
        : "#e0e0e0"};
  }
`;

const ProgressBarWrapper = styled.div`
  margin-top: auto;
  padding: 0.2rem 0.1rem;
  display: flex;
  align-items: center;

  .character {
    width: 5.5rem;
    height: auto;
    margin-left: 0.1rem;  // ✅ 이미지와 텍스트 간격 좁힘
    margin-right: 0.1rem;
  }

  .label-box {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    margin-right: 1.5rem;   // ✅ 텍스트와 진행률 바 간격 넓힘

    .label {
      font-size: 0.85rem;
      font-weight: bold;
      color: #ffc107;
    }

    .message {
      font-size: 0.75rem;
      color: #ccc;
    }
  }

  .progress {
    flex: 1;
    height: 0.6rem;
    background: #444;
    border-radius: 0.3rem;
    overflow: hidden;

    .fill {
      height: 100%;
      background: #ffc107;
      transition: width 0.4s ease;
    }
  }
`;


