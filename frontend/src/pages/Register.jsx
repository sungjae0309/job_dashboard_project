import React, { useState } from "react";
import styled from "styled-components";
import { FiLogIn } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// 예시 선택지
const jobOptions = [
  "프론트엔드 개발자", "백엔드 개발자", "데이터 분석가", "AI 엔지니어",
  "UX/UI 디자이너", "PM/PO", "모바일 앱 개발자", "DevOps 엔지니어",
  "게임 개발자", "보안 전문가", "QA 엔지니어"
];
const skillCategories = [
  {
    title: "언어",
    options: ["C", "C++", "C#", "Java", "Python", "Ruby", "JavaScript"],
    otherKey: "otherLanguage"
  },
  {
    title: "프레임워크",
    options: ["ReactJS", "Node.js", "TypeScript", "Vue.js", "jQuery", "Flutter"],
    otherKey: "otherFramework"
  },
  {
    title: "협업 툴",
    options: ["Git", "Slack", "Jira", "Notion", "Trello", "Figma"],
    otherKey: "otherTool"
  }
];
const emailDomains = [
  "naver.com", "daum.net", "gmail.com", "kakao.com", "hotmail.com", "nate.com"
];

// --- 메인 컴포넌트 ---
export default function Register() {
  // 회원정보
  const [user, setUser] = useState({
    name: "", email: "", phone: "", birth: "", password: "", confirmPassword: "",
    education: "", school: "", major: "", grade: "",
    academicStatus: "",
  });

  // 이메일 도메인 자동완성
  const [showEmailDropdown, setShowEmailDropdown] = useState(false);
  const [emailDomainSuggestions, setEmailDomainSuggestions] = useState([]);
  const [emailInputFocus, setEmailInputFocus] = useState(false);

  // 포트폴리오/경험
  const [experiences, setExperiences] = useState([{ type: "", value: "" }]);

  // 희망 직무
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [customJob, setCustomJob] = useState("");

  // 기술 스택 (카테고리별 state)
  const [selectedSkills, setSelectedSkills] = useState({
    언어: [],
    프레임워크: [],
    협업툴: [],
    otherLanguage: "",
    otherFramework: "",
    otherTool: "",
  });

  const navigate = useNavigate();

  // ---------- 이벤트 핸들러 ----------
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value,
      ...(name === "education" && { academicStatus: "" })
    }));

    // 이메일 입력 시 자동완성
    if (name === "email") {
      const [id, domain] = value.split("@");
      if (!domain && id.length > 0) {
        setEmailDomainSuggestions(emailDomains.map(d => `${id}@${d}`));
        setShowEmailDropdown(true);
      } else if (domain) {
        setShowEmailDropdown(false);
      }
    }
  };

  const handleAddCustomJob = () => {
    const job = customJob.trim();
    if (job && !selectedJobs.includes(job)) {
      setSelectedJobs([...selectedJobs, job]);
      setCustomJob(""); // 입력칸 비움
    }
  };
  

  // 기타 언어 추가 함수
