# Next.js 게시판 & 어드민 시스템 v1.0

## 소개
Next.js 14를 기반으로 한 현대적인 게시판 및 어드민 시스템입니다. 반응형 디자인과 사용자 친화적인 인터페이스를 제공합니다.

## 주요 기능
- 📊 대시보드
  - 사용자 통계
  - 게시물 통계
  - 실시간 모니터링
- 👥 회원 관리
  - 회원 목록 조회/검색
  - 회원 상태 관리
  - 회원 정보 수정
- 📝 게시판 관리
  - 다중 게시판 지원
  - 게시글 CRUD
  - 댓글 시스템
  - 좋아요 기능
- 🔐 인증 시스템
  - Next-Auth 기반 인증
  - 소셜 로그인 지원
  - 권한 관리

## 시작하기

### 요구사항
- Node.js 18.0.0 이상
- npm 또는 yarn
- MySQL/PostgreSQL (선택)

### 설치
```bash
# 저장소 클론
git clone [repository-url]

# 종속성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 환경 설정
1. `.env.local` 파일 생성:
```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=your-database-url
```

## 사용자 가이드

### 1. 로그인
- `/auth/login` 페이지에서 로그인
- 이메일/비밀번호 또는 소셜 로그인 사용 가능

### 2. 대시보드
- `/dashboard` 에서 전체 시스템 현황 확인
- 좌측 사이드바를 통해 각 기능 접근

### 3. 게시판 사용
- `/boards/[boardUrl]` 에서 게시판 목록 확인
- 글쓰기, 댓글, 좋아요 기능 사용
- 게시글 검색 및 필터링

### 4. 회원 관리
- `/dashboard/users` 에서 회원 목록 확인
- 회원 검색 및 상태 변경
- 상세 정보 조회 및 수정

## 기술 스택
- Frontend: Next.js 14, React, TailwindCSS
- UI Components: Headless UI
- Editor: React-Quill
- Authentication: Next-Auth
- State Management: React Hooks
- Styling: TailwindCSS, Heroicons 