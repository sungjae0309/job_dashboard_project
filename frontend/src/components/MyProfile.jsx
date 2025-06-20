import React, { useState, useEffect } from "react";

import Sidebar from "./Sidebar";
import axios from "axios";
import { FiEdit2, FiCheck, FiX, FiPlus, FiTrash2 } from "react-icons/fi";
import styled from "styled-components";


// 임시 데이터
const initialProfile = {
  name: "",
  email: "",
  phone: "",
  birth: "",
  education: {
    level: "",
    status: "",
    school: "",
    major: "",
    grade: "",
  },
  experiences: [
    { type: "", value: "" },
    { type: "", value: "" },
  ],
  jobs: ["", ""],
  skills: {
    언어: [{ name: "", level: "" }],
    프레임워크: [{ name: "", level: "" }],
    협업툴: [{ name: "", level: "" }],
  },
};

export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profile, setProfile] = useState(initialProfile);

  // 수정중인 영역: 'info' | 'education' | 'exp' | 'job' | 'skill' | null
  const [editing, setEditing] = useState(null);
  // 임시 수정 값
  const [draft, setDraft] = useState({});

  // ===== FastAPI 연동 =====
  useEffect(() => {
    // 최초 렌더링 시 프로필 불러오기
    axios.get("http://192.168.101.36:8000/api/profile")
      .then(res => setProfile(res.data))
      .catch(() => setProfile(initialProfile));
  }, []);

  // ===== 공통 =====
  const handleEdit = (section) => {
    setEditing(section);
    setDraft(JSON.parse(JSON.stringify(profile)));
  };
  const handleSave = async () => {
    try {
      // FastAPI로 저장
      await axios.put("http://192.168.101.36:8000/api/profile", draft);
      setProfile(draft);
      setEditing(null);
    } catch (e) {
      alert("저장 실패! (서버 연결 또는 권한 오류)");
    }
  };
  const handleCancel = () => setEditing(null);

  // ===== 회원정보/학력 =====
  const handleChange = (section, value) => {
    setDraft((draft) => ({
      ...draft,
      ...(section === "education"
        ? { education: { ...draft.education, ...value } }
        : { [section]: value }),
    }));
  };
  const handleInfoChange = (e) =>
    setDraft({ ...draft, [e.target.name]: e.target.value });

  // ===== 경력/포트폴리오 =====
  const handleExpChange = (idx, key, value) => {
    const exps = [...draft.experiences];
    exps[idx][key] = value;
    setDraft((d) => ({ ...d, experiences: exps }));
  };
  const handleAddExp = () => {
    setDraft((d) => ({
      ...d,
      experiences: [...d.experiences, { type: "", value: "" }],
    }));
  };
  const handleRemoveExp = (idx) => {
    setDraft((d) => ({
      ...d,
      experiences: d.experiences.filter((_, i) => i !== idx),
    }));
  };

  // ===== 관심 직무 =====
  const [jobInput, setJobInput] = useState("");
  const handleJobInput = (e) => setJobInput(e.target.value);
  const handleAddJob = () => {
    if (jobInput.trim() && !draft.jobs.includes(jobInput.trim())) {
      setDraft((d) => ({
        ...d,
        jobs: [...d.jobs, jobInput.trim()],
      }));
      setJobInput("");
    }
  };
  const handleRemoveJob = (idx) => {
    setDraft((d) => ({
      ...d,
      jobs: d.jobs.filter((_, i) => i !== idx),
    }));
  };

  // ===== 기술스택 =====
  const skillCategories = [
    { key: "언어", label: "언어" },
    { key: "프레임워크", label: "프레임워크" },
    { key: "협업툴", label: "협업툴" },
  ];

  // 각 스킬 추가/삭제/수정
  const [skillInput, setSkillInput] = useState({ cat: "언어", name: "", level: "상" });
  const handleSkillInput = (cat, key, value) => {
    setSkillInput((prev) => ({
      ...prev,
      cat,
      [key]: value,
    }));
  };
  const handleAddSkill = () => {
    const { cat, name, level } = skillInput;
    if (
      name.trim() &&
      !draft.skills[cat].some((s) => s.name === name.trim())
    ) {
      setDraft((d) => ({
        ...d,
        skills: {
          ...d.skills,
          [cat]: [...d.skills[cat], { name: name.trim(), level }],
        },
      }));
      setSkillInput({ cat, name: "", level: "상" });
    }
  };
  const handleRemoveSkill = (cat, idx) => {
    setDraft((d) => ({
      ...d,
      skills: {
        ...d.skills,
        [cat]: d.skills[cat].filter((_, i) => i !== idx),
      },
    }));
  };
  const handleSkillLevelChange = (cat, idx, level) => {
    const arr = [...draft.skills[cat]];
    arr[idx].level = level;
    setDraft((d) => ({
      ...d,
      skills: {
        ...d.skills,
        [cat]: arr,
      },
    }));
  };

  return (
    <ProfileBg>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <MainBox sidebarOpen={sidebarOpen}>
        <PageTitle>내 프로필</PageTitle>
        <ProfileCard>
          {/* ===== 회원정보 ===== */}
          <SectionHeader>
            <SectionTitle>회원 정보</SectionTitle>
            <EditBtn onClick={() => handleEdit("info")}>
              <FiEdit2 />
            </EditBtn>
          </SectionHeader>
          {editing === "info" ? (
            <EditGrid>
              <Field>
                <Label>닉네임</Label>
                <Input name="name" value={draft.name} onChange={handleInfoChange} />
              </Field>
              <Field>
                <Label>이메일</Label>
                <Input name="email" value={draft.email} onChange={handleInfoChange} />
              </Field>
              <Field>
                <Label>휴대폰번호</Label>
                <Input name="phone" value={draft.phone} onChange={handleInfoChange} />
              </Field>
              <Field>
                <Label>생년월일</Label>
                <Input name="birth" value={draft.birth} onChange={handleInfoChange} />
              </Field>
              <SaveBtn onClick={handleSave}><FiCheck /> 저장</SaveBtn>
              <CancelBtn onClick={handleCancel}><FiX /> 취소</CancelBtn>
            </EditGrid>
          ) : (
            <InfoGrid>
              <Field><Label>닉네임</Label><span>{profile.name}</span></Field>
              <Field><Label>이메일</Label><span>{profile.email}</span></Field>
              <Field><Label>휴대폰번호</Label><span>{profile.phone}</span></Field>
              <Field><Label>생년월일</Label><span>{profile.birth}</span></Field>
            </InfoGrid>
          )}

          {/* ===== 학력 ===== */}
          <SectionHeader>
            <SectionTitle>최종 학력</SectionTitle>
            <EditBtn onClick={() => handleEdit("education")}>
              <FiEdit2 />
            </EditBtn>
          </SectionHeader>
          {editing === "education" ? (
            <EditGrid>
              <Field>
                <Label>학력</Label>
                <Input
                  value={draft.education.level}
                  onChange={e => handleChange("education", { level: e.target.value })}
                />
                <Label>상태</Label>
                <Input
                  value={draft.education.status}
                  onChange={e => handleChange("education", { status: e.target.value })}
                />
              </Field>
              <Field>
                <Label>학교명</Label>
                <Input
                  value={draft.education.school}
                  onChange={e => handleChange("education", { school: e.target.value })}
                />
              </Field>
              <Field>
                <Label>전공</Label>
                <Input
                  value={draft.education.major}
                  onChange={e => handleChange("education", { major: e.target.value })}
                />
              </Field>
              <Field>
                <Label>학점</Label>
                <Input
                  value={draft.education.grade}
                  onChange={e => handleChange("education", { grade: e.target.value })}
                />
              </Field>
              <SaveBtn onClick={handleSave}><FiCheck /> 저장</SaveBtn>
              <CancelBtn onClick={handleCancel}><FiX /> 취소</CancelBtn>
            </EditGrid>
          ) : (
            <InfoGrid>
              <Field>
                <Label>학력</Label>
                <span>
                  {profile.education.level} ({profile.education.status})
                </span>
              </Field>
              <Field>
                <Label>학교명</Label>
                <span>{profile.education.school}</span>
              </Field>
              <Field>
                <Label>전공</Label>
                <span>{profile.education.major}</span>
              </Field>
              <Field>
                <Label>학점</Label>
                <span>{profile.education.grade}</span>
              </Field>
            </InfoGrid>
          )}

          {/* ===== 포트폴리오/경력 ===== */}
          <SectionHeader>
            <SectionTitle>포트폴리오 / 경력</SectionTitle>
            <EditBtn onClick={() => handleEdit("exp")}>
              <FiEdit2 />
            </EditBtn>
          </SectionHeader>
          {editing === "exp" ? (
            <RowChips style={{ flexDirection: "column" }}>
              {draft.experiences.map((exp, idx) => (
                <EditChipRow key={idx}>
                  <ExpTypeInput
                    value={exp.type}
                    onChange={e => handleExpChange(idx, "type", e.target.value)}
                    placeholder="유형(프로젝트, 자격증 등)"
                  />
                  <ExpValueInput
                    value={exp.value}
                    onChange={e => handleExpChange(idx, "value", e.target.value)}
                    placeholder="내용"
                  />
                  <RemoveChipBtn onClick={() => handleRemoveExp(idx)}>
                    <FiTrash2 />
                  </RemoveChipBtn>
                </EditChipRow>
              ))}
              <AddChipBtn onClick={handleAddExp}><FiPlus /> 추가</AddChipBtn>
              <SaveBtn onClick={handleSave}><FiCheck /> 저장</SaveBtn>
              <CancelBtn onClick={handleCancel}><FiX /> 취소</CancelBtn>
            </RowChips>
          ) : (
            <RowChips>
              {profile.experiences.map((exp, i) => (
                <Chip key={i}>
                  {exp.type} - {exp.value}
                </Chip>
              ))}
            </RowChips>
          )}

          {/* ===== 관심 직무 ===== */}
          <SectionHeader>
            <SectionTitle>관심 직무</SectionTitle>
            <EditBtn onClick={() => handleEdit("job")}>
              <FiEdit2 />
            </EditBtn>
          </SectionHeader>
          {editing === "job" ? (
            <RowChips>
              {draft.jobs.map((job, idx) => (
                <EditChip key={idx}>
                  {job}
                  <RemoveChipBtn onClick={() => handleRemoveJob(idx)}>
                    <FiX />
                  </RemoveChipBtn>
                </EditChip>
              ))}
              <JobInput
                type="text"
                placeholder="관심 직무 추가"
                value={jobInput}
                onChange={handleJobInput}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddJob();
                  }
                }}
              />
              <AddChipBtn onClick={handleAddJob}><FiPlus /></AddChipBtn>
              <SaveBtn onClick={handleSave}><FiCheck /> 저장</SaveBtn>
              <CancelBtn onClick={handleCancel}><FiX /> 취소</CancelBtn>
            </RowChips>
          ) : (
            <RowChips>
              {profile.jobs.map((job, i) => (
                <Chip key={i}>{job}</Chip>
              ))}
            </RowChips>
          )}

          {/* ===== 기술 스택 ===== */}
          <SectionHeader>
            <SectionTitle>기술 스택</SectionTitle>
            <EditBtn onClick={() => handleEdit("skill")}>
              <FiEdit2 />
            </EditBtn>
          </SectionHeader>
          {editing === "skill" ? (
            <>
              {skillCategories.map(cat => (
                <RowChips key={cat.key} style={{ marginBottom: "0.5rem" }}>
                  <SkillCat>{cat.label}</SkillCat>
                  {draft.skills[cat.key].map((s, idx) => (
                    <EditChip key={idx}>
                      {s.name} (
                      <SkillLevelSelect
                        value={s.level}
                        onChange={e => handleSkillLevelChange(cat.key, idx, e.target.value)}
                      >
                        <option value="상">상</option>
                        <option value="중">중</option>
                        <option value="하">하</option>
                      </SkillLevelSelect>
                      )
                      <RemoveChipBtn onClick={() => handleRemoveSkill(cat.key, idx)}>
                        <FiX />
                      </RemoveChipBtn>
                    </EditChip>
                  ))}
                  <SkillInput
                    placeholder={`${cat.label}명 추가`}
                    value={skillInput.cat === cat.key ? skillInput.name : ""}
                    onChange={e =>
                      handleSkillInput(cat.key, "name", e.target.value)
                    }
                    onFocus={() => setSkillInput(i => ({ ...i, cat: cat.key }))}
                    onKeyDown={e => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                  />
                  <SkillLevelSelect
                    value={skillInput.cat === cat.key ? skillInput.level : "상"}
                    onChange={e =>
                      handleSkillInput(cat.key, "level", e.target.value)
                    }
                  >
                    <option value="상">상</option>
                    <option value="중">중</option>
                    <option value="하">하</option>
                  </SkillLevelSelect>
                  <AddChipBtn onClick={handleAddSkill}><FiPlus /></AddChipBtn>
                </RowChips>
              ))}
              <SaveBtn onClick={handleSave}><FiCheck /> 저장</SaveBtn>
              <CancelBtn onClick={handleCancel}><FiX /> 취소</CancelBtn>
            </>
          ) : (
            <>
              {skillCategories.map(cat => (
                <RowChips key={cat.key}>
                  <SkillCat>{cat.label}</SkillCat>
                  {profile.skills[cat.key].map((s, idx) => (
                    <Chip key={idx}>
                      {s.name} ({s.level})
                    </Chip>
                  ))}
                </RowChips>
              ))}
            </>
          )}
        </ProfileCard>
      </MainBox>
    </ProfileBg>
  );
}