const handleAddOtherLanguage = () => {
  const val = selectedSkills.otherLanguage.trim();
  if (
    val &&
    !selectedSkills["언어"].includes(val)
  ) {
    setSelectedSkills(prev => ({
      ...prev,
      언어: [...prev.언어, val],
      otherLanguage: "",
    }));
  }
};


  // 이메일 도메인 자동완성 클릭
  const handleEmailSuggestionClick = (suggestion) => {
    setUser(prev => ({ ...prev, email: suggestion }));
    setShowEmailDropdown(false);
  };

  // 휴대폰 번호 자동 하이픈 (기존 로직 유지)
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length >= 3) value = value.replace(/^(\d{3})(\d{0,4})(\d{0,4})$/, (match, a, b, c) =>
      b ? (c ? `${a}-${b}-${c}` : `${a}-${b}`) : a
    );
    setUser(prev => ({ ...prev, phone: value }));
  };

  // 비밀번호 일치 안내
  const pwMatch = user.password && user.confirmPassword && user.password === user.confirmPassword;

  // 경험 추가/삭제/변경
  const handleExpTypeChange = (idx, v) => {
    const arr = [...experiences];
    arr[idx].type = v; arr[idx].value = "";
    setExperiences(arr);
  };
  const handleExpValueChange = (idx, v) => {
    const arr = [...experiences];
    arr[idx].value = v;
    setExperiences(arr);
  };
  const handleAddExp = () => setExperiences([...experiences, { type: "", value: "" }]);
  const handleRemoveExp = idx => setExperiences(experiences.filter((_, i) => i !== idx));

  const [jobOpen, setJobOpen] = useState(false);
  const toggleJob = job =>
    setSelectedJobs(prev =>
      prev.includes(job) ? prev.filter(j => j !== job) : [...prev, job]
    );
  
  const removeJob = job =>
    setSelectedJobs(prev => prev.filter(j => j !== job));



  const [isFolded, setIsFolded] = useState({
    언어: false,
    프레임워크: false,
    협업툴: false,
  });
  
  const [skillLevel, setSkillLevel] = useState({
    언어: 0,
    프레임워크: 0,
    협업툴: 0,
  });

  const [skillLevels, setSkillLevels] = useState({
    언어: {},
    프레임워크: {},
    협업툴: {},
  });
  
  const [skillKeywords, setSkillKeywords] = useState({
    언어: [],
    프레임워크: [],
    협업툴: [],
  });
  const [customSkill, setCustomSkill] = useState({
    언어: "",
    프레임워크: "",
    협업툴: "",
  });
  const handleLevelChange = (cat, value) => {
    setSkillLevel(prev => ({ ...prev, [cat]: Number(value) }));
  };
  const handleSkillAdd = (cat, keyword) => {
    setSkillKeywords(prev => ({
      ...prev,
      [cat]: prev[cat].includes(keyword)
        ? prev[cat]
        : [...prev[cat], keyword]
    }));
    setCustomSkill(prev => ({ ...prev, [cat]: "" }));
  };
  const handleSkillRemove = (cat, keyword) => {
    setSkillKeywords(prev => ({
      ...prev,
      [cat]: prev[cat].filter(k => k !== keyword)
    }));
  };
  const handleCustomSkillChange = (cat, value) => {
    setCustomSkill(prev => ({ ...prev, [cat]: value }));
  };
  const handleCustomSkillSubmit = (cat, e) => {
    e.preventDefault();
    if (customSkill[cat].trim()) {
      handleSkillAdd(cat, customSkill[cat].trim());
    }
  };
  


  // 기술스택 (카드형/태그형)
  const toggleSkill = (category, skill) => {
    setSelectedSkills(prev => ({
      ...prev,
      [category]: prev[category].includes(skill)
        ? prev[category].filter(s => s !== skill)
        : [...prev[category], skill]
    }));
  };
  const handleOtherSkillChange = (category, v) => {
    setSelectedSkills(prev => ({ ...prev, [category]: v }));
  };

  // 최종학력 선택 시 academicStatus 옵션 제어
  const getAcademicStatusOptions = () => {
    if (user.education.startsWith("대학교")) return ["휴학", "재학", "졸업"];
    if (user.education === "대학원") return ["휴학", "재학", "졸업"];
    if (user.education === "고등학교") return ["졸업"];
    return [];
  };

  // 제출
  const handleSubmit = e => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    // ...회원가입 submit (API)
    alert("회원가입 완료! (데이터 콘솔에 출력됨)");
    console.log({
      user, experiences,
      jobs: [...selectedJobs, ...(customJob.trim() ? [customJob.trim()] : [])],
      skills: {
        언어: [...selectedSkills["언어"], ...(selectedSkills.otherLanguage ? [selectedSkills.otherLanguage] : [])],
        프레임워크: [...selectedSkills["프레임워크"], ...(selectedSkills.otherFramework ? [selectedSkills.otherFramework] : [])],
        협업툴: [...selectedSkills["협업툴"], ...(selectedSkills.otherTool ? [selectedSkills.otherTool] : [])],
      }
    });
  };

  // 경험 유형별 플레이스홀더
  const getPlaceholder = (type) => {
    switch (type) {
      case "개인 포트폴리오": return "ex) Github URL";
      case "자격증": return "ex) 정보처리기사 1급";
      case "수상 이력": return "ex) 광진구 공모전 금상";
      case "부트캠프 수료 이력": return "ex) 네이버 클라우드 캠프 수료";
      default: return "유형을 먼저 선택하세요";
    }
  };
  


  // ---------- 렌더링 ----------
  return (
    <Bg>
      <MainBox>
        <TopBar>
          <LogoArea>
            <JobMark>
              <span style={{ color: "#ffc107" }}>JOB</span>
              <span style={{ color: "#fff" }}>자</span>
            </JobMark>
          </LogoArea>
          <NavGroup>
            <NavBtn onClick={() => navigate("/")}>
              <FaHome className="nav-icon" />
              <span className="nav-label">홈</span>
            </NavBtn>
            <NavDivider />
            <NavBtn onClick={() => navigate("/login")}>
              <FiLogIn className="nav-icon" />
              <span className="nav-label">로그인</span>
            </NavBtn>
          </NavGroup>
        </TopBar>
        <Header>
          <h1>회원가입</h1>
          <Divider />
        </Header>
        <FormContainer onSubmit={handleSubmit} autoComplete="off">
          {/* --- 회원 정보 입력 --- */}
          <Section>
            <SectionTitle>회원 정보 입력</SectionTitle>
            <FlexRow>
              <Label>닉네임</Label>
              <Input name="name" maxLength={10} placeholder="최대 10자" value={user.name} onChange={handleUserChange} required />
            </FlexRow>
            <FlexRow style={{ position: "relative" }}>
              <Label>이메일</Label>
              <Input
                name="email"
                type="email"
                placeholder="이메일 입력"
                value={user.email}
                autoComplete="off"
                onChange={handleUserChange}
                onFocus={() => setEmailInputFocus(true)}
                onBlur={() => setTimeout(() => setShowEmailDropdown(false), 200)}
                required
              />
              {showEmailDropdown && emailDomainSuggestions.length > 0 && (
                <EmailDropdownArea>
                  {emailDomainSuggestions.map((d, i) => (
                    <EmailDropdownItem key={d + i} onClick={() => handleEmailSuggestionClick(d)}>
                      {d}
                    </EmailDropdownItem>
                  ))}
                </EmailDropdownArea>
              )}
            </FlexRow>
            <FlexRow>
              <Label>휴대폰번호</Label>
              <Input
                name="phone"
                placeholder="010-0000-0000"
                value={user.phone}
                onChange={handlePhoneChange}
                maxLength={13}
                required
              />
            </FlexRow>
            <FlexRow>
              <Label>생년월일</Label>
              <Input name="birth" placeholder="YYYYMMDD" value={user.birth} onChange={handleUserChange} required />
            </FlexRow>
            <FlexRow>
              <Label>비밀번호</Label>
              <Input
                name="password"
                type="password"
                placeholder="비밀번호"
                value={user.password}
                onChange={handleUserChange}
                required
              />
            </FlexRow>
            <FlexRow style={{ position: "relative" }}>
              <Label>비밀번호 확인</Label>
              <Input
                name="confirmPassword"
                type="password"
                placeholder="비밀번호 확인"
                value={user.confirmPassword}
                onChange={handleUserChange}
                required
              />
            </FlexRow>
            {user.confirmPassword.length > 0 && (
              <PwInfo $match={pwMatch}>
                {pwMatch ? "비밀번호가 일치합니다" : "비밀번호가 일치하지 않습니다"}
              </PwInfo>
            )}
          </Section>
          {/* --- 학력 정보 --- */}
          <Section>
            <SectionTitle>최종 학력</SectionTitle>
            <FlexRow>
            <Label>학력 / 학적</Label>
            <Select
              name="education"
              value={user.education}
              onChange={handleUserChange}
              required
              style={{ width: "45%" }}
            >
              <option value="">선택</option>
              <option value="고등학교">고등학교</option>
              <option value="대학교2">대학교(2년제)</option>
              <option value="대학교4">대학교(4년제)</option>
              <option value="대학원">대학원</option>
            </Select>
            <Select
              name="eduStatus"
              value={user.eduStatus}
              onChange={handleUserChange}
              required
              style={{ width: "45%", marginLeft: "1rem" }}
              disabled={!user.education}
            >
              <option value="">학적 상태</option>
              {user.education === "고등학교" && (
                <option value="졸업">졸업</option>
              )}
              {(user.education === "대학교2" ||
                user.education === "대학교4" ||
                user.education === "대학원") && (
                <>
                  <option value="재학">재학</option>
                  <option value="휴학">휴학</option>
                  <option value="졸업">졸업</option>
                </>
              )}
            </Select>
          </FlexRow>
            <FlexRow>
              <Label>학교명</Label>
              <Input name="school" placeholder="학교명" value={user.school} onChange={handleUserChange} required />
            </FlexRow>
            <FlexRow>
              <Label>전공</Label>
              <Input name="major" placeholder="전공명" value={user.major} onChange={handleUserChange} required />
            </FlexRow>
            <FlexRow>
              <Label>학점</Label>
              <Input name="grade" placeholder="학점" value={user.grade} onChange={handleUserChange} />
            </FlexRow>
          </Section>
          {/* --- 포트폴리오/경력사항 --- */}
          <Section>
            <SectionTitle>포트폴리오 / 경력사항</SectionTitle>
            {experiences.map((item, idx) => (
              <ExpRow key={idx}>
                <Select
                  value={item.type}
                  onChange={e => handleExpTypeChange(idx, e.target.value)}
                  required
                >
                  <option value="">유형</option>
                  <option value="개인 포트폴리오">프로젝트</option>
                  <option value="자격증">자격증</option>
                  <option value="수상 이력">수상</option>
                  <option value="부트캠프 수료 이력">부트캠프</option>
                </Select>
                <Input
                  placeholder={getPlaceholder(item.type)}
                  value={item.value}
                  onChange={e => handleExpValueChange(idx, e.target.value)}
                  required
                  disabled={!item.type} // 유형 먼저 선택해야만 입력 가능
                />
                <RemoveBtn type="button" onClick={() => handleRemoveExp(idx)}>
                  삭제
                </RemoveBtn>
              </ExpRow>
            ))}
            <AddBtn type="button" onClick={handleAddExp}>+ 항목 추가</AddBtn>
          </Section>


          {/* --- 관심 직무 --- */}
          <Section>
            <SectionTitle>관심 직무</SectionTitle>
            <DropdownCard>
              <DropdownHeader onClick={() => setJobOpen(open => !open)}>
                <span>{selectedJobs.length > 0 ? `${selectedJobs.length}개 선택됨` : "관심 직무를 선택하세요"}</span>
                <DropdownIcon open={jobOpen}>▼</DropdownIcon>
              </DropdownHeader>
              {jobOpen &&
                <DropdownBody>
                  {jobOptions.map(job => (
                    <DropdownItem key={job} selected={selectedJobs.includes(job)} onClick={() => toggleJob(job)}>
                      <input type="checkbox" checked={selectedJobs.includes(job)} readOnly />
                      <span>{job}</span>
                    </DropdownItem>
                  ))}
                </DropdownBody>
              }
              {/* 선택된 태그 (삭제 가능) */}
              {selectedJobs.length > 0 &&
                <TagWrap>
                  {selectedJobs.map(job => (
                    <Tag key={job} onClick={() => removeJob(job)}>{job} ×
                    </Tag>
                  ))}
                </TagWrap>
              }
              {/* 기타 */}
              {/* 기타 입력 + 완료 버튼 */}


              {/* 기타 입력 + 완료 버튼 */}
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                <Input
                  type="text"
                  placeholder="기타 자유롭게 작성"
                  value={customJob}
                  onChange={e => setCustomJob(e.target.value)}
                  style={{
                   
                    width: "100%",
                    border: "1px solid #ffc107" // 여기만 테두리 컬러 추가!
                  }}
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCustomJob();
                    }
                  }}
                />
                <AddJobBtn
                  type="button"
                  onClick={handleAddCustomJob}
                  disabled={!customJob.trim() || selectedJobs.includes(customJob.trim())}
                >
                  완료
                </AddJobBtn>
              </div>



            </DropdownCard>
          </Section>


          {/* --- 기술스택 (새 컨셉: 카드형/태그형) --- */}
          {/* --- 기술스택 (카드형/태그형) --- */}
          <Section>
            <SectionTitle>기술 스택</SectionTitle>
            <SkillCardWrap>
              {skillCategories.map(cat => (
                <SkillCard key={cat.title}>
                  <SkillCatTitle>{cat.title}</SkillCatTitle>
                  {!isFolded[cat.title] ? (
                    <>
                      <SkillGrid>
                        {cat.options.map(skill => (
                          <SkillTag
                            key={skill}
                            selected={selectedSkills[cat.title]?.includes(skill)}
                            onClick={() => toggleSkill(cat.title, skill)}
                          >
                            {skill}
                          </SkillTag>
                        ))}
                      </SkillGrid>
                     
                      <SkillEtcWrap>
                        <SkillInput
                          placeholder="기타 언어 입력"
                          value={selectedSkills.otherLanguage}
                          onChange={e => handleOtherSkillChange("otherLanguage", e.target.value)}
                          onKeyDown={e => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddOtherLanguage();
                            }
                          }}
                        />
                        <SkillEtcBtn
                          type="button"
                          disabled={
                            !selectedSkills.otherLanguage?.trim() ||
                            selectedSkills["언어"].includes(selectedSkills.otherLanguage.trim())
                          }
                          onClick={handleAddOtherLanguage}
                        >
                          추가
                        </SkillEtcBtn>
                      </SkillEtcWrap>

                      {/* 선택 완료 버튼만 */}
                      <SkillDoneBtn
                        type="button"
                        disabled={!selectedSkills[cat.title] || selectedSkills[cat.title].length === 0}
                        onClick={() => setIsFolded(prev => ({ ...prev, [cat.title]: true }))}
                      >
                        선택 완료
                      </SkillDoneBtn>
                    </>
                  ) : (
                    // 숙련도 선택 화면
                    <>
                      <SkillLevelWrap>
                        {(selectedSkills[cat.title] || []).map(skill => (
                          <SkillWithLevel key={skill}>
                          <LangTag>{skill}</LangTag>
                          <LevelBtns>
                            <LevelBtn
                              selected={skillLevels[cat.title]?.[skill] === "상"}
                              onClick={() => setSkillLevels(prev => ({
                                ...prev, [cat.title]: { ...prev[cat.title], [skill]: "상" }
                              }))}
                            >상</LevelBtn>
                            <LevelDivider />
                            <LevelBtn
                              selected={skillLevels[cat.title]?.[skill] === "중"}
                              onClick={() => setSkillLevels(prev => ({
                                ...prev, [cat.title]: { ...prev[cat.title], [skill]: "중" }
                              }))}
                            >중</LevelBtn>
                            <LevelDivider />
                            <LevelBtn
                              selected={skillLevels[cat.title]?.[skill] === "하"}
                              onClick={() => setSkillLevels(prev => ({
                                ...prev, [cat.title]: { ...prev[cat.title], [skill]: "하" }
                              }))}
                            >하</LevelBtn>
                          </LevelBtns>
                        </SkillWithLevel>
                        
                        ))}
                      </SkillLevelWrap>
                      <SkillEditBtnWrap>
                        <SkillEditBtn
                          type="button"
                          onClick={() => setIsFolded(prev => ({ ...prev, [cat.title]: false }))}
                        >
                          다시 선택
                        </SkillEditBtn>
                      </SkillEditBtnWrap>
                    </>
                  )}
                </SkillCard>
              ))}
            </SkillCardWrap>
          </Section>

          <SubmitBtn type="submit">회원가입 완료</SubmitBtn>
        </FormContainer>
      </MainBox>
    </Bg>
  );
}

