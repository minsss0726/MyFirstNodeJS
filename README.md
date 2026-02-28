# myfirstnodejs

Node.js + Express + Prisma + MariaDB 기반 **메모(Memo) REST API** 백엔드 프로젝트입니다.

## 기술 스택

- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript (ESM)
- **ORM**: Prisma
- **DB**: MariaDB (MySQL 호환)

## 프로젝트 구조

```
src/
├── app.ts              # Express 앱 설정, 라우트, 미들웨어
├── server.ts           # 서버 진입점
├── config/             # DB 등 설정
├── controllers/        # 요청/응답 처리
├── routes/             # API 라우트
├── services/           # 비즈니스 로직
├── repositories/       # DB 접근 (Prisma)
└── types/              # 타입/인터페이스
prisma/
└── schema.prisma       # DB 스키마 (Memo 모델)
```

## 시작하기

### 요구 사항

- Node.js (권장: LTS)
- MariaDB 또는 MySQL

### 환경 변수

프로젝트 루트에 `.env` 파일을 만들고 다음 변수를 설정하세요.

| 변수 | 설명 | 예시 |
|------|------|------|
| `DATABASE_URL` | Prisma/DB 연결 URL | `mysql://user:password@localhost:3306/mydb` |
| `PORT` | 서버 포트 (선택) | `3000` |
| `CORS_ORIGIN` | CORS 허용 오리진 (선택, 미설정 시 `*`) | `http://localhost:5173` |

### 설치 및 실행

```bash
# 의존성 설치
npm install

# Prisma 클라이언트 생성
npm run db:generate

# DB 마이그레이션 (테이블 생성)
npm run db:migrate

# 개발 서버 실행 (nodemon + tsx)
npm run dev
```

서버는 기본적으로 `http://localhost:3000` 에서 실행됩니다.

### 빌드 및 프로덕션 실행

```bash
npm run build
npm start
```

## API

### 헬스 체크

- `GET /health` — 서버 상태 확인

### 메모 API

| 메서드 | 경로 | 설명 |
|--------|------|------|
| `GET` | `/memos` | 메모 목록 조회 |
| `GET` | `/memos/:id` | 메모 단건 조회 |
| `POST` | `/memos` | 메모 생성 |
| `PUT` | `/memos/:id` | 메모 수정 |
| `DELETE` | `/memos/:id` | 메모 삭제 |

#### 요청/응답 예시

**메모 생성 (POST /memos)**

```json
// Request body
{ "title": "제목", "content": "내용" }

// Response (성공)
{ "success": true, "data": { "id": 1, "title": "제목", "content": "내용", "createdAt": "...", "updatedAt": "..." } }
```

**메모 수정 (PUT /memos/:id)** — 부분 수정 가능

```json
// Request body (필요한 필드만)
{ "title": "새 제목" }
// 또는
{ "content": "새 내용" }
```

## 스크립트

| 스크립트 | 설명 |
|----------|------|
| `npm run dev` | 개발 서버 (nodemon + tsx) |
| `npm run build` | TypeScript 빌드 |
| `npm start` | 빌드된 서버 실행 |
| `npm run db:generate` | Prisma 클라이언트 생성 |
| `npm run db:migrate` | DB 마이그레이션 |
| `npm run db:studio` | Prisma Studio 실행 |

## 라이선스

ISC