// --- 여기에 스타일 컴포넌트 정의가 이어집니다. (원본 코드대로) ---


// ===== 스타일 =====
const sidebarWidth = 260;
const sidebarCollapsedWidth = 65;

const ProfileBg = styled.div`
  display: flex;
  min-height: 100vh;
  background: #191919;
`;

const MainBox = styled.div`
  flex: 1;
  padding: 3.2rem 0 2.5rem ${({ sidebarOpen }) => sidebarOpen ? `${sidebarWidth + 32}px` : `${sidebarCollapsedWidth + 32}px`};
  transition: padding-left 0.3s cubic-bezier(.4,0,.2,1);
  min-width: 0;
`;

const PageTitle = styled.h1`
  color: #ffc107;
  font-size: 2.1rem;
  font-weight: bold;
  margin-bottom: 2.2rem;
`;

const ProfileCard = styled.section`
  background: #232323;
  border-radius: 1.5rem;
  box-shadow: 0 6px 32px 0 #0005;
  padding: 2.8rem 2.7rem 2.7rem 2.7rem;
  color: #fff;
  margin-bottom: 1.1rem;
  display: flex;
  flex-direction: column;
  min-width: 380px;
  max-width: 820px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin: 2rem 0 1rem 0;
`;

const SectionTitle = styled.h2`
  color: #ffc107;
  font-size: 1.17rem;
  font-weight: 700;
  letter-spacing: 0.01em;
`;

