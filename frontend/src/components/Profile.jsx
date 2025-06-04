import React, { useState } from "react";
import styled from "styled-components";
import { cardStyles } from "./ReusableStyles";
import { FaUserCircle, FaCertificate, FaLightbulb, FaSearch, FaCommentDots } from "react-icons/fa";

export default function CareerInsightsCard() {
  const [activeTab, setActiveTab] = useState("experience");
  const [experiences, setExperiences] = useState([
    { user: "익명 1", content: "SQLD는 기출 위주로 풀었어요!", comments: ["저도 그렇게 공부했어요!"], showComments: false },
    { user: "익명 2", content: "FastAPI로 백엔드 만들면서 실력 쌓았어요.", comments: [], showComments: false },
  ]);
  const [newContent, setNewContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const news = [
    {
      title: "SQLD 자격 기준 변경",
      source: "kdata.or.kr",
      summary: "2024년부터 SQLD 시험은 일부 과목이 개편되어 출제 범위가 달라졌습니다."
    },
    {
      title: "ChatGPT 자격증 출시",
      source: "openai.com",
      summary: "AI 활용 능력을 평가하는 새로운 자격 인증이 도입되었습니다."
    },
    {
      title: "정보처리기사 CBT 전환",
      source: "q-net.or.kr",
      summary: "기존 필기시험이 컴퓨터 기반 테스트로 전면 전환됩니다."
    }
  ];

  

  const tips = [
    { tip: "이력서에는 숫자 기반 성과를 강조하세요." },
    { tip: "자기소개서 첫 문장은 임팩트 있게 시작하세요." },
    { tip: "GitHub 활동은 꾸준한 커밋 기록이 좋아요." },
  ];

  const handlePost = () => {
    if (newContent.trim() !== "") {
      setExperiences([{ user: "익명 사용자", content: newContent, comments: [], showComments: false }, ...experiences]);
      setNewContent("");
    }
  };

  const toggleComments = (index) => {
    const updated = [...experiences];
    updated[index].showComments = !updated[index].showComments;
    setExperiences(updated);
  };

  const filteredExperiences = experiences.filter((exp) =>
    exp.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Section>
      <div className="tabs">
        <button className={activeTab === "experience" ? "active" : ""} onClick={() => setActiveTab("experience")}>경험공유</button>
        <button className={activeTab === "news" ? "active" : ""} onClick={() => setActiveTab("news")}>트렌드</button>
        <button className={activeTab === "tip" ? "active" : ""} onClick={() => setActiveTab("tip")}>취업꿀팁</button>
      </div>

      <div className="content">
        {activeTab === "experience" && (
          <>
            <div className="search-area">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="키워드로 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="list">
              {filteredExperiences.map((exp, index) => (
                <div className="item" key={index}>
                  <FaUserCircle className="icon yellow" />
                  <div className="post">
                    <h5>{exp.user}</h5>
                    <p>{exp.content}</p>
                    {exp.comments.length > 0 && (
                      <button className="toggle" onClick={() => toggleComments(index)}>
                        {exp.showComments ? "댓글 숨기기" : `댓글 ${exp.comments.length}개 보기`}
                      </button>
                    )}
                    {exp.showComments && exp.comments.length > 0 && (
                      <div className="comments">
                        {exp.comments.map((c, i) => (
                          <div className="comment" key={i}>
                            <FaCommentDots className="comment-icon" />
                            <span>{c}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "news" && (
          <div className="news-list">
            {news.map((item, index) => (
              <div className="news-card" key={index}>
                <div className="news-header">
                  <h4>{item.title}</h4>
                  <span className="source">{item.source}</span>
                </div>
                <p className="summary">{item.summary}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "tip" && (
          <div className="list">
            {tips.map((t, index) => (
              <div className="item" key={index}>
                <FaLightbulb className="icon yellow" />
                <div>
                  <p>{t.tip}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {activeTab === "experience" && (
        <div className="input-area">
          <input
            type="text"
            placeholder="공유하고 싶은 경험을 입력하세요..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <button onClick={handlePost}>등록</button>
        </div>
      )}
    </Section>
  );
}

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
    overflow-y: auto;
    padding-right: 0.5rem;
  }

  .search-area {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.8rem;
    background-color: #333;
    border-radius: 0.4rem;
    padding: 0.4rem 0.6rem;

    input {
      flex: 1;
      background: none;
      border: none;
      color: #fff;
      padding: 0.4rem;
      outline: none;
      font-size: 0.9rem;
    }

    .search-icon {
      color: #ffc107;
    }
  }

  .input-area {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.8rem;

    input {
      flex: 1;
      padding: 0.5rem;
      border-radius: 0.4rem;
      border: none;
      outline: none;
      font-size: 0.9rem;
    }

    button {
      background-color: #ffc107;
      border: none;
      border-radius: 0.4rem;
      padding: 0 1rem;
      font-weight: bold;
      cursor: pointer;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .item {
    display: flex;
    gap: 0.8rem;
    align-items: flex-start;
    line-height: 1.3;

    .icon {
      font-size: 1.3rem;
      margin-top: 0.2rem;
    }

    .yellow {
      color: #ffc107;
    }

    .post {
      h5 {
        margin: 0;
        color: #fff;
        font-weight: 600;
      }

      p {
        margin: 0;
        font-size: 0.9rem;
        color: #ccc;
      }

      .toggle {
        margin-top: 0.3rem;
        background: none;
        border: none;
        color: #4da6ff;
        cursor: pointer;
        font-size: 0.8rem;
        padding: 0;
      }

      .comments {
        margin-top: 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.3rem;

        .comment {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: #aaa;

          .comment-icon {
            color: #4da6ff;
          }
        }
      }
    }
  }

  .news-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .news-card {
    background-color: #2a2a2a;
    padding: 0.9rem 1rem;
    border-radius: 0.6rem;
    border-left: 4px solid #ffc107;

    .news-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;

      h4 {
        color: #fff;
        margin: 0;
        font-size: 1rem;
      }

      .source {
        color: #aaa;
        font-size: 0.8rem;
      }
    }

    .summary {
      font-size: 0.9rem;
      color: #ccc;
      margin: 0;
    }
  }
`
