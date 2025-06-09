import React, { useState } from "react";
import styled from "styled-components";
import {
  FaHeart,
  FaRegHeart,
  FaThumbsUp,
  FaLink
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useLikedJobs } from "../contexts/LikedJobsContext";

export default function AIJobModal({ jobPosts, onClose }) {
  const { likedJobs, toggleLike } = useLikedJobs();
  const [showChatbot, setShowChatbot] = useState(false);

  const handleReasonClick = () => {
    setShowChatbot(true);
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <Header>
          <h2>AI 추천 공고 전체보기</h2>
          <IoMdClose className="close-icon" onClick={onClose} />
        </Header>

        {/* 공통 알고리즘 설명 */}
        <AlgorithmExplanation>
        추천 공고는 사용자의 정보들을 바탕으로 AI가 분석하여 추천한 결과입니다.
        </AlgorithmExplanation>

        <JobList>
          {jobPosts.map((job, index) => (
            <JobCard key={index}>
              <div className="job-header">
                <div className="text-block">
                  <strong>{job.company_name}</strong>
                  <p>{job.job_title} / {job.experience_level}</p>
                  <p>{job.location} | {job.employment_type}</p>
                </div>

                <div className="right-section">
                  <LikeSection
                    liked={likedJobs.some((j) => j.id === job.id)}
                    onClick={() => toggleLike(job)}
                  >
                    {likedJobs.some((j) => j.id === job.id) ? <FaHeart /> : <FaRegHeart />}
                    <span>찜하기</span>
                  </LikeSection>

                  <div
                    className="action-item reason"
                    onClick={handleReasonClick}
                  >
                    <FaThumbsUp />
                    <span>추천 이유</span>
                  </div>

                  <a
                    href={job.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-item check"
                  >
                    <FaLink />
                    <span>링크 연결</span>
                  </a>
                </div>
              </div>
            </JobCard>
          ))}
        </JobList>

        {/* 챗봇 팝업 */}
        {showChatbot && (
          <ChatbotPopup>
            <div className="chat-header">
              <span>AI 챗봇</span>
              <button onClick={() => setShowChatbot(false)}>×</button>
            </div>
            <div className="chat-body">
              <p>📌 <strong>추천 이유:</strong> 우아한형제들 프론트엔드 개발자 포지션은 React, JavaScript, HTML/CSS 등 웹 프론트엔드 기술에 능숙한 인재를 요구합니다.</p>
              <p>사용자는 HTML/CSS, JavaScript, React, Node.js 등의 스택을 보유하고 있고, React 기반 포트폴리오 사이트와 Node.js + MongoDB 게시판 프로젝트 등의 실무형 경험을 보유하고 있어 기술적으로 적합합니다.</p>
              <p>또한 GitHub에 3건 이상의 포트폴리오를 업로드하며 지속적인 개발 활동을 해왔고, IT 커뮤니티와 부트캠프 활동 경력도 있어 자기주도성과 커뮤니케이션 능력을 동시에 갖춘 인재로 평가됩니다.</p>
            </div>

            <div className="chat-input">
              <input type="text" placeholder="메시지를 입력하세요..." />
              <button>전송</button>
            </div>
          </ChatbotPopup>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
}



const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6); /* ✅ 흐림 효과 유지 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
`;

const ModalContainer = styled.div`
  width: 40vw;
  height: 80vh;
  background: #212121;
  padding: 2rem;
  border-radius: 1rem;
  overflow-y: auto;
  color: white;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .close-icon {
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

const AlgorithmExplanation = styled.div`
  margin: 1rem 0 1.5rem 0;
  padding: 0.6rem 1rem;
  background-color: #2b2b2b;
  border-left: 4px solid #e57373;  /* 연한 빨간색 좌측 */
  border-radius: 0.5rem;
  color: #ccc; /* 밝은 회색 텍스트 */
  font-size: 0.85rem;
  line-height: 1.4;
`;



const JobList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const JobCard = styled.div`
  background: #333;
  padding: 1rem;
  border-radius: 0.8rem;

  .job-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .text-block {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;

      strong {
        font-size: 1.1rem;
        color: #ffc107;
      }

      p {
        font-size: 0.95rem;
        color: #ccc;
      }
    }

    .right-section {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.4rem;

      .action-item {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.85rem;
        font-weight: bold;
        cursor: pointer;
        color: #f0f0f0;
      }

      .reason:hover {
        color: #81c784;
      }

      .check {
        text-decoration: none; /* ✅ 밑줄 제거 */
      }

      .check:hover {
        color: #64b5f6;
        text-decoration: none; /* ✅ 호버 시에도 유지 */
      }

    }
  }
`;

const LikeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: bold;
  cursor: pointer;
  color: ${(props) => (props.liked ? "#ff4d4d" : "#f0f0f0")};

  &:hover {
    color: #ff4d4d;
  }
`;

const ChatbotPopup = styled.div`
  position: fixed;
  top: 25%;
  right: 10%;
  width: 260px;
  height: 360px;
  background-color: #1e1e1e;
  color: white;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
  z-index: 500;

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #333;
    padding: 0.6rem 1rem;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    font-weight: bold;

    button {
      background: none;
      color: white;
      font-size: 1.2rem;
      border: none;
      cursor: pointer;
    }
  }

  .chat-body {
    flex: 1;
    padding: 1rem;
    font-size: 0.9rem;
    overflow-y: auto;

    p {
      margin-bottom: 1rem;
      line-height: 1.6;
    }
  }

  .chat-input {
    display: flex;
    border-top: 1px solid #444;
    padding: 0.5rem;

    input {
      flex: 1;
      padding: 0.5rem;
      border: none;
      border-radius: 0.4rem;
      margin-right: 0.5rem;
      background: #2a2a2a;
      color: white;
    }

    button {
      padding: 0.5rem 0.8rem;
      background-color: #ffd54f;
      border: none;
      border-radius: 0.4rem;
      color: black;
      font-weight: bold;
      cursor: pointer;
    }
  }
`;
