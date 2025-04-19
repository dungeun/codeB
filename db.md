# 데이터베이스 설계

## 1. 컬렉션 구조

### Users (사용자)
```typescript
{
  uid: string;              // Firebase Auth UID
  email: string;            // 이메일
  nickname: string;         // 닉네임
  profileImage?: string;    // 프로필 이미지 URL
  role: 'user' | 'admin';   // 역할
  
  // 레벨 시스템
  level: number;           // 회원 레벨 (1~10)
  exp: number;             // 경험치
  nextLevelExp: number;    // 다음 레벨까지 필요한 경험치
  dailyExp: number;        // 일일 획득 경험치
  lastExpDate: timestamp;  // 마지막 경험치 획득일
  
  // 소셜 로그인 정보
  provider: 'email' | 'google' | 'kakao';  // 로그인 제공자
  socialId?: string;       // 소셜 플랫폼의 고유 ID
  socialProfile?: {        // 소셜 프로필 정보
    name?: string;
    email?: string;
    profileUrl?: string;
  };

  createdAt: timestamp;     // 가입일
  updatedAt: timestamp;     // 정보 수정일
  lastLoginAt: timestamp;   // 마지막 로그인 시간
  status: 'active' | 'suspended' | 'banned';  // 계정 상태
  pushEnabled: boolean;     // 푸시 알림 동의 여부
}
```

### Menus (사이트 메뉴)
```typescript
{
  id: string;             // 메뉴 ID
  name: string;           // 메뉴명
  description?: string;   // 메뉴 설명
  slug: string;          // URL 슬러그 (예: community, notice)
  icon?: string;         // 메뉴 아이콘
  order: number;         // 노출 순서
  isActive: boolean;     // 활성화 여부
  accessLevel: number;   // 접근 가능 레벨
  parentId?: string;     // 상위 메뉴 ID (최상위 메뉴는 null)
  type: 'menu' | 'board' | 'link';  // 메뉴 타입
  link?: string;         // 외부 링크 (type이 'link'인 경우)
  createdBy: string;     // 생성자 ID
  updatedBy: string;     // 수정자 ID
  createdAt: timestamp;  // 생성일
  updatedAt: timestamp;  // 수정일
}
```

### Boards (게시판)
```typescript
{
  id: string;             // 게시판 ID
  menuId: string;         // 연결된 메뉴 ID
  name: string;           // 게시판명
  description?: string;   // 게시판 설명
  slug: string;          // URL 슬러그 (예: free, notice)
  
  // 게시판 설정
  settings: {
    allowComment: boolean;     // 댓글 허용
    allowAnonymous: boolean;   // 익명 허용
    allowFiles: boolean;       // 파일 첨부 허용
    allowImages: boolean;      // 이미지 첨부 허용
    useCategory: boolean;      // 카테고리 사용
    useTag: boolean;          // 태그 사용
    postPerPage: number;      // 페이지당 게시글 수
    editorType: 'basic' | 'markdown' | 'wysiwyg';  // 에디터 종류
  };

  // 권한 설정
  permissions: {
    read: number;         // 읽기 권한 (레벨)
    write: number;        // 쓰기 권한 (레벨)
    comment: number;      // 댓글 권한 (레벨)
    upload: number;       // 업로드 권한 (레벨)
  };

  isActive: boolean;      // 활성화 여부
  createdBy: string;      // 생성자 ID
  updatedBy: string;      // 수정자 ID
  createdAt: timestamp;   // 생성일
  updatedAt: timestamp;   // 수정일
}
```

### BoardCategories (게시판 카테고리)
```typescript
{
  id: string;             // 카테고리 ID
  boardId: string;        // 게시판 ID
  name: string;           // 카테고리명
  description?: string;   // 카테고리 설명
  slug: string;          // URL 슬러그
  order: number;         // 노출 순서
  isActive: boolean;     // 활성화 여부
  createdAt: timestamp;  // 생성일
  updatedAt: timestamp;  // 수정일
}
```

