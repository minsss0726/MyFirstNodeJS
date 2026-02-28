import type { Memo } from ".prisma/client";

/** 메모 생성 요청 DTO */
export interface CreateMemoRequest {
  title: string;
  content: string;
}

/** 메모 수정 요청 DTO (부분 수정 가능) */
export interface UpdateMemoRequest {
  title?: string;
  content?: string;
}

/** API 공통 응답 형식 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export type { Memo };
