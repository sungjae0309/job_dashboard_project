import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const EMAIL_DOMAINS = [
  "naver.com",
  "daum.net",
  "gmail.com",
  "kakao.com",
  "hotmail.com",
  "nate.com"
];

export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    gender: "",
    phone: "",
    birth: ""
  });

  const [pwMatch, setPwMatch] = useState(true);
  const [emailDropdown, setEmailDropdown] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // 이메일 인풋 변화
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));

    // 비밀번호 확인
    if (name === "confirm_password" || name === "password") {
      setPwMatch(
        name === "confirm_password"
          ? value === user.password
          : user.confirm_password === value
      );
    }

    // 이메일 도메인 추천
    if (name === "email") {
      const [local, domain] = value.split("@");
      if (!domain && value.includes("@")) {
        setEmailDropdown(
          EMAIL_DOMAINS.map((d) => `${local}@${d}`)
        );
        setShowDropdown(true);
      } else if (domain) {
        setShowDropdown(false);
      }
    }
  };

  // 이메일 추천 클릭
  const handleEmailSelect = (suggested) => {
    setUser((prev) => ({ ...prev, email: suggested }));
    setShowDropdown(false);
  };

  // 휴대폰 번호 입력 자동 하이픈
  const handlePhone = (e) => {
    let val = e.target.value.replace(/[^0-9]/g, "");
    if (val.length <= 3) {
      // 010
      setUser((prev) => ({ ...prev, phone: val }));
    } else if (val.length <= 7) {
      // 010-1234
      setUser((prev) => ({
        ...prev,
        phone: `${val.slice(0, 3)}-${val.slice(3)}`
      }));
    } else if (val.length <= 11) {
      // 010-1234-5678
      setUser((prev) => ({
        ...prev,
        phone: `${val.slice(0, 3)}-${val.slice(3, 7)}-${val.slice(7, 11)}`
      }));
    } else {
      // 최대 010-1234-5678까지만
      setUser((prev) => ({
        ...prev,
        phone: `${val.slice(0, 3)}-${val.slice(3, 7)}-${val.slice(7, 11)}`
      }));
    }
  };

  const handleBirth = (e) => {
    let val = e.target.value.replace(/[^0-9]/g, "");
    if (val.length <= 4) {
      setUser((prev) => ({ ...prev, birth: val }));
    } else if (val.length <= 6) {
      setUser((prev) => ({
        ...prev,
        birth: `${val.slice(0, 4)}-${val.slice(4)}`
      }));
    } else if (val.length <= 8) {
      setUser((prev) => ({
        ...prev,
        birth: `${val.slice(0, 4)}-${val.slice(4, 6)}-${val.slice(6, 8)}`
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        birth: `${val.slice(0, 4)}-${val.slice(4, 6)}-${val.slice(6, 8)}`
      }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirm_password) {
      setPwMatch(false);
      return;
    }
    const payload = {
      name: user.name,
      email: user.email,
      password: user.password,
      confirm_password: user.confirm_password,
      gender: user.gender,
      phone_number: user.phone,
      birth_date: user.birth
    };

    

    console.log("📦 payload 보내는 데이터:", payload);

    try {
      // 1. 회원가입 요청
      await axios.post("http://192.168.101.36:8000/auth/register", payload);

      // 2. 회원가입 성공하면 바로 로그인 시도
      const loginRes = await axios.post("http://192.168.101.36:8000/auth/login", {
        email: user.email,
        password: user.password
      });

      // 3. 토큰 저장 (ex: localStorage)
      localStorage.setItem("accessToken", loginRes.data.access_token);

      alert("회원가입 및 로그인 성공! 이력서 등록 단계로 이동합니다.");
      navigate("/registernext"); // 이력서 입력 단계로 이동

    } catch (err) {
      alert("회원가입 실패: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <Bg>
      <MainBox>
        <TopBar>
          <LogoArea>
            <JobMark>JOB</JobMark>
            <span style={{ color: "#fff", fontWeight: "bold", fontSize: "2rem" }}>자</span>
          </LogoArea>
        </TopBar>
        <Header>
          <h1>회원가입</h1>
        </Header>
        <Divider />
        <FormContainer onSubmit={handleSubmit} autoComplete="off">
          <Section>
            <Label>닉네임</Label>
            <Input
              name="name"
              maxLength={10}
              placeholder="최대 10자"
              value={user.name}
              onChange={handleChange}
              required
            />
          </Section>
          <Section style={{ position: "relative" }}>
            <Label>이메일</Label>
            <Input
              name="email"
              type="email"
              placeholder="이메일 입력"
              value={user.email}
              onChange={handleChange}
              required
              autoComplete="off"
              onFocus={(e) => {
                // @만 치고 나면 추천 보이기
                if (user.email && user.email.includes("@")) setShowDropdown(true);
              }}
              onBlur={() => setTimeout(() => setShowDropdown(false), 120)}
            />
            {showDropdown && emailDropdown.length > 0 && (
              <EmailDropdownArea>
                {emailDropdown.map((d, i) => (
                  <EmailDropdownItem
                    key={d}
                    onClick={() => handleEmailSelect(d)}
                  >
                    {d}
                  </EmailDropdownItem>
                ))}
              </EmailDropdownArea>
            )}
          </Section>
          <Section>
            <Label>비밀번호</Label>
            <Input
              name="password"
              type="password"
              placeholder="비밀번호"
              value={user.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </Section>
          <Section>
            <Label>비밀번호 확인</Label>
            <Input
              name="confirm_password"
              type="password"
              placeholder="비밀번호 확인"
              value={user.confirm_password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            {user.confirm_password.length > 0 && (
              <PwInfo $match={pwMatch}>
                {pwMatch ? "비밀번호가 일치합니다" : "비밀번호가 일치하지 않습니다"}
              </PwInfo>
            )}
          </Section>
          <Section>
            <Label>성별</Label>
            <Select name="gender" value={user.gender} onChange={handleChange} required>
              <option value="">선택</option>
              <option value="남성">남성</option>
              <option value="여성">여성</option>
              <option value="기타">기타</option>
            </Select>
          </Section>
          <Section>
            <Label>휴대폰번호</Label>
            <Input
              name="phone"
              placeholder="010-0000-0000"
              value={user.phone}
              onChange={handlePhone}
              maxLength={13}
              required
              inputMode="numeric"
            />
          </Section>
          <Section>
            <Label>생년월일</Label>
            <Input
              name="birth"
              placeholder="YYYY-MM-DD"
              value={user.birth}
              onChange={handleBirth}
              required
              inputMode="numeric"
            />
          </Section>
          <SubmitBtn type="submit">회원가입 완료</SubmitBtn>
        </FormContainer>
      </MainBox>
    </Bg>
  );
}

// ------ styled-components (네가 올린 거 그대로) ------
const Bg = styled.div`
  min-height: 100vh;
  background: #1e1e1e;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 2rem;
`;

const MainBox = styled.div`
  background: rgb(80, 79, 79);
  border-radius: 2rem;
  box-shadow: 0 3px 18px 0 #0002;
  width: 35rem;
  max-width: 97vw;
  margin-bottom: 3rem;
  padding-bottom: 2.2rem;
  color: #fff;
  position: relative;
`;

const TopBar = styled.div`
  width: 100%;
  padding: 1.5rem 2.3rem 0 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoArea = styled.div`
  display: flex; align-items: center;
`;

const JobMark = styled.span`
  font-size: 2.5rem;
  font-weight: bold;
  letter-spacing: -0.01em;
  color: #ffc107;
`;

const Header = styled.div`
  padding: 1.7rem 2.5rem 0.6rem 2.5rem;
  text-align: center;
  h1 {
    color: #ffc107;
    font-size: 2.2rem;
    font-weight: bold;
    margin-bottom: 0.4rem;
    letter-spacing: 0.03em;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 2px solid #f0f0f0;
  margin: 1.2rem auto 2.2rem auto;
  width: 87%;
`;

const FormContainer = styled.form`
  padding: 0 2.5rem;
`;

const Section = styled.section`
  margin-bottom: 2.1rem;
`;

const Label = styled.label`
  min-width: 6rem;
  font-size: 1.01rem;
  font-weight: 500;
  color: #fff;
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.85rem 1.1rem;
  border-radius: 0.6rem;
  border: none;
  background: #222;
  color: #fff;
  font-size: 1.13rem;
  height: 48px;
  &::placeholder { color: #aaa; }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.85rem;
  border-radius: 0.6rem;
  border: none;
  background: #222;
  color: #fff;
  font-size: 1.13rem;
  height: 48px;
`;

const PwInfo = styled.div`
  font-size: 0.96rem;
  margin: 0.5rem 0 0 0;
  color: ${({ $match }) => $match ? "#7bed7b" : "#e55b5b"};
  font-weight: 500;
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 1.1rem;
  background: #ffc107;
  color: #232323;
  border: none;
  border-radius: 0.7rem;
  font-size: 1.08rem;
  font-weight: bold;
  margin-top: 2rem;
  cursor: pointer;
  &:hover {
    background: #ffd955;
  }
`;

const EmailDropdownArea = styled.div`
  position: absolute;
  top: 3.1rem;
  left: 0;
  width: 100%;
  z-index: 15;
  background: #232323;
  border: none;
  border-radius: 0.55rem;
  box-shadow: 0 4px 16px 0 #0008;
  padding: 0.35rem 0.4rem;
  font-size: 1.07rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.22rem;
`;

const EmailDropdownItem = styled.div`
  padding: 0.7rem 1rem 0.7rem 1.3rem;
  color: #fff;
  background: transparent;
  border-radius: 0.35rem;
  cursor: pointer;
  &:hover { background: #222; }
`;
