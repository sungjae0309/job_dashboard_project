import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Analytics from "./Analytics";
import Earnings from "./Earnings";
import FAQ from "./FAQ";
import Navbar from "./Navbar";
import Profile from "./Profile";
import Transfers from "./Transfers";
import styled from "styled-components";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChatbot = () => {
    setSidebarOpen(false);
    setShowChatbot((prev) => !prev);
  };

  const closeChatbot = () => {
    setShowChatbot(false);
  };

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
    }
  };

  return (
    <Container sidebarOpen={sidebarOpen} showChatbot={showChatbot}>
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        toggleChatbot={toggleChatbot}
      />
      {showChatbot && (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <span className="chatbot-title">챗봇</span>
            <button className="close-btn" onClick={closeChatbot}>×</button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="메시지를 입력하세요"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>전송</button>
          </div>
        </div>
      )}
      <div className="dashboard__content">
        <Navbar />
        <div className="grid">
          <div className="row__one">
            <Analytics />
            <FAQ />
          </div>
          <div className="row__two">
            <Earnings />
            <Transfers />
            <Profile />
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: relative;

  .dashboard__content {
    margin-left: ${({ sidebarOpen, showChatbot }) => {
      if (sidebarOpen) return "18vw";
      if (showChatbot) return "24rem";
      return "4rem";
    }};
    padding: 1rem;
    flex-grow: 1;
    width: 100%;
    transition: margin-left 0.3s ease-in-out;
  }

  .chatbot-panel {
    position: fixed;
    top: 0;
    left: ${({ sidebarOpen }) => (sidebarOpen ? "18vw" : "4rem")};
    width: 20rem;
    height: 100vh;
    background-color: #1e1e1e;
    color: white;
    display: flex;
    flex-direction: column;
    z-index: 90;
    border-left: 2px solid #444;
    transition: left 0.3s ease-in-out;

    .chatbot-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid #333;

      .chatbot-title {
        font-size: 1.1rem;
        font-weight: bold;
      }

      .close-btn {
        background: none;
        border: none;
        color: #ffc107;
        font-size: 1.5rem;
        cursor: pointer;
      }
    }

    .chat-messages {
      flex: 1;
      padding: 1rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .chat-input {
      display: flex;
      border-top: 1px solid #333;
      padding: 0.5rem;

      input {
        flex: 1;
        background: #2a2a2a;
        border: none;
        padding: 0.5rem;
        color: white;
        font-size: 1rem;
        border-radius: 5px;
      }

      button {
        margin-left: 0.5rem;
        background-color: #ffc107;
        border: none;
        padding: 0.5rem 1rem;
        color: black;
        font-weight: bold;
        border-radius: 5px;
        cursor: pointer;
      }
    }

    .message.user {
      align-self: flex-end;
      background: #ffc107;
      color: black;
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      max-width: 80%;
    }
  }

  .grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .row__one, .row__two {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
    .row__two {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;