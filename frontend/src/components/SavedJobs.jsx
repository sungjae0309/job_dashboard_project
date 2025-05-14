// src/components/SavedJobs.jsx
import React from "react";
import styled from "styled-components";
import { useLikedJobs } from "../contexts/LikedJobsContext";
import { FaHeart, FaLink } from "react-icons/fa";

export default function SavedJobs() {
  const { likedJobs, toggleLike } = useLikedJobs();

  return (
    <Container>
      <h2>찜한 채용공고</h2>
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
                <button className="like-btn" onClick={() => toggleLike(job)}>
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
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;
  color: white;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #ffc107;
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
