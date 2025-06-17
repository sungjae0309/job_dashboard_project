import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import { cardStyles } from "./ReusableStyles";

export default function Searchjob() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("전체");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPopupOpen, setFilterPopupOpen] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const tabs = ["전체", "마감 임박", "최신 공고", "유행 공고"];

  const jobs = [
    { title: "프론트엔드 개발자", company: "우아한형제들", location: "서울", due: "2024-06-30", jobType: "프론트엔드" },
    { title: "백엔드 개발자", company: "네이버", location: "판교", due: "2024-06-20", jobType: "백엔드" },
    { title: "데이터 분석가", company: "카카오", location: "성남", due: "2024-06-15", jobType: "데이터" },
    { title: "UX 디자이너", company: "라인", location: "서울", due: "2024-07-05", jobType: "디자인" },
  ];

  const filteredJobs = jobs
    .filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesJobType = selectedJobType ? job.jobType === selectedJobType : true;
      const matchesLocation = selectedLocation ? job.location === selectedLocation : true;
      return matchesSearch && matchesJobType && matchesLocation;
    })
    .sort((a, b) => {
      if (activeTab === "마감 임박") {
        return new Date(a.due) - new Date(b.due);
      }
      if (activeTab === "최신 공고") {
        return new Date(b.due) - new Date(a.due);
      }
      return 0;
    });

  const handleCheckboxChange = (job) => {
    const isSelected = selectedForCompare.some((j) => j.title === job.title);
    if (isSelected) {
      setSelectedForCompare((prev) => prev.filter((j) => j.title !== job.title));
    } else {
      setSelectedForCompare((prev) => [...prev, job]);
    }
  };

  return (
    <Container sidebarOpen={sidebarOpen}>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="content">
        <h3>공고 보기</h3>

        <SearchRow>
          <SearchBox>
            <input
              type="text"
              placeholder="회사명, 포지션명, 지역 등으로 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBox>
          <FilterButton onClick={() => setFilterPopupOpen(true)}>필터링</FilterButton>
          <CompareButton onClick={() => setCompareMode(!compareMode)}>비교하기</CompareButton>
        </SearchRow>

        <CommunityTabs>
          {tabs.map((tab) => (
            <CommunityTab
              key={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </CommunityTab>
          ))}
        </CommunityTabs>

        <div className="job-list">
          {filteredJobs.map((job, index) => (
            <div className="job-card" key={index}>
              <div className="job-header">
                <div className="title-row">
                  {compareMode && (
                    <input
                      type="checkbox"
                      className="custom-checkbox"
                      checked={selectedForCompare.some((j) => j.title === job.title)}
                      onChange={() => handleCheckboxChange(job)}
                    />
                  )}
                  <h4>{job.title}</h4>
                </div>
                <span className="due">~ {job.due}</span>
              </div>
              <p className="company">{job.company}</p>
              <p className="location">{job.location}</p>
              <a href="#">상세보기</a>
            </div>
          ))}
        </div>

        {selectedForCompare.length > 0 && (
          <div className="comparison-box">
            <h4>공고 비교</h4>
            <div className="comparison-grid">
              {selectedForCompare.map((job, idx) => (
                <div key={idx} className="compare-item">
                  <h5>{job.title}</h5>
                  <p>{job.company}</p>
                  <p>{job.location}</p>
                  <p>마감일: {job.due}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {filterPopupOpen && (
          <>
            <Overlay onClick={() => setFilterPopupOpen(false)} />
            <FilterPopup>
              <div className="popup-content">
                <h4>필터링</h4>
                <label>직무</label>
                <select value={selectedJobType} onChange={(e) => setSelectedJobType(e.target.value)}>
                  <option value="">전체</option>
                  <option value="프론트엔드">프론트엔드</option>
                  <option value="백엔드">백엔드</option>
                  <option value="데이터">데이터</option>
                  <option value="디자인">디자인</option>
                </select>

                <label>지역</label>
                <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                  <option value="">전체</option>
                  <option value="서울">서울</option>
                  <option value="판교">판교</option>
                  <option value="성남">성남</option>
                </select>

                <div className="button-group">
                  <button className="reset" onClick={() => { setSelectedJobType(""); setSelectedLocation(""); }}>초기화</button>
                  <button className="close" onClick={() => setFilterPopupOpen(false)}>닫기</button>
                </div>
              </div>
            </FilterPopup>
          </>
        )}

        <style jsx>{`
          .custom-checkbox {
            margin-right: 0.5rem;
            width: 1.3rem;
            height: 1.3rem;
            background-color: white;
            border: 2px solid #ccc;
            border-radius: 4px;
            appearance: none;
            position: relative;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
          }

          .custom-checkbox:hover {
            transform: scale(1.15);
          }

          .custom-checkbox:checked::before {
            content: "✔";
            color: #4caf50;
            position: absolute;
            top: -0.1rem;
            left: 0.25rem;
            font-size: 1.1rem;
          }

          .comparison-box {
            background-color: #2b2b2b;
            padding: 1rem;
            border-radius: 0.8rem;
            border: 1px solid #444;
            margin-top: 1.5rem;
            color: white;
          }

          .comparison-grid {
            display: flex;
            gap: 1.5rem;
            margin-top: 1rem;
          }

          .compare-item {
            background-color: #1e1e1e;
            padding: 1rem;
            border-radius: 0.5rem;
            flex: 1;
            border: 1px solid #555;
          }
        `}</style>
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
    background: #1c1c1c;
    color: white;
    min-height: 100vh;
    transition: margin-left 0.3s ease-in-out;
    h3 {
      color: #ffc107;
      margin-bottom: 1rem;
    }
    .job-list {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      overflow-y: auto;
      padding-right: 0.5rem;
      .job-card {
        background-color: #2b2b2b;
        padding: 1rem;
        border-radius: 0.8rem;
        .job-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .title-row {
            display: flex;
            align-items: center;
          }
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
    .comparison-box {
      margin-top: 1.5rem;
      background: #2b2b2b;
      padding: 1rem;
      border-radius: 0.8rem;
      border: 1px solid #444;
    }
    .comparison-grid {
      display: flex;
      gap: 1.5rem;
      margin-top: 1rem;
    }
    .compare-item {
      background: #1e1e1e;
      padding: 1rem;
      border-radius: 0.5rem;
      flex: 1;
      border: 1px solid #555;
      color: white;
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
  background-color: ${({ className }) => (className === 'active' ? '#ffc107' : '#555')};
  color: ${({ className }) => (className === 'active' ? 'black' : 'white')};
  font-weight: bold;
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: #ffc107;
    color: black;
  }
`;

const CompareButton = styled.button`
  background-color: ${({ className }) => (className === 'active' ? '#ffc107' : '#555')};
  color: ${({ className }) => (className === 'active' ? 'black' : 'white')};
  font-weight: bold;
  border: none;
  padding: 0.7rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: #ffc107;
    color: black;
  }
`;


const CommunityTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const CommunityTab = styled.button`
  flex: 1;
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  color: ${({ active }) => (active ? "black" : "#ccc")};
  font-weight: bold;
  border-radius: 2rem;
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#ffc107" : "#2b2b2b")};
  transition: background-color 0.3s ease;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
`;

const FilterPopup = styled.div`
  position: fixed;
  top: 20%;
  left: 60%;
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