const EditBtn = styled.button`
  background: none;
  border: none;
  color: #ffc107;
  cursor: pointer;
  font-size: 1.25rem;
  margin-left: 0.5rem;
  &:hover { color: #fff; }
`;

const InfoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem 2.5rem;
  margin-bottom: 0.7rem;
`;

const EditGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem 2.5rem;
  align-items: flex-end;
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  min-width: 260px;
  gap: 0.7rem;
  font-size: 1.07rem;
  margin-bottom: 0.25rem;
  span { color: #fff; }
`;


const Input = styled.input`
  padding: 0.63rem 1.12rem;
  border-radius: 0.7rem;
  border: none;
  background: #161616;
  color: #fff;
  font-size: 1.08rem;
  margin-bottom: 0;
  &::placeholder { color: #888; }
  box-shadow: 0 1px 3px #0002;
`;

const SaveBtn = styled.button`
  background: #ffc107;
  color: #232323;
  border: none;
  border-radius: 0.7rem;
  font-size: 1rem;
  font-weight: bold;
  margin-left: 1.6rem;
  padding: 0.85rem 2.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  &:hover { background: #ffd955; }
`;

const CancelBtn = styled(SaveBtn)`
  background: #484848;
  color: #fff;
  margin-left: 0.5rem;
  &:hover { background: #bdbdbd; color: #232323; }
`;

