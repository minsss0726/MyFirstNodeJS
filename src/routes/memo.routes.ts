import { Router } from "express";
import {
  getMemos,
  getMemoById,
  createMemo,
  updateMemo,
  deleteMemo,
} from "../controllers/memo.controller.js";

const router = Router();

router.get("/", getMemos);
router.get("/:id", getMemoById);
router.post("/", createMemo);
router.put("/:id", updateMemo);
router.delete("/:id", deleteMemo);

export default router;