// --------------------- 스타일 ---------------------
const Bg = styled.div`
  min-height: 100vh;
  background: #1e1e1e;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 2rem;
`;
const MainBox = styled.div`
  background:rgb(80, 79, 79);
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
`;

const NavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5px;
`;

const NavBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px 1px;
  .nav-icon {
    font-size: 1.8rem;
    color: #fff;
    transition: color 0.18s;
  }
  .nav-label {
    color: #fff;
    font-size: 1.15rem;
    font-weight: 600;
    transition: color 0.12s;
  }
  &:hover .nav-icon, &:hover .nav-label,
  &:focus .nav-icon, &:focus .nav-label {
    color: #ffc107;
  }
`;

const NavDivider = styled.span`
  height: 1.5rem;
  border-left: 1.3px solid #fff;
  margin: 0 8px;
  display: inline-block;
  content: '';
`;

const IconArea = styled.div`
  display: flex; align-items: center; gap: 0.3px;
`;

const IconWrap = styled.span`
  display: flex; align-items: center;
`;

const Header = styled.div`
  padding: 1.7rem 2.5rem 0.6rem 2.5rem;
  text-align: center;
  h1 {
    color: #ffc107; // 메인 컬러
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

IconArea.defaultProps = {
  as: 'div'
};
const DividerSpan = styled.span`
  color: #fff;
  font-size: 1.6rem;
  margin: 0 10px;