### Posts (게시글)
```typescript
{
  id: string;             // 게시글 ID
  boardId: string;        // 게시판 ID
  categoryId?: string;    // 카테고리 ID
  authorId: string;       // 작성자 ID
  
  title: string;          // 제목
  content: string;        // 내용
  excerpt?: string;       // 발췌문 (미리보기)
  
  slug: string;          // URL 슬러그 (SEO 최적화)
  tags?: string[];       // 태그 목록
  
  // 첨부 파일
  attachments?: {
    files: Array<{
      id: string;
      name: string;
      url: string;
      size: number;
      type: string;
    }>;
    images: Array<{
      id: string;
      url: string;
      thumbnail?: string;
    }>;
  };

  // 통계
  stats: {
    viewCount: number;    // 조회수
    likeCount: number;    // 좋아요 수
    commentCount: number; // 댓글 수
    shareCount: number;   // 공유 수
  };

  isNotice: boolean;      // 공지사항 여부
  isPrivate: boolean;     // 비공개 여부
  password?: string;      // 비밀번호 (비공개글)
  
  status: 'draft' | 'published' | 'deleted';  // 게시글 상태
  publishedAt?: timestamp; // 발행일
  createdAt: timestamp;   // 작성일
  updatedAt: timestamp;   // 수정일

  // 관리 정보
  managementInfo?: {
    isLocked: boolean;     // 게시글 잠금 여부
    lockedReason?: string; // 잠금 사유
    movedFrom?: {         // 이동 전 정보
      boardId: string;
      categoryId?: string;
      movedAt: timestamp;
      movedBy: string;    // 이동한 관리자 ID
    };
    deletedInfo?: {
      deletedAt: timestamp;
      deletedBy: string;    // 삭제한 관리자 ID
      reason?: string;      // 삭제 사유
      scheduledPurgeAt: timestamp;  // 완전 삭제 예정일 (삭제일 + 3개월)
      isTemporary: boolean; // 임시 삭제 여부
    };
    history: Array<{      // 관리 이력
      action: 'move' | 'lock' | 'unlock' | 'delete' | 'restore';
      performedAt: timestamp;
      performedBy: string;
      description: string;
      previousState?: any; // 이전 상태 정보
    }>;
  };

  // 접근 정보
  accessInfo: {
    createdIp: string;     // 작성 IP
    lastModifiedIp: string; // 최종 수정 IP
    accessLog: Array<{     // 접근 기록
      ip: string;
      timestamp: timestamp;
      action: 'view' | 'edit' | 'delete' | 'report';
    }>;
  };
}
```

### Comments (댓글)
```typescript
{
  id: string;             // 댓글 ID
  postId: string;         // 게시글 ID (참조)
  authorId: string;       // 작성자 ID (참조)
  parentId?: string;      // 부모 댓글 ID (대댓글용)
  content: string;        // 내용
  likeCount: number;      // 좋아요 수
  status: 'active' | 'deleted';  // 댓글 상태
  createdAt: timestamp;   // 작성일
  updatedAt: timestamp;   // 수정일
}
```

### ChatRooms (채팅방)
```typescript
{
  id: string;             // 채팅방 ID
  type: 'private' | 'group';  // 채팅방 타입
  participants: string[]; // 참여자 ID 배열
  lastMessage: {         // 마지막 메시지 정보
    content: string;
    senderId: string;
    sentAt: timestamp;
  };
  createdAt: timestamp;   // 생성일
}
```

### Messages (채팅 메시지)
```typescript
{
  id: string;             // 메시지 ID
  roomId: string;         // 채팅방 ID (참조)
  senderId: string;       // 발신자 ID (참조)
  content: string;        // 메시지 내용
  type: 'text' | 'image' | 'file';  // 메시지 타입
  readBy: string[];      // 읽은 사용자 ID 배열
  createdAt: timestamp;   // 발송 시간
}
```

### Notifications (알림)
```typescript
{
  id: string;             // 알림 ID
  type: 'all' | 'group' | 'individual';  // 알림 타입
  title: string;          // 알림 제목
  content: string;        // 알림 내용
  targetUsers: string[];  // 수신자 ID 배열
  status: 'pending' | 'sent' | 'failed';  // 발송 상태
  createdAt: timestamp;   // 생성일
  scheduledAt?: timestamp; // 예약 발송 시간
}
```

### ExpLogs (경험치 로그)
```typescript
{
  id: string;             // 로그 ID
  userId: string;         // 사용자 ID
  type: 'post' | 'comment' | 'like' | 'attendance' | 'chat';  // 활동 유형
  amount: number;         // 획득 경험치
  description: string;    // 활동 설명
  createdAt: timestamp;   // 획득 시간
}
```

