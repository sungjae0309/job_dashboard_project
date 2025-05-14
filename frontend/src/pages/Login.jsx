import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // 여기에 로그인 로직 추가 예정
    navigate("/"); // 로그인 후 대시보드로 이동
  };

  return (
    <div style={{ color: "white", padding: "2rem" }}>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}
