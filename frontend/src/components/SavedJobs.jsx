import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaHeart, FaLink } from "react-icons/fa";

import Sidebar from "./Sidebar";
import axios from "axios";



export default function SavedJobs() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [likedJobs, setLikedJobs] = useState([]);  // 서버에서 받아온 찜 리스트

  // 서버에서 찜한 공고 불러오기 (최초 1회)
  useEffect(() => {
    axios
      .get("http://192.168.101.36:8000/api/liked-jobs/") // ← FastAPI 엔드포인트 맞춰서 변경
      .then((res) => setLikedJobs(res.data))
      .catch(() => setLikedJobs([]));
  }, []);

  // 서버에 찜 취소 요청 (예시)
  const handleUnlike = (jobId) => {
    axios
      .delete(`http://192.168.101.36:8000/api/liked-jobs/${jobId}/`)
      .then(() => setLikedJobs((prev) => prev.filter((job) => job.id !== jobId)));
  };

  return (
    <Container sidebarOpen={sidebarOpen}>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="content">
        <div className="top-bar">
          <h2>찜한 공고 전체보기</h2>
        </div>

        {likedJobs.length === 0 ? (
          <Empty>아직 찜한 공고가 없습니다.</Empty>
        ) : (
          <JobList>
            {likedJobs.map((job) => (
              <JobCard key={job.id}>
                <div className="text-block">
                  <strong>{job.company_name}</strong>
                  <p>{job.job_title} / {job.experience_level}</p>
                  <p>{job.location} | {job.employment_type}</p>
                </div>
                <div className="right-section">
                  <button className="like-btn" onClick={() => handleUnlike(job.id)}>
                    <FaHeart />
                    <span>찜 취소</span>
                  </button>
                  {job.link && (
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-link"
                    >
                      <FaLink />
                      <span>공고 확인</span>
                    </a>
                  )}
                </div>
              </JobCard>
            ))}
          </JobList>
        )}
      </div>
    </Container>
  );
}


const Container = styled.div`
  display: flex;

  .content {
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? "18vw" : "4.5rem")};
    padding: 2rem;
    flex-grow: 1;
    transition: margin-left 0.3s ease-in-out;
    color: white;
  }

  .top-bar {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;

    .hamburger {
      font-size: 1.8rem;
      cursor: pointer;
      color: #ffc107;
    }

    h2 {
      font-size: 1.8rem;
      color:rgb(248, 247, 244);
    }
  }
`;

const Empty = styled.p`
  font-size: 1.1rem;
  color: #aaa;
`;

const JobList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const JobCard = styled.div`
  background: #2a2a2a;
  padding: 1rem 1.5rem;
  border-radius: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

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
    gap: 0.8rem;

    .like-btn, .view-link {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      background: none;
      border: none;
      color: #f0f0f0;
      font-size: 0.85rem;
      font-weight: bold;
      cursor: pointer;
      text-decoration: none;
    }

    .like-btn:hover {
      color: #ff4d4d;
    }

    .view-link:hover {
      color: #64b5f6;
    }
  }
`;
