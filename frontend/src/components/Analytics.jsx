import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { FaUniversity, FaBook, FaBriefcase, FaRobot, FaChalkboardTeacher } from "react-icons/fa";
import { BiFullscreen } from "react-icons/bi";
import { cardStyles } from "./ReusableStyles";
import AIJobModal from "./AIJobModal";

export default function Analytics() {
  const [showMentor, setShowMentor] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isRotating, setIsRotating] = useState(false); // ✅ 회전 상태 추가

  const [mentor, setMentor] = useState({ school: '', major: '', job: '' });
  const [data, setData] = useState({ average_gpa: 0, average_age: 0 });
  const [jobPosts, setJobPosts] = useState([]);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);

  const fetchMentor = () => {
    axios.get('http://localhost:8000/api/random-mentor/')
      .then(response => setMentor(response.data))
      .catch(error => console.error('Error fetching mentor:', error));
  };

  const fetchJobPosts = () => {
    axios.get("http://localhost:8000/api/jobs/")
      .then((response) => {
        setJobPosts(response.data);
        setCurrentJobIndex(0);
      })
      .catch((error) => {
        console.error("Error fetching job posts:", error);
      });
  };

  const showNextJob = () => {
    setIsRotating(true); // ✅ 회전 시작
    setCurrentJobIndex((prev) => (prev + 1) % jobPosts.length);
    setTimeout(() => setIsRotating(false), 500); // ✅ 0.5초 후 회전 해제
  };

  useEffect(() => {
    fetchMentor();
    axios.get("http://localhost:8000/api/summary/")
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Section>
      {showModal && (
        <AIJobModal jobPosts={jobPosts} onClose={() => setShowModal(false)} />
      )}

      <div className="analytic">
        <div className="logo">
          <BsFillCalendar2WeekFill />
        </div>
        <div className="content">
          <h5>평균 학점</h5>
          <h2>{data.average_gpa}점</h2>
          <h7>*내 학점: 3.2</h7>
        </div>
      </div>

      <div className="analytic">
        <div className="logo">
          <IoStatsChart />
        </div>
        <div className="content">
          <h5>평균 나이</h5>
          <h2>{data.average_age}세</h2>
        </div>
      </div>

      {!showAI ? (
        <div className="analytic ai-box">
          <div className="logo">
            <FaRobot />
          </div>
          <div className="content">
            <h5>AI 추천 공고</h5>
            <button className="ai-toggle-btn" onClick={() => { setShowAI(true); fetchJobPosts(); }}>
              확인하기
            </button>
          </div>
        </div>
      ) : (
        <div className="analytic ai-box open">
          <div className="ai-header">
            <h5>AI 추천 공고</h5>
            <div className="header-icons">
              <FiRefreshCcw
                className={`refresh-icon ${isRotating ? "rotating" : ""}`}
                onClick={showNextJob}
              />
              <BiFullscreen className="expand-icon" onClick={() => setShowModal(true)} />
            </div>
          </div>
          {jobPosts.length > 0 && (
            <div className="job-card">
              <strong>{jobPosts[currentJobIndex].company_name}</strong><br />
              {jobPosts[currentJobIndex].job_title} / {jobPosts[currentJobIndex].experience_level}<br />
              {jobPosts[currentJobIndex].location} | {jobPosts[currentJobIndex].employment_type}
            </div>
          )}
          <button className="mentor-toggle-btn" onClick={() => setShowAI(false)}>
            돌아가기
          </button>
        </div>
      )}

      {!showMentor ? (
        <div className="analytic mentor-box">
          <div className="logo">
            <FaChalkboardTeacher />
          </div>
          <div className="content">
            <h5>멘토링 매칭</h5>
            <button className="mentor-toggle-btn" onClick={() => setShowMentor(true)}>
              확인하기
            </button>
          </div>
        </div>
      ) : (
        <div className="analytic mentor-box open">
          <div className="mentor-header">
            <h5>멘토링 매칭</h5>
            <FiRefreshCcw className="refresh-icon" onClick={fetchMentor} />
          </div>
          <div className="mentor-content">
            <h3><FaUniversity /> 학교: {mentor.school}</h3>
            <h3><FaBook /> 전공: {mentor.major}</h3>
            <h3><FaBriefcase /> 직무: {mentor.job}</h3>
          </div>
          <button className="mentor-toggle-btn" onClick={() => setShowMentor(false)}>
            돌아가기
          </button>
          </div>
      )}
    </Section>
  );
}

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 0.1rem 0.05rem; 
  gap: 0.5rem;
  height: 13.1rem;
  position: relative;

  @keyframes rotateOnce {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .refresh-icon.rotating {
    animation: rotateOnce 0.5s forwards;
  }

  .analytic {
    ${cardStyles};
    display: flex;
    padding: 1rem;
    justify-content: space-evenly;
    align-items: center;
    height: 13.1rem;
    transition: 0.5s ease-in-out;

    &:hover {
      background-color: #ffc107;
      color: black;

      .job-card {
        background-color: #212121;
      }

      .logo svg {
        color: white !important;
      }
    }

    .logo {
      background-color: black;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1.4rem;

      svg {
        font-size: 2.3rem;
        color: white;
        transition: color 0.3s ease;
      }
    }

    .content {
      display: flex;  
      flex-direction: column;
      align-items: flex-start;

      h5 {
        font-size: 1rem;
        margin-bottom: 0.4rem;
      }

      h7 {
        font-size: 0.6rem;
      }

      .ai-toggle-btn, .mentor-toggle-btn {
        padding: 0.5rem 1rem;
        font-size: 1.2rem;
        font-weight: bold;
        color: #e0a800;
        background-color: #777777;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease-in-out;

        &:hover {
          color: white;
          background-color: black;
        }
      }
    }
  }

  .mentor-box.open, .ai-box.open {
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 1.5rem;

    .mentor-header, .ai-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.7rem;

      h5 {
        font-size: 1rem;
        font-weight: bold;
      }

      .refresh-icon, .expand-icon {
        font-size: 1.5rem;
        cursor: pointer;
        transition: transform 0.5s ease-in-out;
      }

      .expand-icon:hover {
        transform: scale(1.2);
      }
    }

    .mentor-content {
      margin-top: 0.2rem;
      h2 {
        margin: 0.5rem 0;
        font-size: 1.3rem;
        display: flex;
        align-items: center;
        gap: 0.7rem;
      }
    }

    .job-card {
      background-color: #212121;
      color: white;
      padding: 0.8rem 1rem;
      border-radius: 0.5rem;
      font-size: 0.9rem;
      text-align: center;

      &:hover {
        background-color: #ffc107;
      }
    }

    .mentor-toggle-btn {
      padding: 0.5rem 1.2rem;
      font-size: 1.1rem;
      font-weight: bold;
      background-color: #ffc107;
      color: black;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #e0a800;
      }
    }
  }

  @media screen and (min-width: 280px) and (max-width: 720px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));

    .analytic {
      &:nth-of-type(3),
      &:nth-of-type(4) {
        flex-direction: row-reverse;
      }
    }
  }
`;
