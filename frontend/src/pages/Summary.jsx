/*
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

export default function Summary() {
  const [data, setData] = useState({ average_gpa: 0, average_age: 0 });

  useEffect(() => {
    axios.get("http://localhost:8000/api/summary/")
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <SummaryContainer>
      <h2>평균 학점: {data.average_gpa}</h2>
      <h2>평균 나이: {data.average_age}</h2>
    </SummaryContainer>
  );
}

const SummaryContainer = styled.div`
  user-select: none; // ✅ 텍스트 드래그 막기 
  color: white;
  margin-top: 1rem;
  margin-left: 1rem;
  h2 {
    font-size: 1.5rem;
    margin: 0.5rem 0;
  }
`;
*/
