// src/contexts/LikedJobsContext.js
import React, { createContext, useState, useContext } from "react";

// Context 생성
const LikedJobsContext = createContext();

// Provider 정의
export function LikedJobsProvider({ children }) {
  const [likedJobs, setLikedJobs] = useState([]);

  // 찜 toggle 함수
  const toggleLike = (job) => {
    setLikedJobs((prev) =>
      prev.find((j) => j.id === job.id)
        ? prev.filter((j) => j.id !== job.id)
        : [...prev, job]
    );
  };

  return (
    <LikedJobsContext.Provider value={{ likedJobs, toggleLike }}>
      {children}
    </LikedJobsContext.Provider>
  );
}

// Context를 쉽게 사용할 수 있도록 커스텀 훅 export
export function useLikedJobs() {
  return useContext(LikedJobsContext);
}
