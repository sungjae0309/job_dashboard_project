import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import styled from "styled-components";


import { FaAngleRight } from "react-icons/fa";

const jobFields = ["프론트엔드", "백엔드", "데이터"];
const communityTabs = ["경험공유", "스터디 모집"];

// FastAPI 서버 IP
const API_BASE = "http://192.168.101.36:8000/api/community";

export default function Community() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("경험공유");
  const [selectedField, setSelectedField] = useState("프론트엔드");
  const [searchKeyword, setSearchKeyword] = useState("");

  // 경험공유 & 스터디 글, 댓글 서버에서 받아오기
  const [posts, setPosts] = useState([]);
  const [studyPosts, setStudyPosts] = useState([]);

  // 새 글, 새 댓글 입력 state
  const [newPost, setNewPost] = useState("");
  const [showComments, setShowComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [studyTitle, setStudyTitle] = useState("");
  const [studyDesc, setStudyDesc] = useState("");
  const [studyContact, setStudyContact] = useState("");

  // 서버에서 경험공유 글/댓글 가져오기
  const fetchExperiencePosts = async () => {
    const res = await axios.get(`${API_BASE}/experience/`);
    setPosts(res.data);
  };

  // 서버에서 스터디 모집글 가져오기
  const fetchStudyPosts = async () => {
    const res = await axios.get(`${API_BASE}/study/`);
    setStudyPosts(res.data);
  };

  // 최초 렌더링 시 데이터 fetch
  useEffect(() => {
    fetchExperiencePosts();
    fetchStudyPosts();
  }, []);

  // 검색 + 직무 필터링
  const filteredPosts = posts.filter(
    (post) =>
      post.job === selectedField &&
      post.content.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  // 경험 공유 새 글 등록 (POST)
  const handlePost = async () => {
    if (!newPost.trim()) return;
    await axios.post(`${API_BASE}/experience/`, {
      job: selectedField,
      author: "익명",
      content: newPost.trim(),
    });
    setNewPost("");
    fetchExperiencePosts(); // 새로고침
  };

  // 댓글 등록 (POST)
  const handleAddComment = async (postId) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;
    await axios.post(`${API_BASE}/comment/`, {
      post_id: postId,
      content: text.trim(),
    });
    setCommentInputs((inputs) => ({ ...inputs, [postId]: "" }));
    fetchExperiencePosts(); // 새로고침
  };

  // 댓글 토글
  const toggleComments = (postId) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  // 스터디 모집글 등록 (POST)
  const handleStudyPost = async () => {
    if (!studyTitle.trim() || !studyDesc.trim() || !studyContact.trim()) return;
    await axios.post(`${API_BASE}/study/`, {
      title: studyTitle,
      desc: studyDesc,
      contact: studyContact,
    });
    setStudyTitle(""); setStudyDesc(""); setStudyContact("");
    fetchStudyPosts();
  };

  return (
    <div>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="content">
        <div>
          {communityTabs.map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "경험공유" && (
          <>
            <div>
              {jobFields.map((field) => (
                <button
                  key={field}
                  className={selectedField === field ? "active" : ""}
                  onClick={() => setSelectedField(field)}
                >
                  {field}
                </button>
              ))}
            </div>

            <div>
              <input
                type="text"
                placeholder="키워드로 검색"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>

            <div>
              {filteredPosts.map((post) => (
                <div key={post.id} style={{ border: "1px solid #ccc", margin: "10px 0" }}>
                  <div>👤 {post.author}</div>
                  <div>{post.content}</div>

                  {post.comments && post.comments.length > 0 && (
                    <button onClick={() => toggleComments(post.id)}>
                      댓글 {post.comments.length}개 {showComments[post.id] ? "숨기기" : "보기"}
                    </button>
                  )}

                  {showComments[post.id] && (
                    <div>
                      {post.comments.map((cmt, idx) => (
                        <div key={idx}>
                          <FaAngleRight />
                          <span>{cmt}</span>
                        </div>
                      ))}
                      <input
                        placeholder="댓글 작성..."
                        value={commentInputs[post.id] || ""}
                        onChange={(e) =>
                          setCommentInputs((inputs) => ({
                            ...inputs,
                            [post.id]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAddComment(post.id);
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div>
              <input
                type="text"
                placeholder="공유하고 싶은 경험을 입력하세요..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handlePost()}
              />
              <button onClick={handlePost}>등록</button>
            </div>
          </>
        )}

        {activeTab === "스터디 모집" && (
          <>
            <div>
              <input
                type="text"
                placeholder="스터디명 입력"
                value={studyTitle}
                onChange={(e) => setStudyTitle(e.target.value)}
              />
              <textarea
                placeholder="스터디 소개글 입력"
                value={studyDesc}
                onChange={(e) => setStudyDesc(e.target.value)}
              />
              <input
                type="text"
                placeholder="연락 방법"
                value={studyContact}
                onChange={(e) => setStudyContact(e.target.value)}
              />
              <button onClick={handleStudyPost}>스터디 등록</button>
            </div>

            <div>
              {studyPosts.map((study) => (
                <div key={study.id} style={{ border: "1px solid #ccc", margin: "10px 0" }}>
                  <div>📚 {study.title}</div>
                  <div>{study.desc}</div>
                  <div>📞 {study.contact}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
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
  }
`;

const CommunityTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const CommunityTab = styled.button`
  background: none;
  border: none;
  color: ${({ active }) => (active ? "#ffc107" : "#ccc")};
  border-bottom: ${({ active }) => (active ? "2px solid #ffc107" : "none")};
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  padding-bottom: 0.3rem;
`;

const JobTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const JobTab = styled.button`
  background: none;
  border: none;
  color: ${({ active }) => (active ? "#ffc107" : "#ccc")};
  border-bottom: ${({ active }) => (active ? "2px solid #ffc107" : "none")};
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  padding-bottom: 0.3rem;
`;

const SearchBox = styled.div`
  background: #333;
  padding: 0.7rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.5rem;

  input {
    background: none;
    border: none;
    color: white;
    flex: 1;
    outline: none;
    font-size: 1rem;
  }
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Post = styled.div`
  border-bottom: 1px solid #444;
  padding-bottom: 1rem;
`;

const Author = styled.div`
  color: #ffc107;
  margin-bottom: 0.3rem;
`;

const Content = styled.div`
  font-size: 1rem;
`;

const CommentLink = styled.div`
  color: #47a3ff;
  margin-top: 0.3rem;
  cursor: pointer;
  font-size: 0.9rem;
`;

const CommentsSection = styled.div`
  margin-top: 0.5rem;
  padding-left: 1rem;
`;

const Comment = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  margin: 0.2rem 0;
  color: #ccc;

  .arrow {
    margin-right: 0.4rem;
    color: rgb(174, 171, 164);
  }
`;

const CommentInput = styled.input`
  margin-top: 0.4rem;
  width: 100%;
  background: #222;
  border: none;
  border-radius: 4px;
  padding: 0.4rem;
  color: white;
`;

const InputArea = styled.div`
  display: flex;
  margin-top: 2rem;
  gap: 1rem;

  input {
    flex: 1;
    padding: 0.7rem;
    border-radius: 0.5rem;
    border: none;
    font-size: 1rem;
  }

  button {
    background: #ffc107;
    color: black;
    font-weight: bold;
    border: none;
    padding: 0.7rem 1.2rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
  }
`;

const StudyInputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2rem;

  input,
  textarea {
    padding: 0.7rem;
    border-radius: 0.5rem;
    border: none;
    font-size: 1rem;
  }

  textarea {
    height: 100px;
    resize: none;
  }

  button {
    background: #ffc107;
    color: black;
    font-weight: bold;
    border: none;
    padding: 0.7rem 1.2rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
  }
`;

const StudyContact = styled.div`
  margin-top: 0.5rem;
  color: #87cefa;
  font-size: 0.9rem;
`;