### ExpPolicies (경험치 정책)
```typescript
{
  id: string;             // 정책 ID
  type: 'post' | 'comment' | 'like' | 'attendance' | 'chat';  // 활동 유형
  action: string;         // 세부 활동 (create, delete, receive 등)
  amount: number;         // 경험치 양
  description: string;    // 설명
  isActive: boolean;      // 활성화 여부
  dailyLimit?: number;    // 일일 제한 (선택)
  weeklyLimit?: number;   // 주간 제한 (선택)
  monthlyLimit?: number;  // 월간 제한 (선택)
  updatedBy: string;      // 수정한 관리자 ID
  createdAt: timestamp;   // 생성일
  updatedAt: timestamp;   // 수정일
}
```

### LevelThresholds (레벨 임계값)
```typescript
{
  id: string;             // 레벨 ID
  level: number;          // 레벨 (1-10)
  expRequired: number;    // 필요 경험치
  description: string;    // 레벨 설명
  benefits?: string[];    // 레벨 혜택
  updatedBy: string;      // 수정한 관리자 ID
  createdAt: timestamp;   // 생성일
  updatedAt: timestamp;   // 수정일
}
```

### BoardPermissions (게시판 권한)
```typescript
{
  id: string;             // 권한 ID
  boardId: string;        // 게시판 ID
  
  // 기본 권한 (레벨 기반)
  defaultPermissions: {
    read: number;         // 읽기 최소 레벨
    write: number;        // 쓰기 최소 레벨
    comment: number;      // 댓글 최소 레벨
    upload: number;       // 업로드 최소 레벨
  };

  // 특별 권한 (특정 사용자/그룹)
  specialPermissions: Array<{
    targetType: 'user' | 'group';
    targetId: string;     // 사용자 ID 또는 그룹 ID
    permissions: {
      read: boolean;
      write: boolean;
      comment: boolean;
      upload: boolean;
    };
  }>;

  // 게시판 관리자
  moderators: Array<{
    userId: string;       // 관리자 ID
    permissions: {
      managePost: boolean;    // 게시글 관리
      manageComment: boolean; // 댓글 관리
      manageUser: boolean;    // 사용자 관리
      manageSetting: boolean; // 설정 관리
    };
    assignedAt: timestamp;
    assignedBy: string;
  }>;

  createdAt: timestamp;   // 생성일
  updatedAt: timestamp;   // 수정일
}
```

### PostModerationLogs (게시글 관리 로그)
```typescript
{
  id: string;             // 로그 ID
  postId: string;         // 게시글 ID
  action: 'move' | 'lock' | 'unlock' | 'delete' | 'restore';  // 관리 작업
  
  // 이동 관련 정보
  moveInfo?: {
    fromBoardId: string;
    toBoardId: string;
    fromCategoryId?: string;
    toCategoryId?: string;
  };

  // 잠금 관련 정보
  lockInfo?: {
    reason: string;
    duration?: number;    // 잠금 기간 (일)
  };

  // 삭제 관련 정보
  deleteInfo?: {
    reason: string;
    isTemporary: boolean; // 임시 삭제 여부
  };

  performedBy: string;    // 수행한 관리자 ID
  performedAt: timestamp; // 수행 시간
  description: string;    // 상세 설명
  ipAddress: string;      // 관리자 IP
}
```

### AccessLogs (접근 로그)
```typescript
{
  id: string;             // 로그 ID
  timestamp: timestamp;   // 발생 시간
  ip: string;            // IP 주소
  userAgent: string;     // 브라우저/기기 정보
  userId?: string;       // 로그인된 사용자 ID
  
  // 접근 정보
  accessType: 'view' | 'write' | 'edit' | 'delete' | 'admin' | 'login' | 'logout';
  targetType: 'post' | 'comment' | 'board' | 'menu' | 'system';
  targetId?: string;     // 대상 리소스 ID
  
  // 상세 정보
  details: {
    method: string;      // HTTP 메서드
    path: string;        // 접근 경로
    query?: string;      // 쿼리 파라미터
    referer?: string;    // 이전 페이지
    status: number;      // HTTP 상태 코드
    errorMessage?: string; // 오류 메시지
  };
}
```

