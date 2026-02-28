import "dotenv/config";
import express, { type Express, type Request, type Response, type NextFunction } from "express";

const app: Express = express();

// CORS 설정 (환경 변수 CORS_ORIGIN 미설정 시 *)
const corsOrigin = process.env.CORS_ORIGIN ?? "*";
app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", corsOrigin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// JSON 바디 파싱
app.use(express.json());

// 헬스 체크 (선택)
app.get("/health", (_req: Request, res: Response) => {
  res.json({ success: true, data: { status: "ok" } });
});

// TODO: routes 적용 예) app.use("/memos", memoRoutes);

// 404 처리
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, error: "Not Found" });
});

// 중앙 집중식 에러 미들웨어 (DB 에러 등 클라이언트에 노출하지 않음)
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ success: false, error: "Internal Server Error" });
});

export default app;
