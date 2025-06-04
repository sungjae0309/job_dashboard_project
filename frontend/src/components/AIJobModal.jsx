import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  FaHeart,
  FaRegHeart,
  FaThumbsUp,
  FaLink,
  FaCheckCircle
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useLikedJobs } from "../contexts/LikedJobsContext";

export default function AIJobModal({ jobPosts, onClose }) {
  const { likedJobs, toggleLike } = useLikedJobs();
  const [expandedReasons, setExpandedReasons] = useState([]);
  const [showTooltipIndex, setShowTooltipIndex] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleReason = (index) => {
    setExpandedReasons((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <Header>
          <h2>AI 추천 공고 전체보기</h2>
          <IoMdClose className="close-icon" onClick={onClose} />
        </Header>

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

                  <div className="action-item match">
                    <FaCheckCircle />
                    <span>합격 스펙</span>
                  </div>

                  <div
                    className={`action-item reason ${expandedReasons.includes(index) ? "active" : ""}`}
                    onClick={() => toggleReason(index)}
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

              {expandedReasons.includes(index) && (
                <ReasonText>
                  <div className="content">
                    <span>
                      이 기업은 당신의 관심 직무, 기술 스택, 평균 학점, 나이와 잘 맞는 공고로 추천되었습니다.
                    </span>
                    <div
                      style={{ position: "relative" }}
                      onMouseEnter={() => setShowTooltipIndex(index)}
                      onMouseLeave={() => setShowTooltipIndex(null)}
                    >
                      <ChatbotButton onClick={() => setShowChatbot(true)}>
                        챗봇 연결
                      </ChatbotButton>
                      {showTooltipIndex === index && (
                        <Tooltip>이 버튼을 누르면 챗봇이 더 자세하게 설명해줘요!</Tooltip>
                      )}
                    </div>
                  </div>
                </ReasonText>
              )}
            </JobCard>
          ))}
        </JobList>

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
  background: rgba(0, 0, 0, 0.6);
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

const JobList = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const JobCard = styled.div`
  background: #333;
  padding: 1rem;
  border-radius: 0.8rem;
  box-shadow: 0 0 5px rgba(43, 83, 164, 0.05);

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
        text-decoration: none; /* ✅ 밑줄 제거 */
      }

      .reason:hover,
      .reason.active {
        color: #81c784;
      }

      .match:hover {
        color:rgb(221, 130, 241);
      }

      .check:hover {
        color: #64b5f6;
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

const ReasonText = styled.div`
  margin-top: 1rem;
  padding: 0.8rem 1rem;
  background-color: #2a2a2a;
  color: #ccc;
  border-radius: 0.5rem;
  font-size: 0.85rem;
  border-left: 4px solid #81c784;

  .content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    width: 100%;
    flex-wrap: wrap;
  }

  span {
    flex: 1;
    white-space: normal;
    word-break: keep-all;
  }
`;

const ChatbotButton = styled.button`
  background-color: #424242;
  color:rgb(229, 236, 229);
  border: none;
  border-radius: 0.4rem;
  padding: 0.8rem 0.7rem;
  font-size: 0.75rem;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #616161;
    color: #ffd54f;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  top: -2.2rem;
  right: 0;
  background: #444;
  color: #ffd54f;
  padding: 0.5rem 0.8rem;
  font-size: 0.75rem;
  border-radius: 0.4rem;
  white-space: nowrap;
  z-index: 10;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
`;

const ChatbotPopup = styled.div`
  position: fixed;
  top: 25%;
  right: 10%; /* ✅ 간격 줄임 */
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
