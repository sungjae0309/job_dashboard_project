import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { cardStyles } from "./ReusableStyles"; // cardStyles 사용하는 파일만

// import styled from "styled-components";
// import { cardStyles } from "./ReusableStyles";

export default function CertAndTechDashboard() {
  const [activeTab, setActiveTab] = useState("certs");
  const [certs, setCerts] = useState([]);
  const [stacks, setStacks] = useState([]);

  // FastAPI에서 자격증/스택 목록 받아오기
  useEffect(() => {
    // 자격증 리스트 불러오기
    axios
      .get("http://192.168.101.36:8000/api/certificates")
      .then((res) => setCerts(res.data))
      .catch(() => setCerts([])); // 에러시 빈 배열

    // 기술스택 리스트 불러오기
    axios
      .get("http://192.168.101.36:8000/api/techstacks")
      .then((res) => setStacks(res.data))
      .catch(() => setStacks([]));
  }, []);

  return (
    <div>
      <div>
        <button
          className={activeTab === "certs" ? "active" : ""}
          onClick={() => setActiveTab("certs")}
        >
          필수 자격증
        </button>
        <button
          className={activeTab === "stacks" ? "active" : ""}
          onClick={() => setActiveTab("stacks")}
        >
          최소 기술 스택
        </button>
      </div>

      {activeTab === "certs" && (
        <div className="content cert-list">
          {(certs.length > 0 ? certs : Array.from({ length: 5 })).map((c, index) => (
            <div className="cert" key={index}>
              <div className="left">
                <h4>{c?.name || ""}</h4>
                <p>{c?.job || ""}</p>
                <span>{c?.detail || ""}</span>
              </div>
              <div className="right">
                <p className="due">{c?.due || ""}</p>
                <a
                  href={c?.link ? (c.link.startsWith("http") ? c.link : `https://${c.link}`) : "#"}
                  target="_blank"
                  rel="noreferrer"
                  style={{ pointerEvents: c?.link ? "auto" : "none", color: c?.link ? "#0af" : "#aaa" }}
                >
                  {c?.link || ""}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "stacks" && (
        <div className="content stack-list">
          {(stacks.length > 0 ? stacks : Array.from({ length: 5 })).map((stack, index) => (
            <div className="stack-card" key={index}>
              <div className="stack-header">
                <h3>{stack?.name || ""}</h3>
              </div>
              <p className="domain">{stack?.domain || ""}</p>
              <p className="desc">{stack?.desc || ""}</p>
              {stack?.link ? (
                <a
                  className="link"
                  href={stack.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {(() => {
                    try {
                      return new URL(stack.link).hostname;
                    } catch {
                      return stack.link;
                    }
                  })()}
                </a>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const Section = styled.section`
  ${cardStyles};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  height: 25rem;

  .content {
    flex: 1;
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
  }

  .cert-list .cert {
    display: flex;
    justify-content: space-between;
    background-color: #2b2b2b;
    padding: 1rem;
    border-radius: 0.8rem;
    margin-bottom: 0.8rem;
    transition: 0.3s ease-in-out;

    &:hover {
      background-color: #3a3a3a;
    }

    .left {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;

      h4 {
        font-size: 1.1rem;
        font-weight: bold;
        color: white;
      }

      p {
        font-size: 0.9rem;
        color: #cccccc;
      }

      span {
        font-size: 0.8rem;
        color: #999999;
      }
    }

    .right {
      text-align: right;

      .due {
        color: #ffc107;
        font-size: 0.85rem;
        margin-bottom: 0.2rem;
      }

      a {
        color: #87cefa;
        font-size: 0.8rem;
      }
    }
  }

  .stack-list .stack-card {
    background-color: #3a3a3a;
    padding: 1rem 1.2rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-bottom: 1rem;

    .stack-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        font-size: 1.1rem;
        font-weight: bold;
        color: white;
      }
    }

    .domain {
      font-weight: bold;
      color: white;
    }

    .desc {
      font-size: 0.9rem;
      color: #ccc;
    }

    .link {
      font-size: 0.85rem;
      color: #4da3f3;
      text-decoration: underline;
    }
  }
`;

const Tabs = styled.div`
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
`;
    