`;

const SubTitle = styled.div`
  color:rgb(172, 170, 170);
  font-size: 1.18rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const FormContainer = styled.form`
  padding: 0 2.5rem;
`;

const Section = styled.section`
  margin-bottom: 2.1rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.09rem;
  margin-bottom: 1.35rem;
  font-weight: 700;
  color: #ffc107;
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.1rem;
  gap: 1.5rem;
`;

const Label = styled.label`
  min-width: 6rem;
  font-size: 1.01rem;
  font-weight: 500;
  color: #fff;
`;


const ExpRow = styled.div`
  display: flex;
  align-items: center;  // 수직 가운데 정렬
  gap: 0.3rem;
  margin-bottom: 1.1rem;
  width: 97%;
`;


const Select = styled.select`
  flex: 0 0 150px;
  padding: 0.85rem;
  border-radius: 0.6rem;
  border: none;
  background: #222;
  color: #fff;
  font-size: 1.13rem;
  height: 48px;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.85rem 1.1rem;
  border-radius: 0.6rem;
  border: none;
  background: #222;
  color: #fff;
  font-size: 1.13rem;
  height: 48px;
  &::placeholder { color: #aaa; }
`;


const RemoveBtn = styled.button`
  margin-left: 0.6rem;
  background: #eee;
  color: #e53935;
  border: none;
  border-radius: 0.7rem;
  padding: 0.8rem 1.5rem;
  font-weight: bold;
  font-size: 1.09rem;
  cursor: pointer;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  transition: background 0.18s, color 0.13s;

  &:hover, &:focus {
    background: #e53935;
    color: #fff;
  }
`;



