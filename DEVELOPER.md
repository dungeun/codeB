# 개발자 메뉴얼

## 프로젝트 구조
```
├── app/
│   ├── api/            # API 라우트
│   ├── auth/           # 인증 관련 페이지
│   ├── boards/         # 게시판 페이지
│   ├── dashboard/      # 어드민 대시보드
│   ├── components/     # 공통 컴포넌트
│   │   ├── layout/     # 레이아웃 컴포넌트
│   │   └── ui/         # UI 컴포넌트
│   └── lib/           # 유틸리티 함수
├── public/            # 정적 파일
└── types/            # TypeScript 타입 정의
```

## 컴포넌트 구조

### 레이아웃
- `DashboardLayout`: 어드민 페이지 레이아웃
- `BoardLayout`: 게시판 페이지 레이아웃
- `Sidebar`: 관리자 사이드바 네비게이션

### 페이지
1. 대시보드 (`/dashboard`)
   - 사용자 통계
   - 게시물 통계
   - 실시간 모니터링

2. 회원 관리 (`/dashboard/users`)
   - 회원 목록 표시
   - 검색 및 필터링
   - 회원 상세 정보 슬라이드 오버

3. 게시판 관리 (`/dashboard/posts`)
   - 게시판 목록
   - 게시판 타입 관리
   - 게시물 통계

4. 게시판 (`/boards/[boardUrl]`)
   - 게시글 목록
   - 검색 기능
   - 페이지네이션

5. 게시글 작성 (`/boards/[boardUrl]/write`)
   - React-Quill 에디터 통합
   - 이미지 업로드
   - 임시 저장

## 상태 관리
- React Hooks를 사용한 로컬 상태 관리
- Context API를 통한 전역 상태 관리

## 인증 시스템
- Next-Auth 설정
```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

## API 구조
1. 인증 API
   - POST /api/auth/login
   - POST /api/auth/register
   - GET /api/auth/me

2. 사용자 API
   - GET /api/users
   - GET /api/users/:id
   - PATCH /api/users/:id
   - DELETE /api/users/:id

3. 게시판 API
   - GET /api/boards
   - POST /api/boards
   - GET /api/boards/:boardUrl/posts
   - POST /api/boards/:boardUrl/posts

## 데이터베이스 스키마
```sql
-- 사용자 테이블
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  role VARCHAR(20),
  status VARCHAR(20),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- 게시판 테이블
CREATE TABLE boards (
  id VARCHAR(255) PRIMARY KEY,
  url VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  type VARCHAR(50),
  created_at TIMESTAMP
);

-- 게시글 테이블
CREATE TABLE posts (
  id VARCHAR(255) PRIMARY KEY,
  board_id VARCHAR(255),
  title VARCHAR(255),
  content TEXT,
  author_id VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (board_id) REFERENCES boards(id),
  FOREIGN KEY (author_id) REFERENCES users(id)
);
```

## 배포 가이드
1. 환경 변수 설정
2. 데이터베이스 마이그레이션
3. 빌드 및 배포
```bash
# 프로덕션 빌드
npm run build

# 프로덕션 실행
npm start
```

## 테스트
```bash
# 단위 테스트 실행
npm run test

# E2E 테스트 실행
npm run test:e2e
```

## 코딩 컨벤션
- ESLint 설정 준수
- Prettier를 통한 코드 포맷팅
- 컴포넌트 네이밍: PascalCase
- 함수 네이밍: camelCase
- 상수: UPPER_SNAKE_CASE

## Git 워크플로우
1. Feature 브랜치 생성
2. 개발 및 커밋
3. Pull Request 생성
4. 코드 리뷰
5. main 브랜치에 머지

## 성능 최적화
- 이미지 최적화
- 코드 스플리팅
- SSR/SSG 활용
- 캐싱 전략

## 보안
- CSRF 토큰 사용
- XSS 방지
- 입력값 검증
- 권한 검사 