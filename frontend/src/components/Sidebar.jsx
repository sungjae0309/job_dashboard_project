import React from "react";
import styled from "styled-components";
import { MdSpaceDashboard, MdEdit } from "react-icons/md";
import { FiLogOut, FiBell, FiUser } from "react-icons/fi";
import { FaRobot, FaChartLine, FaChartBar,  FaRegCommentDots, FaHeart, FaRegComments, FaSearch  } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { BsChatDots } from 'react-icons/bs'




export default function Sidebar({ isOpen, setIsOpen, toggleChatbot }) {
  return (
    <Section isOpen={isOpen}>
      <div className="top">
        <div className="toggle" onClick={() => setIsOpen(!isOpen)}>
          <GiHamburgerMenu />
        </div>
      </div>
      <div className="links">
        <Link to="/" data-label="홈 가기" isOpen={isOpen}>
          <MdSpaceDashboard />
          <span>홈 화면</span>
        </Link>

        <Link to="/MyProfile" data-label="내 프로필" isOpen={isOpen}>
          <FiUser />
          <span>내 프로필</span>
        </Link>


        <Link to="/Searchjob" data-label="공고 검색" isOpen={isOpen}>
          <FaSearch />
          <span>공고 보기</span>
        </Link>
      
        <Link to="/saved-jobs" data-label="찜 한 채용공고" isOpen={isOpen}
        >
          <FaHeart />
          <span>찜하기</span>
        </Link>
        <Link to="/community" data-label="커뮤니티" isOpen={isOpen}>
          <FaRegComments />
          <span>커뮤니티</span>
        </Link>
        <a href="#" onClick={toggleChatbot} data-label="챗봇" isOpen={isOpen}>
          <BsChatDots />
          <span>챗봇</span>
        </a>
        
        <Link to="/logout" data-label="로그아웃" isOpen={isOpen}>
          <FiLogOut />
          <span>로그아웃</span>
        </Link>

      </div>
    </Section>
  );
}

const Section = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: ${({ isOpen }) => (isOpen ? "18vw" : "4.5rem")};
  background-color: #212121;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: ${({ isOpen }) => (isOpen ? "flex-start" : "center")};
  padding: 1rem 0.5rem;
  transition: width 0.3s ease-in-out;
  z-index: 100;

  .top {
    width: 100%;
    display: flex;
    justify-content: ${({ isOpen }) => (isOpen ? "flex-start" : "center")};
    padding: 0 1rem;
    margin-bottom: 2rem;

    .toggle {
      color: #ffc107;
      font-size: ${({ isOpen }) => (isOpen ? "1.8rem" : "2.2rem")};
      cursor: pointer;
    }
  }

  .links {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 2rem;
    align-items: ${({ isOpen }) => (isOpen ? "flex-start" : "center")};
    padding-left: ${({ isOpen }) => (isOpen ? "0.5rem" : "0")};

    a {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: ${({ isOpen }) => (isOpen ? "flex-start" : "center")};
      gap: 1rem;
      color: white;
      font-weight: bold;
      font-size: 1.2rem;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      transition: all 0.3s ease;
      width: 100%;

      &:hover {
        background-color: ${({ isOpen }) => (isOpen ? "#ffc107" : "transparent")};
        color: ${({ isOpen }) => (isOpen ? "black" : "#ffc107")};
      }

      &::after {
        content: attr(data-label);
        display: ${({ isOpen }) => (isOpen ? "none" : "block")};
        position: absolute;
        left: 3.5rem;
        top: 50%;
        transform: translateY(-50%);
        background-color: #444;
        color: white;
        padding: 0.3rem 0.6rem;
        border-radius: 0.4rem;
        font-size: 0.9rem;
        white-space: nowrap;
        z-index: 10;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease-in-out;
      }

      &:hover::after {
        opacity: ${({ isOpen }) => (isOpen ? "0" : "1")};
      }

      // ✅ 아이콘 크기를 사이드바 열림 여부에 따라 다르게 설정
      svg {
        font-size: ${({ isOpen }) => (isOpen ? "1.5rem" : "2.5rem")};
        transition: font-size 0.3s ease;
      }

      span {
        display: ${({ isOpen }) => (isOpen ? "inline" : "none")};
        transition: opacity 0.3s ease-in-out;
        white-space: nowrap;
      }
    }
  }
`;