# 프로젝트 개요

## 🎯 목표
- Next.js + TypeScript + Tailwind CSS 기반 웹 애플리케이션 개발
- Firebase 기반의 서버리스 아키텍처 구현
- TailAdmin 템플릿 기반 관리자/사용자 페이지 구현
: TailAdmin (free-nextjs-admin-dashboard)




## 🔧 기술 스택
- **프론트엔드**:
  - Next.js 14
  - TypeScript
  - Tailwind CSS
  - TailAdmin 템플릿
  - React Query
  - Zustand (상태관리)

- **백엔드**:
  - Firebase
    - Authentication
    - Firestore
    - Storage
    - Functions
    - Hosting


## 🚀 주요 기능

### 1. 사용자 인증
- Firebase Authentication 연동
- 구글, 카카오 소셜 로그인 연동
- Next.js Middleware를 활용한 인증 처리

### 2. 회원 등급 시스템
- 사용자 활동 또는 관리자 설정에 따른 등급 분류
  - 일반, 우수, VIP, 관리자 등
- 커스텀 미들웨어로 권한 관리

### 3. 푸시 알림
- Firebase Cloud Messaging 연동
- 타겟 사용자 대상 정보 알림 발송
  - 전체 사용자
  - 특정 그룹
  - 개인

### 4. 실시간 채팅
- Firebase Realtime Database 연동
- 사용자 간 또는 사용자-관리자 간 1:1 채팅
- 그룹 채팅 기능

### 5. 게시판
- Next.js API Routes를 활용한 CRUD 구현
- 주제별 게시판 생성
- 게시글 및 댓글 관리

### 6. 관리자 기능

#### 6.1 회원 관리
- 회원 목록
- 회원 정보 수정
- 회원 등급 변경
- 회원 상태 관리

#### 6.2 메뉴 관리 (게시판 관리)
- 게시판 CRUD
- 게시판 노출 순서 변경
- 게시판별 접근 권한 설정

#### 6.3 콘텐츠 관리
- 게시글 관리
- 댓글 관리
- 신고 관리

#### 6.4 광고/프로모션 관리
- 배너 이미지 관리
- 공지사항 관리
- 이벤트 팝업 관리

#### 6.5 푸시 알림 관리
- 푸시 메시지 발송
- 발송 대상 설정
- 발송 이력 관리

## 📅 개발 계획

### 1단계: 웹 개발 (Next.js)
1. 프로젝트 초기 설정
   - Next.js 프로젝트 생성
   - Firebase 연동
   - 기본 레이아웃 설정

2. 인증 시스템 구현
   - Firebase Authentication 설정
   - 소셜 로그인 연동
   - 권한 관리 시스템 구현

3. 관리자 기능 개발
   - 회원 관리
   - 게시판 관리
   - 콘텐츠 관리
   - 알림 관리

4. 일반 사용자 기능 개발
   - 게시판 기능
   - 실시간 채팅
   - 프로필 관리
