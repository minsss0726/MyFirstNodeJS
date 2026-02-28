import type { Memo, Prisma } from ".prisma/client";
import prisma from "../config/db.js";

/** 전체 메모 목록 조회 */
export const findAll = async (): Promise<Memo[]> => {
  return prisma.memo.findMany({
    orderBy: { updatedAt: "desc" },
  });
};

/** id로 메모 단건 조회 */
export const findById = async (id: number): Promise<Memo | null> => {
  return prisma.memo.findUnique({
    where: { id },
  });
};

/** 메모 생성 */
export const create = async (data: Prisma.MemoCreateInput): Promise<Memo> => {
  return prisma.memo.create({ data });
};

/** 메모 수정 */
export const update = async (
  id: number,
  data: Prisma.MemoUpdateInput
): Promise<Memo> => {
  return prisma.memo.update({
    where: { id },
    data,
  });
};

/** 메모 삭제 */
export const remove = async (id: number): Promise<Memo> => {
  return prisma.memo.delete({
    where: { id },
  });
};
