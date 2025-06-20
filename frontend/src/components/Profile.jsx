import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

import { cardStyles } from "./ReusableStyles"; // cardStyles 사용하는 
import {
  FaSyncAlt,
  FaBuilding,
  FaBriefcase,
  FaUniversity,
  FaBook,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import axios from "axios";

export default function CareerInsightsCard() {
  const [activeTab, setActiveTab] = useState("news");

  // 실제 API로부터 데이터 받아오는 state
  const [news, setNews] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [currentMentor, setCurrentMentor] = useState(null);

  // 기사 리스트 받아오기
  useEffect(() => {
    axios
      .get("http://192.168.101.36:8000/api/news/")
      .then((res) => setNews(res.data))
      .catch(() => setNews([]));
  }, []);

  // 멘토 리스트 받아오기
  useEffect(() => {
    axios
      .get("http://192.168.101.36:8000/api/mentors/")
      .then((res) => {
        setMentors(res.data);
        setCurrentMentor(res.data.length > 0 ? res.data[0] : null);
      })
      .catch(() => setMentors([]));
  }, []);

  // 멘토 랜덤 매칭 (or 백엔드에서 랜덤 1명 API도 가능)
  const [isRotating, setIsRotating] = useState(false);
  const fetchMentor = () => {
    setIsRotating(true);
    setTimeout(() => {
      if (mentors.length > 0) {
        const randomIndex = Math.floor(Math.random() * mentors.length);
        setCurrentMentor(mentors[randomIndex]);
      }
      setIsRotating(false);
    }, 500);
  };

  // 기사 확장/접기
  const [expandedNews, setExpandedNews] = useState(null);
  const toggleNews = (index) => {
    if (expandedNews === index) setExpandedNews(null);
    else setExpandedNews(index);
  };

  return (
    <section>
      <div className="tabs">
        <button className={activeTab === "news" ? "active" : ""} onClick={() => setActiveTab("news")}>
          최신 기사
        </button>
        <button className={activeTab === "tip" ? "active" : ""} onClick={() => setActiveTab("tip")}>
          멘토링 매칭
        </button>
      </div>

      <div className="content">
        {/* 최신 기사 */}
        {activeTab === "news" && (
          <div className="news-list">
            {news.map((item, index) => (
              <div
                className={`news-card ${expandedNews === index ? "expanded" : ""}`}
                key={index}
                onClick={() => toggleNews(index)}
              >
                <div className="news-title-row">
                  <div className="news-title">{item.title}</div>
                  <div className="news-toggle-icon">
                    {expandedNews === index ? <FaMinus /> : <FaPlus />}
                  </div>
                </div>
                {expandedNews === index && (
                  <div className="news-details">
                    <div className="news-source">{item.source}</div>
                    <div className="news-summary">{item.summary}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 멘토링 매칭 */}
        {activeTab === "tip" && (
          <>
            <h4 className="mentor-title">🎓 매칭 결과</h4>
            <div className="mentor-box">
              <div className="mentor-header">
                <h4>멘토 정보</h4>
                <FaSyncAlt
                  className={`refresh-icon ${isRotating ? "rotating" : ""}`}
                  onClick={fetchMentor}
                />
              </div>

              <div className="mentor-info">
                <p><FaBuilding /><strong>기업:</strong> {currentMentor?.field || "-"}</p>
                <p><FaBriefcase /> <strong>직무:</strong> {currentMentor?.job || "-"}</p>
                <p><FaUniversity /> <strong>학교:</strong> {currentMentor?.school || "-"}</p>
                <p><FaBook /> <strong>전공:</strong> {currentMentor?.major || "-"}</p>
              </div>

              <div className="mentor-actions">
                <button className="mentor-btn">멘토에게 질문하기</button>
                <button className="mentor-appoint-btn">멘토와 약속 잡기</button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}


const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

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
    padding-right: 0.5rem;
    overflow: hidden;
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
      color: #00e676;
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
  }

  .news-list {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    overflow-y: auto;
    padding-right: 0.5rem;
    max-height: 18rem;

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

  .news-card {
    background-color: #2a2a2a;
    padding: 1rem 1.2rem;
    border-radius: 0.8rem;
    border-left: 5px solid #ffc107;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #333;
    }

    .news-title {
      font-size: 1rem;
      font-weight: bold;
      color: #fff;
    }

    .news-details {
      margin-top: 0.5rem;
      transition: max-height 0.3s ease;
    }

    .news-source {
      font-size: 0.8rem;
      color: #ffc107;
      margin-bottom: 0.3rem;
    }

    .news-summary {
      font-size: 0.9rem;
      color: #ccc;
      line-height: 1.5;
    }

    .news-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .news-title {
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
  }

  .news-toggle-icon {
    font-size: 0.9rem;
    color: #ffc107;
  }
}

  }

  .mentor-title {
    font-size: 1.1rem;
    font-weight: bold;
    color: #fff;
    margin-bottom: 0.5rem;
    padding-left: 0.3rem;
  }

  .mentor-box {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #2a2a2a;
    padding: 1rem;
    border-radius: 0.6rem;
    border-left: 4px solid #ffc107;
    color: #ccc;

    .mentor-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h4 {
        margin: 0;
        font-size: 1.05rem;
        color: #fff;
      }

      .refresh-icon {
        font-size: 1.2rem;
        color: #f9f8f4;
        cursor: pointer;
        transition: transform 0.5s ease;

        &.rotating {
          animation: ${rotate360} 0.6s linear;
        }

        &:hover {
          color: #ffc107;
        }
      }
    }

    .mentor-info {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      p {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        color: #ccc;

        svg {
          color: #ccc;
        }
      }
    }

    .mentor-actions {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .mentor-btn,
      .mentor-appoint-btn {
        background-color: rgb(97, 97, 95);
        color: white;
        font-weight: bold;
        border-radius: 0.5rem;
        padding: 0.6rem;
        cursor: pointer;
        font-size: 0.9rem;

        &:hover {
          background-color: #ffc107;
          color: black;
        }
      }
    }
  }
`;