const Row = styled.div`
  display: flex;
  gap: 2.5rem;
  margin-bottom: 0.6rem;
  align-items: baseline;
`;

const Label = styled.div`
  color: #bdbdbd;
  min-width: 105px;
  font-size: 1.07rem;
  font-weight: 700;
`;

const Value = styled.div`
  color: #fff;
  font-size: 1.13rem;
  font-weight: 500;
  word-break: break-all;
`;
const RowChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-bottom: 1.2rem;
  align-items: center;
`;

const Chip = styled.div`
  background: #232323;
  color: #fff;
  border: 1.2px solid #444;
  border-radius: 1.5rem;
  padding: 0.62rem 1.13rem;
  font-size: 1.03rem;
  font-weight: 500;
  margin-bottom: 0.2rem;
  display: inline-flex;
  align-items: center;
  min-width: 0;
`;

const EditChip = styled(Chip)`
  gap: 0.7rem;
`;

const EditChipRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.7rem;
`;

const ExpTypeInput = styled(Input)`
  width: 110px;
  font-size: 0.97rem;
  padding: 0.5rem 0.7rem;
`;
const ExpValueInput = styled(Input)`
  width: 210px;
  font-size: 0.97rem;
  padding: 0.5rem 0.7rem;
`;

const AddChipBtn = styled.button`
  background: #ffc107;
  color: #232323;
  border: none;
  border-radius: 2rem;
  font-size: 1.09rem;
  font-weight: bold;
  padding: 0.46rem 1.25rem;
  margin-left: 0.35rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  &:hover { background: #ffd955; }
`;

const RemoveChipBtn = styled.button`
  background: #ef5350;
  color: #fff;
  border: none;
  border-radius: 1.3rem;
  font-size: 1rem;
  padding: 0.3rem 0.7rem;
  margin-left: 0.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover { background: #b71c1c; }
`;

const JobInput = styled(Input)`
  width: 170px;
  margin-bottom: 0;
`;

const SkillCat = styled.div`
  color: #ffc107;
  font-weight: bold;
  font-size: 1.03rem;
  margin-right: 0.6rem;
`;

const SkillInput = styled(Input)`
  width: 105px;
  font-size: 0.99rem;
  padding: 0.45rem 0.7rem;
`;

const SkillLevelSelect = styled.select`
  background: #161616;
  color: #ffc107;
  font-size: 1.01rem;
  border-radius: 0.7rem;
  border: none;
  margin: 0 0.2rem 0 0.35rem;
  padding: 0.4rem 0.7rem;
`;

export {};
