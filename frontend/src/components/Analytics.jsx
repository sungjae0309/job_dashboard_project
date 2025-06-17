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
    align-items: center;
    gap: 0.6rem;
    box-shadow: 0 0 12px rgba(255, 193, 7, 0.15);

    .ai-header {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: -0.2rem;

      h5 {
        font-size: 1.4rem;
        font-weight: bold;
        color: #ffc107;
        margin: 0;
      }
    }

    .job-card {
      background-color:rgb(46, 45, 45);
      padding: 1rem;
      border-radius: 1rem;
      width: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      box-shadow: inset 0 0 0 1px #444;
      position: relative;

      .top-info {
        display: flex;
        justify-content: center;
        align-items: center;

        .company-name h3 {
          font-size: 1.2rem;
          font-weight: 700;
          margin: 0;
        }
      }

      .position-info {
        margin-top: 0.2rem;

        .title {
          font-size: 1rem;
          font-weight: 600;
          margin: 0.1rem 0;
        }

        .location-type {
          font-size: 0.85rem;
          color: #bbb;
          margin-bottom: 0.2rem;
        }

        .deadline {
          display: block;
          color: #ff2d2d;
          font-size: 1.2rem;
          font-weight: bold;
        }
      }

      .slogan {
        font-style: italic;
        font-size: 0.8rem;
        color: #ccc;
        margin-top: 0.5rem;
      }

      .extras-wrapper {
        .extras {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.85rem;

          .extra-box {
            background-color: #3a3a3a;
            padding: 0.4rem 0.6rem;
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 0.4rem;
            transition: background-color 0.3s ease, transform 0.3s ease;

            .icon {
              font-size: 1.1rem;
              color: #aaa;
              transition: color 0.3s ease;
            }

            .highlight {
              color: #ffffff;
              font-weight: bold;
            }

            .value {
              color: #fff;
              font-weight: 600;
            }

            .sub-info {
              font-size: 0.75rem;
              color: #ffffff;
              margin-left: 0.1rem;
            }

            &:hover {
              background-color: rgb(31, 174, 252);
              transform: scale(1.03);

              .icon {
                color: #ffffff;
              }
            }
          }
        }
      }

      .interaction-row {
        display: flex;
        justify-content: space-around;
        margin-top: 0.8rem;

        .like-button,
        .reason-button,
        .link-button {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.85rem;
          font-weight: bold;
          cursor: pointer;
          color: #ccc;
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

        .link-button {
          text-decoration: none;
        }

        .link-button:hover {
          color: #64b5f6;
        }
      }
    }

    .button-row {
      display: flex;
      gap: 0.8rem;

      button {
        padding: 0.6rem 1rem;
        font-size: 0.9rem;
        font-weight: bold;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
      }

      .mentor-toggle-btn {
        background-color: #ffc107;
        color: black;

        &:hover {
          background-color: #e0a800;
        }
      }

      .more-btn {
        background-color: #444;
        color: white;

        &:hover {
          background-color: #666;
        }
      }
    }
  }
` 
