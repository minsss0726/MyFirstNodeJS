import type { Memo } from ".prisma/client";
import type { CreateMemoRequest, UpdateMemoRequest } from "../types/memo.types.js";
import * as memoRepository from "../repositories/memo.repository.js";

/** 전체 메모 목록 조회 */
export const getMemos = async (): Promise<Memo[]> => {
  return memoRepository.findAll();
};

/** 메모 단건 조회 (없으면 null) */
export const getMemoById = async (id: number): Promise<Memo | null> => {
  return memoRepository.findById(id);
};

/** 메모 생성 (유효성 검사 후 저장) */
export const createMemo = async (
  body: CreateMemoRequest
): Promise<Memo> => {
  const title = (body.title ?? "").trim();
  const content = (body.content ?? "").trim();
  if (!title) {
    throw new Error("TITLE_REQUIRED");
  }
  return memoRepository.create({ title, content });
};

/** 메모 수정 (존재 여부 확인 후 업데이트) */
export const updateMemo = async (
  id: number,
  body: UpdateMemoRequest
): Promise<Memo> => {
  const existing = await memoRepository.findById(id);
  if (!existing) {
    throw new Error("NOT_FOUND");
  }
  const title = body.title !== undefined ? String(body.title).trim() : undefined;
  const content = body.content !== undefined ? String(body.content).trim() : undefined;
  if (title !== undefined && !title) {
    throw new Error("TITLE_REQUIRED");
  }
  return memoRepository.update(id, {
    ...(title !== undefined && { title }),
    ...(content !== undefined && { content }),
  });
};

/** 메모 삭제 (존재 여부 확인 후 삭제) */
export const deleteMemo = async (id: number): Promise<Memo> => {
  const existing = await memoRepository.findById(id);
  if (!existing) {
    throw new Error("NOT_FOUND");
  }
  return memoRepository.remove(id);
};
