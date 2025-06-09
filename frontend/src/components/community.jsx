import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import { FaAngleRight } from "react-icons/fa";

const jobFields = ["프론트엔드", "백엔드", "데이터"];
const communityTabs = ["경험공유", "스터디 모집"];

export default function Community() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("경험공유");
  const [selectedField, setSelectedField] = useState("프론트엔드");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [posts, setPosts] = useState([
    {
      id: 1,
      job: "프론트엔드",
      author: "익명 1",
      content: "SQLD는 기출 위주로 풀었다",
      comments: ["맞음 기출 중요"],
    },
    {
      id: 2,
      job: "프론트엔드",
      author: "익명 2",
      content: "FastAPI로 백엔드 만들면서 실력 쌓았음",
      comments: [],
    },
  ]);

  const [studyPosts, setStudyPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [showComments, setShowComments] = useState({});

  const [studyTitle, setStudyTitle] = useState("");
  const [studyDesc, setStudyDesc] = useState("");
  const [studyContact, setStudyContact] = useState("");

  const filteredPosts = posts.filter(
    (post) =>
      post.job === selectedField &&
      post.content.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handlePost = () => {
    if (!newPost.trim()) return;
    const newEntry = {
      id: posts.length + 1,
      job: selectedField,
      author: `익명 ${posts.length + 1}`,
      content: newPost.trim(),
      comments: [],
    };
    setPosts([newEntry, ...posts]);
    setNewPost("");
  };

  const handleAddComment = (postId, text) => {
    if (!text.trim()) return;
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, comments: [...post.comments, text] }
        : post
    );
    setPosts(updatedPosts);
  };

  const toggleComments = (postId) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleStudyPost = () => {
    if (!studyTitle.trim() || !studyDesc.trim() || !studyContact.trim()) return;
    const newStudy = {
      id: studyPosts.length + 1,
      title: studyTitle,
      desc: studyDesc,
      contact: studyContact,
    };
    setStudyPosts([newStudy, ...studyPosts]);
    setStudyTitle("");
    setStudyDesc("");
    setStudyContact("");
  };

  return (
    <Container sidebarOpen={sidebarOpen}>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="content">
        <CommunityTabs>
          {communityTabs.map((tab) => (
            <CommunityTab
              key={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </CommunityTab>
          ))}
        </CommunityTabs>

        {activeTab === "경험공유" && (
          <>
            <JobTabs>
              {jobFields.map((field) => (
                <JobTab
                  key={field}
                  active={selectedField === field}
                  onClick={() => setSelectedField(field)}
                >
                  {field}
                </JobTab>
              ))}
            </JobTabs>

            <SearchBox>
              <span role="img" aria-label="search">🔍</span>
              <input
                type="text"
                placeholder="키워드로 검색"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </SearchBox>

            <PostList>
              {filteredPosts.map((post) => (
                <Post key={post.id}>
                  <Author>👤 {post.author}</Author>
                  <Content>{post.content}</Content>

                  {post.comments.length > 0 && (
                    <CommentLink onClick={() => toggleComments(post.id)}>
                      댓글 {post.comments.length}개 {showComments[post.id] ? "숨기기" : "보기"}
                    </CommentLink>
                  )}

                  {showComments[post.id] && (
                    <CommentsSection>
                      {post.comments.map((cmt, idx) => (
                        <Comment key={idx}>
                          <FaAngleRight className="arrow" />
                          <span>{cmt}</span>
                        </Comment>
                      ))}
                      <CommentInput
                        placeholder="댓글 작성..."
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleAddComment(post.id, e.target.value);
                            e.target.value = "";
                          }
                        }}
                      />
                    </CommentsSection>
                  )}
                </Post>
              ))}
            </PostList>

            <InputArea>
              <input
                type="text"
                placeholder="공유하고 싶은 경험을 입력하세요..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handlePost()}
              />
              <button onClick={handlePost}>등록</button>
            </InputArea>
          </>
        )}

        {activeTab === "스터디 모집" && (
          <>
            <StudyInputArea>
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
            </StudyInputArea>

            <PostList>
              {studyPosts.map((study) => (
                <Post key={study.id}>
                  <Author>📚 {study.title}</Author>
                  <Content>{study.desc}</Content>
                  <StudyContact>📞 {study.contact}</StudyContact>
                </Post>
              ))}
            </PostList>
          </>
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
