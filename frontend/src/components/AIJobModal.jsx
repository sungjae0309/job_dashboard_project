import React, { useState } from "react";
import styled from "styled-components";
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
                    {likedJobs.includes(index) ? <FaHeart /> : <FaRegHeart />}
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
                    <span>공고 확인</span>
                  </a>
                </div>
              </div>

              {expandedReasons.includes(index) && (
                <ReasonText>
                  이 기업은 당신의 관심 직무, 기술 스택, 평균 학점, 나이와 잘 맞는 공고로 추천되었습니다.
                </ReasonText>
              )}
            </JobCard>
          ))}
        </JobList>
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
      text-align: left;

      strong {
        font-size: 1.1rem;
        color: #ffc107;
      }

      p {
        margin: 0.2rem 0;
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
        transition: color 0.3s;
        text-decoration: none;
      }

      .reason:hover {
        color: #81c784;
      }

      .reason.active {
        color: #81c784;
      }

      .match:hover {
        color: #ffd54f;
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
  transition: color 0.3s;

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
  line-height: 1.5;
  border-left: 4px solid #81c784;
`;
