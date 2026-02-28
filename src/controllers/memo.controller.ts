import type { Request, Response } from "express";
import type { ApiResponse } from "../types/memo.types.js";
import * as memoService from "../services/memo.service.js";

/** GET /memos - 전체 메모 목록 */
export const getMemos = async (
  _req: Request,
  res: Response<ApiResponse>
): Promise<void> => {
  const data = await memoService.getMemos();
  res.status(200).json({ success: true, data });
};

/** GET /memos/:id - 메모 단건 조회 */
export const getMemoById = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse>
): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    res.status(400).json({ success: false, error: "Invalid id" });
    return;
  }
  const data = await memoService.getMemoById(id);
  if (!data) {
    res.status(404).json({ success: false, error: "Memo not found" });
    return;
  }
  res.status(200).json({ success: true, data });
};

/** POST /memos - 메모 생성 */
export const createMemo = async (
  req: Request,
  res: Response<ApiResponse>
): Promise<void> => {
  try {
    const data = await memoService.createMemo(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    if (message === "TITLE_REQUIRED") {
      res.status(400).json({ success: false, error: "Title is required" });
      return;
    }
    throw err;
  }
};

/** PUT /memos/:id - 메모 수정 */
export const updateMemo = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse>
): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    res.status(400).json({ success: false, error: "Invalid id" });
    return;
  }
  try {
    const data = await memoService.updateMemo(id, req.body);
    res.status(200).json({ success: true, data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    if (message === "NOT_FOUND") {
      res.status(404).json({ success: false, error: "Memo not found" });
      return;
    }
    if (message === "TITLE_REQUIRED") {
      res.status(400).json({ success: false, error: "Title cannot be empty" });
      return;
    }
    throw err;
  }
};

/** DELETE /memos/:id - 메모 삭제 */
export const deleteMemo = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse>
): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    res.status(400).json({ success: false, error: "Invalid id" });
    return;
  }
  try {
    await memoService.deleteMemo(id);
    res.status(200).json({ success: true, data: { deleted: true } });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    if (message === "NOT_FOUND") {
      res.status(404).json({ success: false, error: "Memo not found" });
      return;
    }
    throw err;
  }
};