const AddBtn = styled.button`
  margin-bottom: 0.5rem;
  background: #f5f5f5;
  color:rgb(79, 152, 230);
  border: none;
  border-radius: 0.5rem;
  padding: 0.8rem 1.5rem;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;

  &:hover, &:focus {
    background:rgb(79, 152, 230);
    color: #f5f5f5;
  }
`;

const DropdownCard = styled.div`
  background: #232323;
  border-radius: 1.1rem;
  padding: 1rem 1.6rem 1.4rem 1.6rem;
  box-shadow: 0 2px 8px #0001;
  position: relative;
`;

const DropdownHeader = styled.div`
  font-size: 1.05rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  color: #ffc107;
  cursor: pointer;
  padding-bottom: 0.4rem;
`;

const DropdownIcon = styled.span`
  font-size: 1.15rem;
  margin-left: 0.6rem;
  transition: 0.2s;
  transform: ${({ open }) => (open ? "rotate(-180deg)" : "none")};
`;

const DropdownBody = styled.div`
  margin: 0.5rem 0 0.7rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 0.45rem;
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: ${({ selected }) => (selected ? "#ffc10722" : "transparent")};
  border-radius: 0.55rem;
  font-weight: 500;
  color: ${({ selected }) => (selected ? "#ffc107" : "#eee")};
  cursor: pointer;
  padding: 0.4rem 1.2rem 0.4rem 0.5rem;
  border: 1.5px solid ${({ selected }) => (selected ? "#ffc107" : "#2c2c2c")};
  input { accent-color: #ffc107; }
`;

