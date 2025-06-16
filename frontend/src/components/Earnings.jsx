// 기업 비교 대시보드 - 피파 스타일
import React, { useState } from "react";
import styled from "styled-components";
import { cardStyles } from "./ReusableStyles";

export default function CompanyComparisonDashboard() {
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  const companyData = [
    {
      name: "우아한형제들",
      salary: 4800,
      benefits: ["유연 근무제", "점심 식사 제공", "자기계발비"],
    },
    {
      name: "네이버",
      salary: 5300,
      benefits: ["재택 근무 지원", "스톡옵션", "매칭률"],
    },
    {
      name: "카카오",
      salary: 5100,
      benefits: ["최신 장비 지원", "성과급 지급", "헬스케어 지원"],
    },
    {
      name: "라인",
      salary: 4900,
      benefits: ["워케이션 제도", "디자인 교육비", "출근 자유"],
    },
  ];

  const toggleCompany = (companyName) => {
    setSelectedCompanies((prev) => {
      if (prev.includes(companyName)) {
        return prev.filter((name) => name !== companyName);
      } else if (prev.length < 2) {
        return [...prev, companyName];
      } else {
        return prev;
      }
    });
  };

  const selectedData = companyData.filter((company) =>
    selectedCompanies.includes(company.name)
  );

  const getCommonStats = () => {
    if (selectedData.length !== 2) return null;
    const [a, b] = selectedData;
    const benefitSet = new Set([...a.benefits, ...b.benefits]);
    return {
      salary: [a.salary, b.salary],
      benefits: Array.from(benefitSet),
    };
  };

  const stats = getCommonStats();

  return (
    <Section>
      <div className="header">
        <h3>공고 비교</h3>
        <p>두 개의 회사를 선택하여 비교해보세요</p>
      </div>

      <CompanySelect>
        {companyData.map((company) => (
          <button
            key={company.name}
            className={selectedCompanies.includes(company.name) ? "active" : ""}
            onClick={() => toggleCompany(company.name)}
          >
            {company.name}
          </button>
        ))}
      </CompanySelect>

      {stats && (
        <ComparisonGrid>
          <StatColumn align="right">
            <h4>{selectedData[0].name}</h4>
            <Stat>{selectedData[0].salary}만원</Stat>
            {stats.benefits.map((b, i) => (
              <Stat key={i} highlight={selectedData[0].benefits.includes(b)}>
                {selectedData[0].benefits.includes(b) ? "✓" : "-"}
              </Stat>
            ))}
          </StatColumn>

          <CenterColumn>
            <h4>스탯</h4>
            <Stat>연봉</Stat>
            {stats.benefits.map((b, i) => (
              <Stat key={i}>{b}</Stat>
            ))}
          </CenterColumn>

          <StatColumn align="left">
            <h4>{selectedData[1].name}</h4>
            <Stat>{selectedData[1].salary}만원</Stat>
            {stats.benefits.map((b, i) => (
              <Stat key={i} highlight={selectedData[1].benefits.includes(b)}>
                {selectedData[1].benefits.includes(b) ? "✓" : "-"}
              </Stat>
            ))}
          </StatColumn>
        </ComparisonGrid>
      )}
    </Section>
  );
}

const Section = styled.section`
  ${cardStyles};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;

  .header {
    h3 {
      color: #ffc107;
      font-size: 1.2rem;
    }
    p {
      font-size: 0.9rem;
      color: #ccc;
    }
  }
`;

const CompanySelect = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;

  button {
    flex: 1;
    padding: 0.6rem 1rem;
    background: #2b2b2b;
    color: #ccc;
    border: none;
    border-radius: 2rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &.active {
      background-color: #ffc107;
      color: black;
    }
  }
`;

const ComparisonGrid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  text-align: center;
  padding-top: 1rem;
  flex-wrap: wrap;
`;

const StatColumn = styled.div`
  flex: 1;
  text-align: ${(props) => props.align};

  h4 {
    color: #47a3ff;
    margin-bottom: 1rem;
  }
`;

const CenterColumn = styled.div`
  flex: 1;

  h4 {
    color: #ffc107;
    margin-bottom: 1rem;
  }
`;


const Stat = styled.div`
  margin: 0.4rem 0;
  font-size: 0.95rem;
  color: ${(props) => (props.highlight ? "#4caf50" : "#ccc")};
  font-weight: ${(props) => (props.highlight ? "bold" : "normal")};
`;
