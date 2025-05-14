import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Experience() {
  const navigate = useNavigate();
  const [items, setItems] = useState([{ type: "", value: "" }]);

  const handleTypeChange = (index, newType) => {
    const updated = [...items];
    updated[index].type = newType;
    updated[index].value = "";
    setItems(updated);
  };

  const handleValueChange = (index, newValue) => {
    const updated = [...items];
    updated[index].value = newValue;
    setItems(updated);
  };

  const handleAddItem = () => {
    setItems([...items, { type: "", value: "" }]);
  };

  const handleRemoveItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  const getPlaceholder = (type) => {
    switch (type) {
      case "개인 포트폴리오":
        return "ex) Github URL";
      case "자격증":
        return "ex) 정보처리기능사 1급";
      case "수상 이력":
        return "ex) 광진구 공모전 금상";
      case "부트캠프 수료 이력":
        return "ex) 네이버 클라우드 캠프 수료";
      default:
        return "포트폴리오 유형을 선택해주세요";
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    navigate("/jobinterest");
  };

  const handleBack = () => {
    navigate("/userinfo");
  };

  return (
    <Wrapper>
      <FormContainer>
        <Title>포트폴리오 입력 (선택)</Title>
        <form onSubmit={handleNext}>
          {items.map((item, index) => (
            <InputGroup key={index}>
              <Label></Label>
              <Select
                value={item.type}
                onChange={(e) => handleTypeChange(index, e.target.value)}
              >
                <option value="">포트폴리오 유형</option>
                <option value="개인 포트폴리오">프로젝트</option>
                <option value="자격증">자격증</option>
                <option value="수상 이력">수상</option>
                <option value="부트캠프 수료 이력">부트캠프</option>
              </Select>
              <Input
                type="text"
                placeholder={getPlaceholder(item.type)}
                value={item.value}
                onChange={(e) => handleValueChange(index, e.target.value)}
              />
              {items.length > 1 && (
                <RemoveButton type="button" onClick={() => handleRemoveItem(index)}>
                  삭제
                </RemoveButton>
              )}
            </InputGroup>
          ))}
          <AddButton type="button" onClick={handleAddItem}>
            + 항목 추가
          </AddButton>
          <ButtonGroup>
            <BackButton type="button" onClick={handleBack}>이전</BackButton>
            <NextButton type="submit">다음</NextButton>
          </ButtonGroup>
        </form>
      </FormContainer>
    </Wrapper>
  );
}

// 스타일
const Wrapper = styled.div`
  min-height: 100vh;
  background: rgb(13, 13, 13);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  background: #3a3a3a;
  padding: 2.5rem;
  border-radius: 1.2rem;
  width: 40rem;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2.5rem;
  color: #ffc107;
`;

const Label = styled.label`
  display: block;
  margin: 1rem 0 0.5rem;
  font-weight: bold;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.9rem;
  border-radius: 0.5rem;
  border: 2px solid #999;
  background-color: #e0e0e0;
  color: #000;
  font-size: 1rem;
  margin-bottom: 0.7rem;

  &:focus {
    outline: 2px solid #5084ff;
    border-color: transparent;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #f2f2f2;
  color: #000;
  font-size: 1rem;
`;

const RemoveButton = styled.button`
  margin-top: 0.5rem;
  background-color: #e53935;
  color: white;
  border: none;
  padding: 0.4rem 1rem;
  font-size: 0.85rem;
  border-radius: 0.4rem;
  cursor: pointer;

  &:hover {
    background-color: #c62828;
  }
`;

const AddButton = styled.button`
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 0.8rem 1.6rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 2rem;

  &:hover {
    background-color: #5a6268;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const BackButton = styled.button`
  padding: 0.8rem 2rem;
  background-color: #f2f2f2;
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: rgb(184, 179, 173);
  }
`;

const NextButton = styled.button`
  padding: 0.8rem 2rem;
  background-color: #ffc107;
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #e6ac00;
  }
`;
