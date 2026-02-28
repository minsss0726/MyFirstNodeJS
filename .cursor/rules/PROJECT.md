# Node.js + React + MariaDB Memo Project Rules

## 1. Tech Stack

### Backend

- Runtime: Node.js
- Language: TypeScript (strict mode enabled)
- Framework: Express
- ORM: Prisma
- Database: MariaDB
- Environment Config: dotenv
- Dev Tool: nodemon

### Frontend

- Framework: React (TypeScript)
- Build Tool: Vite
- HTTP Client: axios
- Styling: TailwindCSS (optional)
- State Management: useState (default), Zustand (if needed)

---

## 2. Architecture Principles

### Backend Architecture (Layered Architecture)

Follow a layered structure similar to Spring architecture:

routes → controllers → services → repositories → database

Each layer must have a single responsibility.

- routes: URL mapping only
- controllers: request/response handling only
- services: business logic
- repositories: database access
- config: configuration (DB, environment)

Business logic must NOT exist in controllers.

---

## 3. Directory Structure

### Backend

server/
│
├── src/
│ ├── app.ts
│ ├── server.ts
│ │
│ ├── config/
│ │ └── db.ts
│ │
│ ├── routes/
│ │ └── memo.routes.ts
│ │
│ ├── controllers/
│ │ └── memo.controller.ts
│ │
│ ├── services/
│ │ └── memo.service.ts
│ │
│ ├── repositories/
│ │ └── memo.repository.ts
│ │
│ ├── middlewares/
│ │
│ ├── types/
│ │
│ └── utils/
│
├── prisma/
│ └── schema.prisma
│
├── package.json
└── tsconfig.json

### Frontend

client/
│
├── src/
│ ├── main.tsx
│ ├── App.tsx
│ │
│ ├── api/
│ │ └── memoApi.ts
│ │
│ ├── components/
│ │ ├── MemoForm.tsx
│ │ ├── MemoList.tsx
│ │ └── MemoItem.tsx
│ │
│ ├── pages/
│ │ └── Home.tsx
│ │
│ ├── hooks/
│ │
│ ├── types/
│ │
│ └── styles/
│
└── package.json

---

## 4. TypeScript Rules

- "strict": true must remain enabled.
- Avoid using `any`.
- All request/response DTOs must be explicitly typed.
- Shared types must be placed in `/types` directory.
- Prefer interface for object shape definitions.

Example:

```ts
export interface CreateMemoRequest {
  title: string;
  content: string;
}
```

---

5. API Design Rules

Follow RESTful conventions:

GET /memos
GET /memos/:id
POST /memos
PUT /memos/:id
DELETE /memos/:id
• All responses must return JSON.
• Use consistent response format:
{
success: boolean;
data?: T;
error?: string;
}

---

6. Database Rules
   • All DB access must go through Prisma.
   • No raw SQL unless necessary.
   • Migrations must be managed via Prisma CLI.
   • Environment variables must not be committed (.env in .gitignore).

---

7. Error Handling Rules
   • Use centralized error middleware.
   • Never expose raw database errors to client.
   • Return proper HTTP status codes:
   • 200 OK
   • 201 Created
   • 400 Bad Request
   • 404 Not Found
   • 500 Internal Server Error

---

8. Code Style
   • Use async/await only (no promise chaining).
   • No business logic in routes.
   • No DB logic in controllers.
   • Use arrow functions.
   • Keep functions under 30 lines if possible.
   • Use meaningful variable names.

---

9. Security Basics
   • Enable CORS properly.
   • Sanitize input.
   • Use environment variables for secrets.
   • Prepare for future JWT authentication support.

---

10. DataBase Table
    Memo
    model Memo {
    id Int @id @default(autoincrement())
    title String
    content String
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
    }
