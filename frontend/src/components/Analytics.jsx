import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { cardStyles } from "./ReusableStyles";
import AIJobModal from "./AIJobModal";
import { FaMapMarkerAlt, FaCoins, FaHeart, FaRegHeart, FaThumbsUp, FaLink } from "react-icons/fa";
import { PiTargetDuotone } from "react-icons/pi";
import { useLikedJobs } from "../contexts/LikedJobsContext";

export default function Analytics() {
  const [showModal, setShowModal] = useState(false);
  const [jobPosts, setJobPosts] = useState([]);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [showChatbot, setShowChatbot] = useState(false);

  const { likedJobs, toggleLike } = useLikedJobs();

  const fetchJobPosts = () => {
    axios
      .get("http://localhost:8000/api/jobs/")
      .then((response) => {
        setJobPosts(response.data);
        setCurrentJobIndex(0);
      })
      .catch((error) => {
        console.error("Error fetching job posts:", error);
      });
  };

  const handleNextJob = () => {
    setCurrentJobIndex((prev) => (prev + 1) % jobPosts.length);
  };

  useEffect(() => {
    fetchJobPosts();
  }, []);

  return (
    <Section>
      {showModal && <AIJobModal jobPosts={jobPosts} onClose={() => setShowModal(false)} />}

      <div className="ai-box open full-width">
        <div className="ai-header">
          <h5>AI 추천 공고</h5>
        </div>

        {jobPosts.length > 0 && (
          <div className="job-card">
            <div className="top-info">
              <div className="company-name">
                <h3>{jobPosts[currentJobIndex].company_name}</h3>
              </div>
            </div>

            <div className="position-info">
              <p className="title">
                {jobPosts[currentJobIndex].job_title} / {jobPosts[currentJobIndex].experience_level}
              </p>
              <p className="location-type">
                {jobPosts[currentJobIndex].location} | {jobPosts[currentJobIndex].employment_type}
              </p>
              <span className="deadline highlight">⏱ 마감 D-3</span>
            </div>

            <p className="slogan">“문 앞으로 일상의 행복을 배달합니다”</p>

            <div className="extras-wrapper visible">
              <div className="extras">
                <div className="extra-box">
                  <PiTargetDuotone className="icon" />
                  <span>적합도:</span>
                  <strong className="highlight">87%</strong>
                  <span className="sub-info">(상위 12%)</span>
                </div>
                <div className="extra-box">
                  <FaCoins className="icon" />
                  <span>연봉:</span>
                  <span className="value">4,100만 원 (예상)</span>
                </div>
                <div className="extra-box">
                  <FaMapMarkerAlt className="icon" />
                  <span>거리:</span>
                  <span className="value">3.1km</span>
                </div>
              </div>
            </div>

            <div className="interaction-row">
              <div
                className={`like-button ${likedJobs.some((j) => j.id === jobPosts[currentJobIndex].id) ? "liked" : ""}`}
                onClick={() => toggleLike(jobPosts[currentJobIndex])}
              >
                {likedJobs.some((j) => j.id === jobPosts[currentJobIndex].id) ? <FaHeart /> : <FaRegHeart />}
                <span>찜하기</span>
              </div>
              <div className="reason-button" onClick={() => setShowChatbot(true)}>
                <FaThumbsUp />
                <span>추천 이유</span>
              </div>
              <a
                href={jobPosts[currentJobIndex].link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="link-button"
              >
                <FaLink />
                <span>링크 연결</span>
              </a>
            </div>
          </div>
        )}

        <div className="button-row">
          <button className="mentor-toggle-btn" onClick={handleNextJob}>
            다른 추천
          </button>
          <button className="more-btn" onClick={() => setShowModal(true)}>
            전체 보기
          </button>
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0rem 0.1rem;
  flex-direction: column;
  gap: 1rem;

  .ai-box.open.full-width {
    ${cardStyles};
    width: 100%;
    max-width: 750px;
    max-height: 435px;
    background-color: #1e1e1e;
    color: white;
    padding: 1.5rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 0 12px rgba(255, 193, 7, 0.15);

    .ai-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-bottom: 0.4rem;

      h5 {
        font-size: 1.3rem;
        font-weight: 700;
        color: #ffc107;
      }
    }

    .job-card {
      background-color:rgb(165, 159, 163);
      border: 1px solid #2c2c2c;
      border-radius: 1rem;
      padding: 1rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.9rem;

      .company-name {
        font-size: 1.1rem;
        font-weight: 700;
        color: #000;
        text-align: center;
      }

      .position-info {
        text-align: center;
        line-height: 1.3;

        .title {
          font-size: 0.95rem;
          font-weight: 500;
          color: #000;
        }

        .location-type {
          font-size: 0.8rem;
          color: #444;
        }

        .deadline {
          display: inline-block;
          color: #ff5e5e;
          font-weight: bold;
          font-size: 1.1rem;
          margin-top: 0.3rem;
        }
      }

      .slogan {
        font-size: 0.8rem;
        color: #555;
        font-style: italic;
        text-align: center;
      }

      .extras {
        display: flex;
        justify-content: space-between;
        gap: 0.6rem;

        .extra-box {
          flex: 1;
          background-color: #2b2b2b;
          padding: 0.5rem;
          border-radius: 0.6rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 0.8rem;
          gap: 0.2rem;

          .icon {
            font-size: 1.2rem;
            color: #ffc107;
          }

          .highlight {
            color: #fff;
            font-weight: bold;
          }

          .value {
            color: #eee;
            font-weight: 500;
          }

          .sub-info {
            font-size: 0.7rem;
            color: #999;
          }
        }
      }

      .interaction-row {
        display: flex;
        justify-content: space-around;
        margin-top: 1rem;

        .like-button,
        .reason-button,
        .link-button {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: #000;
          cursor: pointer;
          text-decoration: none;
        }

        .like-button.liked {
          color: #ff4d4d;
        }

        .like-button:hover {
          color: #ff4d4d;
        }

        .reason-button:hover {
          color: #81c784;
        }

        .link-button:hover {
          color: #64b5f6;
        }
      }
    }

    .button-row {
      display: flex;
      gap: 0.8rem;
      margin-top: 0.8rem;

      button {
        flex: 1;
        padding: 0.5rem 1rem;
        font-size: 0.85rem;
        font-weight: bold;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: background-color 0.3s ease, color 0.3s ease;
      }

      .mentor-toggle-btn,
      .more-btn {
        background-color: #444;
        color: #fff;

        &:hover {
          background-color: #ffc107;
          color: #000;
        }
      }
    }
  }
`;