const TagWrap = styled.div`
  margin-top: 0.8rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;

`;

const Tag = styled.div`
  background: #ffc107;
  color: #1e1e1e;
  border-radius: 1.2rem;
  padding: 0.32rem 0.95rem 0.32rem 0.95rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: 0.13s;
  &:hover { background: #ffd955; }
`;

const PwInfo = styled.div`
  font-size: 0.96rem;
  margin: 0 0 0.65rem 7.3rem;
  color: ${({ $match }) => $match ? "#7bed7b" : "#e55b5b"};
  font-weight: 500;
`;


// --- 기술스택 컨셉 (카드형+태그+입력) ---
const SkillCardWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const SkillCard = styled.div`
  background: #222;
  border-radius: 1rem;
  padding: 1.05rem 1.2rem 0.9rem 1.2rem;
  margin-bottom: 0.3rem;
  box-shadow: 0 2px 9px 0 #0003;
  display: flex;
  flex-direction: column;
  align-items: center;   // << 이 줄 추가!
  justify-content: center;
`;


const SkillCatTitle = styled.div`
  color: #ffc107;
  font-size: 1.08rem;
  font-weight: bold;
  margin-bottom: 0.7rem;
`;

const SkillGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.44rem;
  margin-bottom: 0.8rem;
`;

const SkillTag = styled.div`
  padding: 0.62rem 1.06rem;
  border-radius: 1.5rem;
  background: ${({ selected }) => (selected ? "#ffc107" : "#444")};
  color: ${({ selected }) => (selected ? "#232323" : "#fff")};
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  margin-bottom: 0.3rem;
  font-size: 1.01rem;
  border: none;
  transition: all 0.15s;
