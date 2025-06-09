import React, { useState } from "react";
import styled from "styled-components";
import { cardStyles } from "./ReusableStyles";

export default function JobSearchDashboard() {
  const [activeTab, setActiveTab] = useState("deadline"); // 기본은 마감임박
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPopupOpen, setFilterPopupOpen] = useState(false);
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const jobs = [
    {
      title: "프론트엔드 개발자",
      company: "우아한형제들",
      location: "서울",
      due: "2024-06-30",
      jobType: "프론트엔드",
    },
    {
      title: "백엔드 개발자",
      company: "네이버",
      location: "판교",
      due: "2024-06-20",
      jobType: "백엔드",
    },
    {
      title: "데이터 분석가",
      company: "카카오",
      location: "성남",
      due: "2024-06-15",
      jobType: "데이터",
    },
    {
      title: "UX 디자이너",
      company: "라인",
      location: "서울",
      due: "2024-07-05",
      jobType: "디자인",
    },
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesJobType = selectedJobType
      ? job.jobType === selectedJobType
      : true;
    const matchesLocation = selectedLocation
      ? job.location === selectedLocation
      : true;

    return matchesSearch && matchesJobType && matchesLocation;
  });

  return (
    <Section>
      <div className="header">
        <h3>취업 공고 대시보드</h3>
        <TabSwitch>
          <button
            className={activeTab === "deadline" ? "active" : ""}
            onClick={() => setActiveTab("deadline")}
          >
            마감 임박
          </button>
          <button
            className={activeTab === "search" ? "active" : ""}
            onClick={() => setActiveTab("search")}
          >
            공고 검색
          </button>
        </TabSwitch>
      </div>

      {activeTab === "search" && (
        <>
          <SearchRow>
            <SearchBox>
              <input
                type="text"
                placeholder="회사명, 포지션명, 지역 등으로 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBox>
            <FilterButton onClick={() => setFilterPopupOpen(true)}>
              필터링
            </FilterButton>
          </SearchRow>

          <div className="job-list">
            {filteredJobs.map((job, index) => (
              <div className="job-card" key={index}>
                <div className="job-header">
                  <h4>{job.title}</h4>
                  <span className="due">~ {job.due}</span>
                </div>
                <p className="company">{job.company}</p>
                <p className="location">{job.location}</p>
                <a href="#">상세보기</a>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "deadline" && (
        <div className="job-list">
          {jobs
            .sort((a, b) => new Date(a.due) - new Date(b.due))
            .map((job, index) => (
              <div className="job-card" key={index}>
                <div className="job-header">
                  <h4>{job.title}</h4>
                  <span className="due">~ {job.due}</span>
                </div>
                <p className="company">{job.company}</p>
                <p className="location">{job.location}</p>
                <a href="#">상세보기</a>
              </div>
            ))}
        </div>
      )}

      {filterPopupOpen && (
        <>
          <Overlay onClick={() => setFilterPopupOpen(false)} />
          <FilterPopup>
            <div className="popup-content">
              <h4>필터링</h4>

              <label>직무</label>
              <select
                value={selectedJobType}
                onChange={(e) => setSelectedJobType(e.target.value)}
              >
                <option value="">전체</option>
                <option value="프론트엔드">프론트엔드</option>
                <option value="백엔드">백엔드</option>
                <option value="데이터">데이터</option>
                <option value="디자인">디자인</option>
              </select>

              <label>지역</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">전체</option>
                <option value="서울">서울</option>
                <option value="판교">판교</option>
                <option value="성남">성남</option>
              </select>

              <div className="button-group">
                <button
                  className="reset"
                  onClick={() => {
                    setSelectedJobType("");
                    setSelectedLocation("");
                  }}
                >
                  초기화
                </button>
                <button
                  className="close"
                  onClick={() => setFilterPopupOpen(false)}
                >
                  닫기
                </button>
              </div>
            </div>
          </FilterPopup>
        </>
      )}
    </Section>
  );
}

// Styled Components

const Section = styled.section`
  ${cardStyles};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.2rem;
  height: 25rem;
  position: relative;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      color: #ffc107;
      font-size: 1.1rem;
    }
  }

  .job-list {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    overflow-y: auto;
    padding-right: 0.5rem;

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

    .job-card {
      background-color: #2b2b2b;
      padding: 1rem;
      border-radius: 0.8rem;

      .job-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h4 {
          color: white;
          font-size: 1.1rem;
        }

        .due {
          color: #ffc107;
          font-size: 0.9rem;
        }
      }

      .company {
        color: #cccccc;
        font-size: 0.9rem;
        margin: 0.2rem 0;
      }

      .location {
        color: #999999;
        font-size: 0.85rem;
      }

      a {
        color: #47a3ff;
        font-size: 0.85rem;
        margin-top: 0.4rem;
        display: inline-block;
      }
    }
  }
`;

const TabSwitch = styled.div`
  display: flex;
  background: #2b2b2b;
  border-radius: 2rem;
  padding: 0.2rem;
  gap: 0.2rem;

  button {
    flex: 1;
    padding: 0.5rem 1rem;
    border: none;
    background: none;
    color: #ccc;
    font-weight: bold;
    border-radius: 2rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &.active {
      background-color: #ffc107;
      color: black;
    }
  }
`;

const SearchRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  align-items: center;
`;

const SearchBox = styled.div`
  flex: 1;

  input {
    width: 100%;
    padding: 0.7rem;
    border-radius: 0.5rem;
    border: 2px solid #555;
    background-color: #1e1e1e;
    color: white;
    font-size: 0.95rem;
    outline: none;
  }
`;

const FilterButton = styled.button`
  background-color: #ffc107;
  color: black;
  font-weight: bold;
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  cursor: pointer;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* 흐림 효과 */
  z-index: 9;
`;

const FilterPopup = styled.div`
  position: fixed;
  top: 20%;
  left: 60%; /* 오른쪽으로 약간 치우침 */
  transform: translateX(-50%);
  background: #333;
  padding: 1rem 1.2rem;
  border-radius: 0.8rem;
  z-index: 10;
  width: 80%;
  max-width: 400px;
  border: 1px solid #555;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);

  .popup-content {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    h4 {
      color: #ffc107;
      margin-bottom: 0.5rem;
    }

    label {
      color: white;
      font-size: 0.9rem;
    }

    select {
      padding: 0.5rem;
      border-radius: 0.4rem;
      border: none;
      font-size: 0.9rem;
      background-color: #1e1e1e;
      color: white;
    }

    .button-group {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      margin-top: 1rem;

      button {
        padding: 0.5rem 1rem;
        border-radius: 0.4rem;
        border: none;
        font-size: 0.9rem;
        cursor: pointer;
      }

      .reset {
        background-color: #555;
        color: white;
      }

      .close {
        background-color: #ffc107;
        color: black;
      }
    }
  }
`;