### DeletedPosts (삭제된 게시글)
```typescript
{
  id: string;             // 원본 게시글 ID
  boardId: string;        // 원본 게시판 ID
  originalData: any;      // 원본 게시글 전체 데이터
  
  deletedInfo: {
    deletedAt: timestamp;
    deletedBy: string;    // 삭제한 사용자/관리자 ID
    reason?: string;      // 삭제 사유
    deletedIp: string;    // 삭제 시 IP
  };
  
  scheduledPurgeAt: timestamp;  // 완전 삭제 예정일
  isRestored: boolean;    // 복원 여부
  restoredAt?: timestamp; // 복원 시간
  restoredBy?: string;    // 복원한 관리자 ID
}
```

### LoginLogs (로그인 로그)
```typescript
{
  id: string,               // PK
  userId: string,           // FK (Users)
  loginType: string,        // 'email' | 'google' | 'kakao'
  status: string,          // 'success' | 'failed'
  
  // 접속 정보
  deviceInfo: {
    ip: string,
    userAgent: string,
    device: string,        // 'mobile' | 'tablet' | 'desktop'
    browser: string,
    os: string
  },
  
  // 위치 정보 (IP 기반)
  geoLocation?: {
    country: string,
    city: string,
    timezone: string
  },
  
  // 실패 정보
  failureReason?: string,  // 실패 시 사유
  attemptCount?: number,   // 시도 횟수
  
  createdAt: timestamp
}

### AttendanceLogs (출석 체크)
```typescript
{
  id: string,               // PK
  userId: string,           // FK (Users)
  date: string,            // YYYY-MM-DD 형식
  weekNumber: number,      // 해당 주차
  monthNumber: number,     // 해당 월
  streak: number,          // 연속 출석일
  
  // 보상 정보
  rewards: {
    exp: number,           // 지급된 경험치
    items?: Array<{        // 지급된 아이템
      itemId: string,
      quantity: number
    }>,
    bonus?: {              // 추가 보상 (연속 출석, 이벤트 등)
      type: string,
      amount: number
    }
  },
  
  createdIp: string,
  createdAt: timestamp
}

### Events (이벤트)
```typescript
{
  id: string,               // PK
  title: string,
  description: string,
  type: string,            // 'attendance' | 'login' | 'post' | 'special'
  
  // 이벤트 기간
  startAt: timestamp,
  endAt: timestamp,
  
  // 보상 정보
  rewards: {
    type: string,          // 'exp' | 'item' | 'badge'
    amount: number,
    probability?: number   // 확률성 보상의 경우
  },
  
  // 이벤트 조건
  conditions: {
    requiredLevel?: number,
    requiredAction?: string,
    actionCount?: number
  },
  
  isActive: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}

### EventParticipants (이벤트 참여)
```typescript
{
  id: string,               // PK
  eventId: string,         // FK (Events)
  userId: string,          // FK (Users)
  
  // 참여 정보
  participationCount: number,  // 참여 횟수
  completedAt?: timestamp,    // 완료 시간
  
  // 보상 정보
  rewards: Array<{
    type: string,
    amount: number,
    receivedAt: timestamp
  }>,
  
  createdAt: timestamp,
  updatedAt: timestamp
}

### UserRewards (사용자 보상 이력)
```typescript
{
  id: string,               // PK
  userId: string,          // FK (Users)
  sourceType: string,      // 'attendance' | 'event' | 'levelup'
  sourceId: string,        // 출처 ID (이벤트ID 등)
  
  // 보상 내용
  rewards: {
    exp?: number,
    items?: Array<{
      itemId: string,
      quantity: number
    }>,
    badges?: Array<string>
  },
  
  createdAt: timestamp
}

### Pages (페이지)
```typescript
{
  id: string,               // PK
  title: string,           // 페이지 제목
  slug: string,            // URL 슬러그 (Unique)
  
  // 페이지 유형
  type: 'custom' | 'board' | 'landing' | 'category',
  
  // 페이지 콘텐츠
  content?: {
    html?: string,         // 커스텀 HTML
    components?: Array<{   // 페이지 구성요소
      type: string,        // 'text' | 'image' | 'board' | 'banner' | 'widget'
      order: number,       // 배치 순서
      settings: {          // 컴포넌트별 설정
        layout?: string,
        style?: object,
        data?: any
      }
    }>
  },
  
  // 페이지 설정
  settings: {
    layout: string,        // 페이지 레이아웃
    isPublic: boolean,     // 공개 여부
    accessLevel: number,   // 접근 권한
    allowIndex: boolean,   // 검색엔진 노출 여부
    customCSS?: string,    // 커스텀 CSS
    customJS?: string      // 커스텀 JavaScript
  },
  
  // SEO 설정
  seo: {
    metaTitle?: string,
    metaDescription?: string,
    ogImage?: string,
    keywords?: string[]
  },
  
  status: 'draft' | 'published' | 'private',
  createdBy: string,       // 작성자 ID
  updatedBy: string,       // 수정자 ID
  publishedAt?: timestamp,
  createdAt: timestamp,
  updatedAt: timestamp
}