`;

const SkillInput = styled.input`
  padding: 0.62rem 1.2rem;
  border-radius: 1.2rem;
  border: none;
  background: #222;
  color: #fff;
  font-size: 0.98rem;
  margin-left: 0.5rem;
  margin-bottom: 0.4rem;
  width: 36%;
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
  left: 7rem;
  width: 18.3rem;
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


const AddJobBtn = styled.button`
  background: #ffc107;
  color:rgb(38, 38, 38);
  border: none;
  border-radius: 0.7rem;
  font-size: 1rem;
  font-weight: bold;
  padding: 0 1.1rem;
  cursor: pointer;
  height: 48px;
  
  &:hover {
    background:rgb(252, 211, 130);
    color:rgb(44, 44, 43);
  }
`;


const SkillWithLevel = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  justify-content: flex-start;
  margin-top: 0.9rem;
  margin-bottom: 0.1rem;
`;

const LangTag = styled.div`
  min-width: 85px;
  text-align: center;
  font-size: 1.00rem;  // 언어명 글씨 크게!
  font-weight: bold;

  color: #ffc107;
  border-radius: 1.7rem;
  padding: 0.65rem 0;
  margin-right: 1.2rem;
`;

const LevelBtns = styled.div`
  display: flex;
  align-items: center;
`;

const LevelBtn = styled.button`
  background: ${({ selected }) => (selected ? "#ffc107" : "#444")};
  color: ${({ selected }) => (selected ? "#232323" : "#fff")};
  border: none;
  border-radius: 0.33rem;
  min-width: 54px;
  min-height: 40px;
  font-size: 1.07rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.13s;
  &:hover { background: #ffc107; color: #232323; }
  // 상중하 버튼끼리 바로 붙게 마진 없음
`;

const LevelDivider = styled.div`
  width: 0.5px;
  height: 40px;
  background: #fff4;
  margin: 0 0.2rem;
  align-self: center;
  border-radius: 3px;
`;

const SkillDoneBtn = styled.button`
  
  background: rgb(83, 83, 80);
  color: #ffc107;
  border: none;
  border-radius: 0.7rem;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.8rem 1.5rem;
  cursor: pointer;
 &:hover { 
      background: #ffc107; 
      color: #232323; 
      }
`;

const SkillEditBtn = styled(SkillDoneBtn)`
  background: #444;
  color: #ffc107;
  margin-left: 1rem;
  &:hover {
    background: #ffc107;
    color: #232323;
  }
`;

const SkillEtcWrap = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  margin-bottom: 0.7rem;
  gap: 1.5rem;
`;


const SkillLevelWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  align-items: center;
  margin-bottom: 2.2rem;
`;


const SkillEditBtnWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 1.5rem;
`;


const SkillEtcBtn = styled.button`
  background: #ffc107;
  color: #1e1e1e;
  border-radius: 1.2rem;
  padding: 0.32rem 0.95rem 0.32rem 0.95rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: 0.13s;
  &:hover { background: #ffd955; }
`;