### PageLayouts (페이지 레이아웃)
```typescript
{
  id: string,               // PK
  name: string,            // 레이아웃 이름
  description: string,     // 레이아웃 설명
  thumbnail?: string,      // 미리보기 이미지
  
  // 레이아웃 구조
  structure: {
    header?: {
      type: string,
      settings: object
    },
    sidebar?: {
      position: 'left' | 'right',
      width: number,
      settings: object
    },
    content: {
      layout: string,      // 'full' | 'boxed' | 'fluid'
      settings: object
    },
    footer?: {
      type: string,
      settings: object
    }
  },
  
  // 기본 스타일
  defaultStyles: {
    colors: object,
    typography: object,
    spacing: object
  },
  
  isActive: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}

### SiteNavigation (사이트 네비게이션)
```typescript
{
  id: string,               // PK
  type: 'main' | 'footer' | 'sidebar',  // 네비게이션 유형
  
  // 메뉴 구조
  items: Array<{
    id: string,
    type: 'page' | 'board' | 'link' | 'category',
    title: string,
    target?: string,       // '_blank' | '_self'
    icon?: string,
    
    // 연결 정보
    link: {
      type: 'page' | 'board' | 'category' | 'external',
      value: string        // pageId 또는 URL
    },
    
    // 접근 권한
    visibility: {
      isPublic: boolean,
      requiredLevel?: number,
      roles?: string[]
    },
    
    // 하위 메뉴
    children?: Array<{     // 재귀적 구조
      // ... 동일한 구조 반복
    }>,
    
    order: number
  }>,
  
  isActive: boolean,
  updatedBy: string,
  updatedAt: timestamp
}
```

### PageComponents (페이지 컴포넌트)
```typescript
{
  id: string,               // PK
  name: string,            // 컴포넌트 이름
  type: string,            // 컴포넌트 유형
  description: string,
  thumbnail?: string,      // 미리보기 이미지
  
  // 컴포넌트 설정
  settings: {
    props: Array<{         // 설정 가능한 속성들
      name: string,
      type: string,
      default?: any,
      required: boolean,
      options?: any[]
    }>,
    styles: Array<{        // 스타일 옵션
      name: string,
      type: string,
      default?: any
    }>
  },
  
  // 기본 템플릿
  defaultTemplate?: {
    html?: string,
    css?: string,
    js?: string
  },
  
  category: string,        // 'layout' | 'content' | 'widget'
  isActive: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## 2. URL 구조 예시
```
/ -> 메인
/community -> 커뮤니티 메뉴
/community/free -> 자유게시판
/community/free/category-1 -> 자유게시판 특정 카테고리
/community/free/post-slug -> 특정 게시글

/notice -> 공지사항 메뉴
/notice/general -> 일반공지 게시판
/notice/general/post-slug -> 특정 공지글
```

## 3. 인덱스 설정
- Menus: parentId + order, slug
- Boards: menuId, slug
- BoardCategories: boardId + order
- Posts: boardId + publishedAt, categoryId + publishedAt, slug
- Posts 복합 인덱스: [boardId, status, publishedAt]
- Users: email, nickname, level
- Comments: postId + createdAt
- Messages: roomId + createdAt
- Notifications: targetUsers + createdAt
- ExpLogs: userId + createdAt, type + createdAt
- ExpPolicies: type + action
- LevelThresholds: level
- Pages: slug (Unique)
- Pages: type + status
- Pages: createdBy + createdAt

## 4. 보안 규칙
- 사용자는 자신의 정보만 수정 가능
- 게시판 접근 권한은 레벨에 따라 제한
- 관리자는 모든 데이터에 접근 가능
- 채팅방은 참여자만 접근 가능
- 경험치 정책과 레벨 임계값은 관리자만 수정 가능
- 메뉴와 게시판 설정은 관리자만 수정 가능
- 게시글은 작성자와 관리자만 수정/삭제 가능
- 게시판별 읽기/쓰기 권한은 사용자 레벨에 따라 제한
- 비공개 게시글은 작성자와 관리자만 접근 가능

## 5. 경험치 시스템 운영 정책
1. 경험치 정책 변경 시 고려사항
   - 변경 사항은 즉시 또는 다음 날부터 적용 가능
   - 변경 내역은 로그로 기록
   - 급격한 레벨 변화 방지를 위한 일일 한도 설정 가능

2. 레벨 시스템 관리
   - 각 레벨별 혜택 설정 가능
   - 레벨 달성 시 자동 알림 발송
   - 특별 이벤트 기간 동안 경험치 증가율 설정 가능

3. 모니터링
   - 비정상적인 경험치 획득 감지
   - 사용자별 경험치 획득 패턴 분석
   - 레벨별 사용자 분포 통계 

## 5. 게시판 관리 정책
1. 게시물 관리
   - 게시물 이동: 다른 게시판/카테고리로 이동
   - 게시물 잠금: 추가 댓글 작성 금지
   - 게시물 삭제: 임시 삭제 또는 영구 삭제
   - 게시물 복원: 임시 삭제된 게시물 복원

2. 권한 관리
   - 레벨 기반 기본 권한
   - 특별 권한 부여 (특정 사용자/그룹)
   - 게시판 관리자 지정
   - 권한 상속 규칙 (상위 메뉴의 권한을 하위 게시판이 상속)

3. 모니터링
   - 관리 작업 로그 기록
   - IP 기반 관리 작업 추적
   - 게시물 이력 관리 

## 6. 데이터 보관 및 로그 정책

1. 게시물 삭제 정책
   - 임시 삭제된 게시물은 3개월간 보관
   - 보관 기간 경과 후 자동 완전 삭제
   - 삭제된 게시물의 첨부파일도 함께 보관
   - 복원 시 원본 게시물의 모든 정보 복원

2. IP 주소 관리
   - 모든 작업에 대해 IP 주소 기록
   - IP 주소 암호화 저장 (개인정보보호)
   - IP 기반 접근 제한 기능
   - 국가별 IP 차단 기능

3. 로그 보관 정책
   - 일반 접근 로그: 3개월 보관
   - 관리자 작업 로그: 1년 보관
   - 보안 관련 로그: 2년 보관
   - 로그 자동 백업 및 아카이빙

4. 로그 모니터링
   - 비정상 접근 탐지
   - IP 기반 공격 감지
   - 과도한 요청 제한
   - 관리자 작업 모니터링

5. 데이터 정리 자동화
   - 매일 자정: 삭제 예정 게시물 체크
   - 매주: 오래된 로그 정리
   - 매월: 장기 보관 데이터 아카이빙
   - 분기별: 시스템 성능 최적화

## 7. 보상 정책

1. 출석 체크 보상
   - 기본 출석 보상: 100exp
   - 연속 출석 보너스: 
     - 7일: 추가 300exp
     - 30일: 추가 1000exp
   - 특별 출석 이벤트 보상

2. 로그인 보상
   - 휴면 계정 복귀 보상
   - 특정 시간대 접속 보너스
   - 주말 접속 보너스

3. 이벤트 보상
   - 시즌별 이벤트
   - 레벨별 차등 보상
   - 확률성 보상
   - 누적 보상

4. 보상 제한
   - IP당 일일 보상 제한
   - 계정당 일일 보상 제한
   - 중복 보상 방지
   - 비정상 행위 감지 및 제한

## 8. 페이지/메뉴 구성 정책

1. 페이지 구성
   - 커스텀 페이지 생성
   - 게시판 연동
   - 컴포넌트 기반 구성
   - 반응형 레이아웃

2. 메뉴 구성
   - 계층형 메뉴 구조
   - 다중 네비게이션
   - 권한 기반 노출
   - 동적 메뉴 구성

3. 레이아웃 관리
   - 템플릿 기반 설계
   - 커스텀 스타일링
   - 컴포넌트 재사용
   - 모바일 최적화

4. 접근성/SEO
   - SEO 최적화 설정
   - 웹 표준 준수
   - 메타데이터 관리
   - 검색엔진 노출 제어